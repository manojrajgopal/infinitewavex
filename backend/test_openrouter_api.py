"""
Test file to verify OpenRouter.ai API key is working.
This file tests the OpenRouter.ai API key stored in .env as TEST_OPENROUTER_AI_API_KEY.
Provides an interactive ChatGPT-like conversation interface.
"""
import os
import sys

# Add the parent directory to path to import required modules
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

# Get the OpenRouter API key
OPENROUTER_API_KEY = os.getenv("TEST_OPENROUTER_AI_API_KEY")

# Store conversation history for context
conversation_history = []


def test_openrouter_api():
    """Test if OpenRouter.ai API key is working"""
    
    if not OPENROUTER_API_KEY:
        print("❌ ERROR: TEST_OPENROUTER_AI_API_KEY not found in .env file")
        return False
    
    print(f"🔑 API Key found: {OPENROUTER_API_KEY[:20]}...")
    
    # OpenRouter API endpoint (using OpenAI-compatible endpoint)
    url = "https://openrouter.ai/api/v1/chat/completions"
    
    # Headers for the request
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://infinitewavex.com",  # Required by OpenRouter
        "X-Title": "InfiniteWaveX Test"  # Optional but recommended
    }
    
    # Request payload - using a free model available on OpenRouter
    data = {
        "model": "google/gemini-2.0-flash-001",  # Free model on OpenRouter
        "messages": [
            {"role": "user", "content": "Hello! Just testing if this API key is working. Please respond with 'API is working!'"}
        ],
        "max_tokens": 50
    }
    
    print("📡 Sending initial test request to OpenRouter.ai API...")
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        
        print(f"📊 Response Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            if "choices" in result and len(result["choices"]) > 0:
                message = result["choices"][0]["message"]["content"]
                print(f"✅ SUCCESS! API is working!")
                print(f"🤖 Response: {message}")
                return True
            else:
                print("❌ ERROR: Unexpected response format")
                print(f"Response: {result}")
                return False
        elif response.status_code == 401:
            print("❌ ERROR: Invalid API key")
            print(f"Response: {response.text}")
            return False
        elif response.status_code == 429:
            print("❌ ERROR: Rate limit exceeded")
            print(f"Response: {response.text}")
            return False
        else:
            print(f"❌ ERROR: API request failed")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("❌ ERROR: Request timed out")
        return False
    except requests.exceptions.RequestException as e:
        print(f"❌ ERROR: Request failed - {str(e)}")
        return False
    except Exception as e:
        print(f"❌ ERROR: Unexpected error - {str(e)}")
        return False


def send_message(user_input):
    """Send a message to OpenRouter API and get response"""
    
    # Add user message to conversation history
    conversation_history.append({"role": "user", "content": user_input})
    
    # OpenRouter API endpoint
    url = "https://openrouter.ai/api/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Refere": "https://infinitewavex.com",
        "X-Title": "InfiniteWaveX Chat"
    }
    
    data = {
        "model": "google/gemini-2.0-flash-001",
        "messages": conversation_history,
        "max_tokens": 500
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            if "choices" in result and len(result["choices"]) > 0:
                assistant_message = result["choices"][0]["message"]["content"]
                # Add assistant response to conversation history
                conversation_history.append({"role": "assistant", "content": assistant_message})
                return assistant_message
            else:
                return "Error: Unexpected response format"
        else:
            return f"Error: {response.status_code} - {response.text}"
            
    except Exception as e:
        return f"Error: {str(e)}"


def start_chat():
    """Start an interactive ChatGPT-like conversation"""
    
    print("\n" + "=" * 60)
    print("💬 OpenRouter.ai Chat Interface (Type 'exit' to quit)")
    print("=" * 60)
    print("💡 Tips:")
    print("   - Type your message and press Enter to send")
    print("   - The conversation will continue with context")
    print("   - Type 'exit' or 'quit' to end the chat")
    print("   - Type 'clear' to reset the conversation")
    print("=" * 60 + "\n")
    
    # Initial greeting
    print("🤖 Assistant: Hello! I'm ready to chat. How can I help you today?")
    print()
    
    # Do-while loop for continuous conversation
    while True:
        try:
            # Get user input
            user_input = input("👤 You: ").strip()
            
            # Check if user wants to exit
            if user_input.lower() in ['exit', 'quit', 'bye']:
                print("\n🤖 Assistant: Goodbye! Have a great day! 👋")
                break
            
            # Check if user wants to clear conversation
            if user_input.lower() == 'clear':
                conversation_history.clear()
                print("\n✅ Conversation cleared!\n")
                continue
            
            # Skip empty input
            if not user_input:
                continue
            
            # Send message and get response
            print("🤖 Assistant: ", end="", flush=True)
            response = send_message(user_input)
            print(f"{response}\n")
            
        except KeyboardInterrupt:
            print("\n\n🤖 Assistant: Chat interrupted. Goodbye!")
            break
        except Exception as e:
            print(f"\n❌ Error: {str(e)}\n")


if __name__ == "__main__":
    print("=" * 60)
    print("🧪 OpenRouter.ai API Key Test & Chat Interface")
    print("=" * 60)
    
    # First, test if the API key works
    success = test_openrouter_api()
    
    print("=" * 60)
    
    if success:
        print("🎉 API Key Test PASSED!")
        print("\nWould you like to start a chat? (yes/no): ", end="")
        
        try:
            user_choice = input().strip().lower()
            if user_choice in ['yes', 'y', 'yeah', 'sure']:
                start_chat()
            else:
                print("👋 Test completed. Run the script again to start a chat.")
        except KeyboardInterrupt:
            print("\n👋 Test completed.")
    else:
        print("💥 API Key Test FAILED - Check the errors above")
    
    print("=" * 60)
