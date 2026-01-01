import os
import base64
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import json
from dotenv import load_dotenv
from bson import ObjectId
import gridfs
import logging

# Suppress the file_cache warning
logging.getLogger('googleapiclient.discovery_cache').setLevel(logging.ERROR)
logging.getLogger('google.auth.transport.requests').setLevel(logging.ERROR)

load_dotenv()

# If modifying these SCOPES, delete the file token.json.
SCOPES = ['https://mail.google.com/']

# List of recipients
RECIPIENTS = ["manojrajgopalachar@gmail.com", "binduramesh290@gmail.com"]

def get_gmail_service():
    """Shows basic usage of the Gmail API.
    Creates a Gmail API service object and returns it.
    """
    creds = None
    
    # Use environment variables for OAuth2
    if os.getenv("GOOGLE_ACCESS_TOKEN") and os.getenv("GOOGLE_REFRESH_TOKEN"):
        creds = Credentials(
            token=os.getenv("GOOGLE_ACCESS_TOKEN"),
            refresh_token=os.getenv("GOOGLE_REFRESH_TOKEN"),
            token_uri="https://oauth2.googleapis.com/token",
            client_id=os.getenv("GOOGLE_CLIENT_ID"),
            client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
            scopes=SCOPES
        )
    
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            # Use environment variables instead of client_secrets.json
            client_config = {
                "web": {
                    "client_id": os.getenv("GOOGLE_CLIENT_ID"),
                    "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token"
                }
            }
            
            flow = InstalledAppFlow.from_client_config(
                client_config, SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    
    try:
        service = build('gmail', 'v1', credentials=creds)
        return service
    except HttpError as error:
        print(f'An error occurred: {error}')
        return None

def create_message_with_attachments(sender, to, subject, message_text, attachments=None):
    """Create a message for an email with attachments.
    
    Args:
      sender: Email address of the sender.
      to: Email address of the receiver(s) - can be a list or string.
      subject: The subject of the email message.
      message_text: The text of the email message.
      attachments: List of tuples (filename, content, content_type)
    
    Returns:
      An object containing a base64url encoded email object.
    """
    message = MIMEMultipart()
    
    if isinstance(to, list):
        message['to'] = ", ".join(to)
    else:
        message['to'] = to
        
    message['from'] = sender
    message['subject'] = subject
    
    # Attach HTML message
    msg = MIMEText(message_text, 'html')
    message.attach(msg)
    
    # Attach files if any
    if attachments:
        for filename, content, content_type in attachments:
            part = MIMEApplication(content, Name=filename)
            part['Content-Disposition'] = f'attachment; filename="{filename}"'
            part['Content-Type'] = content_type
            message.attach(part)
    
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {'raw': raw_message}

def send_project_confirmation_email(project_request):
    """Send confirmation email to the client who submitted the project request"""
    try:
        service = get_gmail_service()
        if not service:
            print("Failed to create Gmail service")
            return False
        
        sender = os.getenv("EMAIL_ADDRESS")
        recipient = project_request["email"]
        
        subject = f"Project Request Received: {project_request['project_title']}"
        
        # Create HTML confirmation email content
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                    Project Request Received
                </h2>
                
                <p>Dear {project_request['name']},</p>
                
                <p>Thank you for choosing InfiniteWaveX! We have received your project request and our team will review it carefully.</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #0275d8; margin-top: 0;">Project Details:</h3>
                    <p><strong>Project Title:</strong> {project_request['project_title']}</p>
                    <p><strong>Customer Type:</strong> {project_request['customer_type']}</p>
                    <p><strong>Budget:</strong> {project_request.get('budget', 'Not specified')}</p>
                    <p><strong>Deadline:</strong> {project_request.get('deadline', 'Not specified')}</p>
                </div>
                
                <div style="background-color: #e8f4fc; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #0275d8; margin-top: 0;">Your Project Description:</h3>
                    <p style="white-space: pre-wrap;">{project_request['details']}</p>
                </div>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                    <li>Our team will review your project requirements</li>
                    <li>We'll prepare a detailed proposal for your project</li>
                    <li>We'll schedule a consultation call to discuss your project in detail</li>
                    <li>You'll receive our response within 24-48 hours</li>
                </ul>
                
                <p>If you have any immediate questions, please don't hesitate to reach out to us.</p>
                
                <p>Best regards,<br/>The InfiniteWaveX Team</p>
                
                <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center;">
                    
                        InfiniteWaveX - Bringing your ideas to life
                    
                </div>
            </div>
        </body>
        </html>
        """
        
        message = create_message_with_attachments(sender, recipient, subject, html_content)
        result = send_message(service, "me", message)
        
        return result is not None
        
    except Exception as e:
        print(f"Error sending project confirmation email: {e}")
        return False

def send_project_request_email(project_request, db):
    """Send email notification for new project request using Gmail API with attachments"""
    try:
        service = get_gmail_service()
        if not service:
            print("Failed to create Gmail service")
            return False
        
        sender = os.getenv("EMAIL_ADDRESS")
        
        subject = f"New Project Request: {project_request['project_title']}"
        
        # Create HTML email content
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                    New Project Request Received
                </h2>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <p><strong>Customer Type:</strong> {project_request['customer_type']}</p>
                    <p><strong>Project Title:</strong> {project_request['project_title']}</p>
                    <p><strong>Name:</strong> {project_request['name']}</p>
                    <p><strong>Email:</strong> {project_request['email']}</p>
                    <p><strong>Budget:</strong> {project_request.get('budget', 'Not specified')}</p>
                    <p><strong>Deadline:</strong> {project_request.get('deadline', 'Not specified')}</p>
                </div>
                
                <div style="background-color: #e8f4fc; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #0275d8; margin-top: 0;">Project Details:</h3>
                    <p style="white-space: pre-wrap;">{project_request['details']}</p>
                </div>
                
                <p><strong>Submitted on:</strong> {project_request['created_at']}</p>
                
                <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center;">
                    <p style="color: #777; font-size: 12px;">
                        This email was automatically generated by InfiniteWaveX Project Request System
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Get file attachments from MongoDB
        attachments = []
        fs = gridfs.GridFS(db)
        total_size = 0
        max_attachment_size = 20 * 1024 * 1024  # 20MB limit

        if 'file_ids' in project_request and project_request['file_ids']:
            for file_id in project_request['file_ids']:
                try:
                    file_obj = fs.get(ObjectId(file_id))
                    file_size = file_obj.length
                    if total_size + file_size <= max_attachment_size:
                        content = file_obj.read()
                        attachments.append((
                            file_obj.filename,
                            content,
                            file_obj.content_type
                        ))
                        total_size += file_size
                    else:
                        print(f"File {file_obj.filename} ({file_size} bytes) exceeds attachment size limit. Skipping attachment.")
                except:
                    print(f"Could not retrieve file with ID: {file_id}")

        # If some files were skipped due to size, add a note to the email
        file_count = len(project_request.get('file_ids', []))
        attachment_count = len(attachments)
        if attachment_count < file_count:
            note_html = f"""
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <p style="color: #856404; margin: 0;"><strong>Note:</strong> {file_count - attachment_count} attached file(s) were too large to include in this email. Please access them through the admin panel.</p>
            </div>
            """
            # Insert the note before the closing div
            html_content = html_content.replace(
                "<p><strong>Submitted on:</strong> {project_request['created_at']}</p>",
                f"<p><strong>Submitted on:</strong> {project_request['created_at']}</p>{note_html}"
            )
        
        # Debug information
        print(f"Sending email with {len(attachments)} attachments (total size: {total_size} bytes) for project request {project_request.get('_id', 'unknown')}")
        print(f"File count: {file_count}, Attachment count: {attachment_count}")
        
        message = create_message_with_attachments(sender, RECIPIENTS, subject, html_content, attachments)
        print("Email message created successfully")
        result = send_message(service, "me", message)
        print(f"Email send result: {result is not None}")
        
        return result is not None
        
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def send_contact_confirmation_email(contact_request):
    """Send confirmation email to the client who submitted the contact form"""
    try:
        service = get_gmail_service()
        if not service:
            print("Failed to create Gmail service")
            return False
        
        sender = os.getenv("EMAIL_ADDRESS")
        recipient = contact_request["email"]
        
        subject = "Thank you for contacting InfiniteWaveX"
        
        # Create HTML confirmation email content
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                    Thank You for Contacting Us
                </h2>
                
                <p>Dear {contact_request['name']},</p>
                
                <p>Thank you for reaching out to InfiniteWaveX. We have received your message and our team will get back to you as soon as possible.</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Subject:</strong> {contact_request['subject']}</p>
                    <p><strong>Message:</strong> {contact_request['message']}</p>
                </div>
                
                <p>We typically respond within 24 hours during business days.</p>
                
                <p>Best regards,<br/>The InfiniteWaveX Team</p>
                
                <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center;">
                    <p style="color: #777; font-size: 12px;">
                        InfiniteWaveX - Bringing your ideas to life
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        message = create_message_with_attachments(sender, recipient, subject, html_content)
        result = send_message(service, "me", message)
        
        return result is not None
        
    except Exception as e:
        print(f"Error sending confirmation email: {e}")
        return False

def send_contact_notification_email(contact_request):
    """Send notification email to the InfiniteWaveX team about the new contact request"""
    try:
        service = get_gmail_service()
        if not service:
            print("Failed to create Gmail service")
            return False
        
        sender = os.getenv("EMAIL_ADDRESS")
        
        subject = f"New Contact Request: {contact_request['subject']}"
        
        # Create HTML notification email content
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                    New Contact Request Received
                </h2>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <p><strong>Name:</strong> {contact_request['name']}</p>
                    <p><strong>Email:</strong> {contact_request['email']}</p>
                    <p><strong>Phone:</strong> {contact_request.get('phone', 'Not provided')}</p>
                    <p><strong>Company:</strong> {contact_request.get('company', 'Not provided')}</p>
                    <p><strong>Subject:</strong> {contact_request['subject']}</p>
                </div>
                
                <div style="background-color: #e8f4fc; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #0275d8; margin-top: 0;">Message:</h3>
                    <p style="white-space: pre-wrap;">{contact_request['message']}</p>
                </div>
                
                <p><strong>Received on:</strong> {contact_request['created_at']}</p>
                
                <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center;">
                    <p style="color: #777; font-size: 12px;">
                        This email was automatically generated by InfiniteWaveX Contact System
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        message = create_message_with_attachments(sender, RECIPIENTS, subject, html_content)
        result = send_message(service, "me", message)
        
        return result is not None
        
    except Exception as e:
        print(f"Error sending notification email: {e}")
        return False

def send_message(service, user_id, message):
    """Send an email message.
    
    Args:
      service: Authorized Gmail API service instance.
      user_id: User's email address. The special value "me"
      can be used to indicate the authenticated user.
      message: Message to be sent.
    
    Returns:
      Sent Message.
    """
    try:
        print(f"Attempting to send email to {user_id}")
        message = (service.users().messages().send(userId=user_id, body=message)
                   .execute())
        print(f'Message Id: {message["id"]}')
        return message
    except HttpError as error:
        print(f'An error occurred: {error}')
        return None