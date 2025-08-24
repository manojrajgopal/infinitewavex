import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer'
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const Contact = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: '',
        company: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    useEffect(() => {
        if (window.AOS) window.AOS.init();
        if (window.$ && window.$('.owl-carousel').length) {
            window.$('.owl-carousel').owlCarousel();
        }
        const scriptElements = [];
        
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                
                const script = document.createElement('script');
                script.src = src;
                script.async = false;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
                scriptElements.push(script);
            });
        };

        const scripts = [
            '/js/jquery.min.js',
            '/js/jquery-migrate-3.0.1.min.js',
            '/js/popper.min.js',
            '/js/bootstrap.min.js',
            '/js/jquery.easing.1.3.js',
            '/js/jquery.waypoints.min.js',
            '/js/jquery.stellar.min.js',
            '/js/owl.carousel.min.js',
            '/js/jquery.magnific-popup.min.js',
            '/js/aos.js',
            '/js/jquery.animateNumber.min.js',
            '/js/bootstrap-datepicker.js',
            '/js/scrollax.min.js',
            '/js/main.js'
        ];

        const loadScripts = async () => {
            try {
                for (const src of scripts) {
                    await loadScript(src);
                }
            } catch (error) {
                console.error('Script loading error:', error);
            }
        };

        if (!window.__themeScriptsLoaded) {
            window.__themeScriptsLoaded = true;
            loadScripts();
        }
        loadScripts();

        return () => {
            scriptElements.forEach(script => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            });
        };
    }, [location]);

    const handleSubmit = async (e) => {
        e && e.preventDefault();
        setIsSubmitting(true);
        setShowCancelDialog(false);
        
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key]) formDataToSend.append(key, formData[key]);
            });
            
            const response = await fetch(`${BACKEND_URL}/api/contact/`, {
                method: 'POST',
                body: formDataToSend
            });
            
            if (response.ok) {
                setSubmitStatus('success');
                setShowConfirmation(true);
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    phone: '',
                    company: ''
                });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setShowConfirmation(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div id="colorlib-page">
            <ThreeJSParticles />
            <Helmet>
                <title>InfiniteWaveX</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=1, user-scalable=no" />
                
                <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700" rel="stylesheet" />

                <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
                <link rel="stylesheet" href="/css/animate.css" />
                
                <link rel="stylesheet" href="/css/owl.carousel.min.css" />
                <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
                <link rel="stylesheet" href="/css/magnific-popup.css" />

                <link rel="stylesheet" href="/css/aos.css" />

                <link rel="stylesheet" href="/css/ionicons.min.css" />

                <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
                <link rel="stylesheet" href="/css/jquery.timepicker.css" />

                <link rel="stylesheet" href="/css/flaticon.css" />
                <link rel="stylesheet" href="/css/icomoon.css" />
                <link rel="stylesheet" href="/css/style.css" />
                {/* Mobile-specific styles */}
                <style type="text/css">{`
                    .js-fullheight {
                    min-height: 100vh;       /* allow proper full height */
                    height: auto !important; /* don't force fixed 100vh */
                    display: flex;
                    flex-direction: column;
                    }

                    html, body {
                    height: auto;
                    top: 50px; /* adjust for fixed header */
                    ;
                    min-height: 100vh;
                    overflow-x: hidden;  /* avoid sideways scroll */
                    overflow-y: auto;    /* enable vertical scroll */
                    }
                    @media (max-width: 768px) {
                        #colorlib-page {
                            overflow-y: auto !important;
                        }
                        #colorlib-aside {
                            height: auto;
                            padding-top: 20px;
                        }
                        #colorlib-main {
                            margin-top: 0 !important;
                            padding-top: 20px;
                        }
                        .contact-section {
                            padding: 20px 0 !important;
                        }
                        .contact-info .col-md-3 {
                            width: 100%;
                            margin-bottom: 15px;
                        }
                        .block-9 {
                            flex-direction: column;
                        }
                        .block-9 .col-md-6 {
                            width: 100%;
                            padding: 0 !important;
                        }
                        .block-9 iframe {
                            height: 300px;
                            margin-bottom: 30px;
                        }
                        .ftco-footer-widget {
                            margin-bottom: 30px !important;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .contact-section {
                            padding: 10px 0 !important;
                        }
                        .form-group input, 
                        .form-group textarea {
                            font-size: 14px !important;
                        }
                        .btn-primary {
                            width: 100%;
                        }
                    }

                    /* Confirmation Dialog Styles */
                    .confirmation-dialog {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.7);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 9999;
                    }
                    
                    .dialog-content {
                        background: white;
                        padding: 2rem;
                        border-radius: 8px;
                        text-align: center;
                        max-width: 400px;
                        width: 90%;
                    }
                    
                    .dialog-actions {
                        margin-top: 1.5rem;
                        display: flex;
                        justify-content: center;
                        gap: 1rem;
                    }
                    
                    .dialog-actions button {
                        padding: 0.5rem 1.5rem;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: 500;
                    }
                    
                    .dialog-actions button:first-child {
                        background: #f8f9fa;
                        color: #333;
                    }
                    
                    .dialog-actions button.primary {
                        background: #4CAF50;
                        color: white;
                    }
                    
                    /* Success Animation Styles */
                    .success-animation {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.85);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        z-index: 9999;
                        color: white;
                    }
                    
                    .checkmark {
                        font-size: 5rem;
                        color: #4CAF50;
                        margin-bottom: 1rem;
                        animation: scaleUp 0.5s ease-in-out;
                    }
                    
                    .error-mark {
                        font-size: 5rem;
                        color: #f44336;
                        margin-bottom: 1rem;
                        animation: scaleUp 0.5s ease-in-out;
                    }
                    
                    .success-animation h3 {
                        margin-bottom: 1rem;
                        font-size: 1.8rem;
                    }
                    
                    .success-animation p {
                        margin-bottom: 2rem;
                        text-align: center;
                        max-width: 300px;
                    }
                    
                    .success-animation button {
                        padding: 0.7rem 2rem;
                        background: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: 500;
                    }
                    
                    @keyframes scaleUp {
                        0% { transform: scale(0); opacity: 0; }
                        50% { transform: scale(1.2); opacity: 1; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}</style>
            </Helmet>

            <a href="/" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
            <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
                <h1 id="colorlib-logo">
                    <a href="/" onClick={() => window.location.href = '/'}>InfWX<span>.</span></a>
                </h1>

                <Navigation />

                <Copyright />

            </aside>

            <div id="colorlib-main" style={{ 
                position: 'relative',
                overflow: 'visible'
            }}>
                <div className="hero-wrap hero-wrap-2 js-fullheight" style={{ 
                    backgroundImage: "url(/images/contact_bg.jpg)",
                    backgroundPosition: window.innerWidth <= 768 ? "center center" : undefined,
                    backgroundSize: window.innerWidth <= 768 ? "cover" : undefined
                }} data-stellar-background-ratio="0.5">
                    <div className="overlay"></div>
                    <div className="js-fullheight d-flex justify-content-center align-items-center">
                        <div className="col-md-8 text text-center" style={{
                            padding: window.innerWidth <= 768 ? "20px" : "0",
                            marginTop: window.innerWidth <= 768 ? "20px" : "0"
                        }}>
                            <div className="desc">
                                <h2 className="subheading" style={{
                                    fontSize: window.innerWidth <= 480 ? "1.2rem" : undefined
                                }}>Get In Touch</h2>
                                <h1 className="mb-4" style={{
                                    fontSize: window.innerWidth <= 480 ? "1.8rem" : window.innerWidth <= 768 ? "2rem" : undefined
                                }}>Contact Us</h1>
                                <p className="mb-4" style={{
                                    fontSize: window.innerWidth <= 480 ? "0.9rem" : "1rem",
                                    textAlign: "center",
                                    padding: window.innerWidth <= 768 ? "0 10px" : "0"
                                }}>
                                    Have a project in mind? Want to collaborate? We'd love to hear from you. 
                                    Reach out to us and let's create something amazing together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="ftco-section contact-section" style={{
                    marginTop: '50px',
                    marginLeft: '10px',
                    marginRight: '10px',
                    padding: '7em 0'
                }}>
                    <div className="container">
                        <div className="row d-flex mb-5 contact-info">
                            <div className="col-md-12 mb-4">
                                <h2 className="h4 font-weight-bold">Contact Information</h2>
                            </div>
                            
                            {/* First Row */}
                            <div className="col-md-3">
                                <p>
                                    <i className="fa fa-map-marker mr-2"></i> 
                                    <span>Address:</span> Krishnarajapuram, Bangalore, India - 560049
                                </p>
                            </div>
                            <div className="col-md-3">
                                <p>
                                    <i className="fa fa-phone mr-2"></i> 
                                    <span>Phone:</span> <a href="tel://+918951663446">+91 8951663446</a>
                                </p>
                            </div>
                            <div className="col-md-3">
                                <p>
                                    <i className="fa fa-envelope mr-2"></i> 
                                    <span>Email:</span> <a href="mailto:infinitewavexofficial@gmail.com">infinitewavexofficial@gmail.com</a>
                                </p>
                            </div>

                            <div className="w-100"></div>

                            <div className="col-md-3">
                                <p>
                                    <i className="fa fa-globe mr-2"></i> 
                                    <span>Website:</span> <a href="/">infinitewavex.com</a>
                                </p>
                            </div>
                            <div className="col-md-3">
                                <p>
                                    <i className="fa fa-clock-o mr-2"></i> 
                                    <span>Business Hours:</span> Mon-Fri: 6AM-11PM
                                </p>
                            </div>
                        </div>

                        <div className="row block-9">
                            <div className="col-md-6 order-md-last pr-md-5">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    setShowCancelDialog(true);
                                }}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Your Name" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            placeholder="Your Email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Subject" 
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="tel" 
                                            className="form-control" 
                                            placeholder="Phone (Optional)" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Company (Optional)" 
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                            name="message" 
                                            cols="30" 
                                            rows="7" 
                                            className="form-control" 
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="submit" 
                                            value={isSubmitting ? "Sending..." : "Send Message"} 
                                            className="btn btn-primary py-3 px-5" 
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="col-md-6">
                                <div style={{ height: '100%', minHeight: '300px' }}>
                                    <iframe 
                                        width="100%" 
                                        height="100%"
                                        frameBorder="0" 
                                        scrolling="no" 
                                        marginHeight="0" 
                                        marginWidth="0" 
                                        src="https://www.openstreetmap.org/export/embed.html?bbox=77.5366%2C12.9236%2C77.6366%2C13.0236&amp;layer=mapnik&amp;marker=12.9716%2C77.5946" 
                                        title="Map of our location"
                                        style={{ border: '1px solid black' }}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="ftco-section ftco-hireme">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h2>Ready to start your next project?</h2>
                                <p>Let's discuss how we can help bring your ideas to life with our expertise.</p>
                                <p className="mb-0">
                                    <a href="/#/projectrequest" className="btn btn-primary py-3 px-5">Get Started Today</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="col-md-12 mt-4">
                    <div className="ftco-social text-center">
                        <p><span>Follow Us:</span></p>
                        <ul className="ftco-social mt-3 list-inline">
                            <li className="ftco-animate list-inline-item">
                                <a href="/"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li className="ftco-animate list-inline-item">
                                <a href="/"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li className="ftco-animate list-inline-item">
                                <a href="/"><i className="fa fa-instagram"></i></a>
                            </li>
                            <li className="ftco-animate list-inline-item">
                                <a href="/"><i className="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Footer />

            </div>

            {/* Confirmation Dialog */}
            {showCancelDialog && (
                <div className="confirmation-dialog">
                    <div className="dialog-content">
                        <h3>Confirm Submission</h3>
                        <p>Are you sure you want to send this message?</p>
                        <div className="dialog-actions">
                            <button onClick={() => setShowCancelDialog(false)}>Cancel</button>
                            <button onClick={handleSubmit} className="primary">Send</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success/Error Animation */}
            {showConfirmation && (
                <div className="success-animation">
                    {submitStatus === 'success' ? (
                        <>
                            <div className="checkmark">✓</div>
                            <h3>Message Sent Successfully!</h3>
                            <p>We'll get back to you soon. A confirmation email has been sent to your inbox.</p>
                        </>
                    ) : (
                        <>
                            <div className="error-mark">✗</div>
                            <h3>Something Went Wrong</h3>
                            <p>There was an error sending your message. Please try again later.</p>
                        </>
                    )}
                    <button onClick={() => setShowConfirmation(false)}>Close</button>
                </div>
            )}

            {/* Your existing loader remains the same */}
            <div id="ftco-loader" className="show fullscreen">
                <svg className="circular" width="48px" height="48px">
                    <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/>
                    <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/>
                </svg>
            </div>
        </div>
    );
};

export default Contact;