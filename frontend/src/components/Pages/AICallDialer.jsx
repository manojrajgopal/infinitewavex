import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';
import axios from 'axios';

const AICallDialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [initialMessage, setInitialMessage] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState('');
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState('');
  const [currentCallSid, setCurrentCallSid] = useState('');
  const messagesEndRef = useRef(null);
  const ws = useRef(null);
  const conversationContainerRef = useRef(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
  const WS_URL = BACKEND_URL.replace('http', 'ws') + '/api/ai-call-dialer/ws';
  const API_SECRET_KEY = process.env.REACT_APP_API_SECRET_KEY;

  const location = useLocation();
  
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

    // Connect to WebSocket
    ws.current = new WebSocket(`${WS_URL}?api_key=${API_SECRET_KEY}`);
    
    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };
    
    ws.current.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);
            
            // Handle different message types
            if (message.type === 'call_status') {
            // Update call status
            setCallStatus(`Call ${message.status}`);
            
            // If call ended completely, reset the form
            if (['completed', 'failed', 'busy', 'no-answer', 'canceled'].includes(message.status)) {
                setIsCalling(false);
                
                // Reset form after a short delay
                setTimeout(() => {
                setCallStatus('');
                setPhoneNumber('');
                setInitialMessage('');
                }, 2000);
            }
            } else {
            // Add message to conversation
            setConversation(prev => [...prev, {
                speaker: message.speaker,
                message: message.message,
                timestamp: new Date(message.timestamp).toLocaleTimeString()
            }]);
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
      setIsCalling(false);

      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

    const scrollToBottom = () => {
        if (conversationContainerRef.current) {
            conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
        }
    };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const makeCall = async (e) => {
    e.preventDefault();
    if (!phoneNumber || !initialMessage) {
      setError('Please enter both phone number and initial message');
      return;
    }

    setIsCalling(true);
    setCallStatus('Initiating call...');
    setError('');
    setConversation([]);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/ai-call-dialer/call`, {
        to_number: phoneNumber.replace(/\D/g, ''), // Send only digits
        message: initialMessage
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-API-Key': API_SECRET_KEY
        }
      });

      if (response.data.status === 'call initiated') {
        setCallStatus('Call initiated successfully');
        setCurrentCallSid(response.data.call_sid);
        
        // Add initial AI message to conversation
        setConversation([{
          speaker: 'AI',
          message: response.data.ai_text,
          timestamp: new Date().toLocaleTimeString()
        }]);
      } else {
        setError(response.data.message || 'Failed to initiate call');
        setIsCalling(false);
      }
    } catch (err) {
      console.error('Call error:', err);
      setError(err.response?.data?.message || 'Error making call');
      setIsCalling(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div id="colorlib-page">
      <ThreeJSParticles />
      <Helmet>
        <title>InfiniteWaveX - AI Call Dialer</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
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
        
        <style type="text/css">{`
          .js-fullheight {
            min-height: 100vh;
            height: auto !important;
            display: flex;
            flex-direction: column;
          }

          html, body {
            height: auto;
            min-height: 100vh;
            overflow-x: hidden;
            overflow-y: auto;
          }

          .conversation-container {
            max-height: 400px;
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 5px;
            padding: 15px;
            background: #f9f9f9;
          }

          .ai-message {
            background: #f1f1f1;
            color: #333;
            border-radius: 10px;
            padding: 10px 15px;
            margin-bottom: 10px;
            max-width: 80%;
            text-align: left;
          }

          .human-message {
            background: #007bff;
            color: white;
            border-radius: 10px;
            padding: 10px 15px;
            margin-bottom: 10px;
            max-width: 80%;
            margin-left: auto;
            text-align: right;
          }

          .message-timestamp {
            font-size: 0.7rem;
            opacity: 0.7;
            margin-top: 5px;
          }

          @media (max-width: 768px) {
            .hero-wrap.js-fullheight {
              padding-top: 20px;
            }
            #colorlib-aside {
              padding-top: 20px;
            }
            .conversation-container {
              max-height: 300px;
            }
            .ai-message, .human-message {
              max-width: 90%;
            }
          }
        `}</style>
      </Helmet>

      <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
      <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
        <h1 id="colorlib-logo">
          <a href="#" onClick={() => window.location.href = '/'}>InfWX<span>.</span></a>
        </h1>

        <Navigation />

        <Copyright />
      </aside>

      <div id="colorlib-main">
        <div className="hero-wrap js-fullheight" style={{backgroundImage: "url(/images/ai_call_bg.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="desc">
                <h2 className="subheading">AI-Powered Communication</h2>
                <h1 className="mb-4">AI Call Dialer</h1>
                <p className="mb-4">
                  Connect with your contacts using our advanced AI calling system. 
                  The AI will initiate conversations and handle interactions intelligently.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-7 heading-section text-center ftco-animate">
                <h2 className="mb-4">Make AI Calls</h2>
                <p>Enter the details below to initiate an AI-powered phone call</p>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="wrapper">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="contact-wrap w-100 p-md-5 p-4">
                        <form onSubmit={makeCall}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="label" htmlFor="phoneNumber">Phone Number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="phoneNumber"
                                  placeholder="Enter phone number (e.g., +919876543210)"
                                  value={phoneNumber}
                                  onChange={handlePhoneChange}
                                  disabled={isCalling}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="col-md-12"> 
                              <div className="form-group">
                                <label className="label" htmlFor="initialMessage">Initial Message</label>
                                <textarea
                                  className="form-control"
                                  id="initialMessage"
                                  cols="30"
                                  rows="4"
                                  placeholder="Enter the initial message for the AI to say"
                                  value={initialMessage}
                                  onChange={(e) => setInitialMessage(e.target.value)}
                                  disabled={isCalling}
                                  required
                                ></textarea>
                              </div>
                            </div>
                            
                            {error && (
                              <div className="col-md-12">
                                <div className="alert alert-danger" role="alert">
                                  {error}
                                </div>
                              </div>
                            )}
                            
                            {callStatus && (
                              <div className="col-md-12">
                                <div className="alert alert-info" role="alert">
                                  {callStatus}
                                </div>
                              </div>
                            )}
                            
                            <div className="col-md-12">
                              <div className="form-group">
                                <button 
                                  type="submit" 
                                  className="btn btn-primary py-3 px-5"
                                  disabled={isCalling}
                                >
                                  {isCalling ? (
                                    <>
                                      <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                      Calling...
                                    </>
                                  ) : 'Make AI Call'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        
                        <div className="mt-5">
                          <h3 className="mb-4">Conversation</h3>
                          
                          {conversation.length === 0 ? (
                            <p className="text-muted text-center py-3">
                              No conversation yet. Make a call to start the conversation.
                            </p>
                          ) : (
                            <div 
                                className="conversation-container"
                                ref={conversationContainerRef}
                                >
                                {conversation.map((msg, index) => (
                                    <div 
                                    key={index} 
                                    className={msg.speaker === 'AI' ? 'ai-message' : 'human-message'}
                                    >
                                    <div className="font-weight-bold">{msg.speaker}</div>
                                    <div>{msg.message}</div>
                                    <div className="message-timestamp">{msg.timestamp}</div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <div id="ftco-loader" className="show fullscreen">
        <svg className="circular" width="48px" height="48px">
          <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/>
          <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/>
        </svg>
      </div>
    </div>
  );
};

export default AICallDialer;