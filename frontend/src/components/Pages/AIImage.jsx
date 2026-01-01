import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AIFactoryNavigation from '../AIFactoryNavigation';
import Footer from '../Footer';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';
import axios from 'axios';

// const BACKEND_URL = process.env.REACT_APP_AI_BACKEND_URL || 'http://localhost:8001';
const BACKEND_URL = 'http://localhost:8000';
const API_SECRET_KEY = process.env.REACT_APP_API_SECRET_KEY;

// Loading Animation Component
const LoadingAnimation = ({ isVisible, progress }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      flexDirection: 'column'
    }}>
      <div className="ai-loading-content" style={{
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="ai-spinner" style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        
        <h3 style={{ marginBottom: '15px' }}>Generating Your Image</h3>
        
        {progress > 0 && (
          <div className="progress-container" style={{
            width: '300px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            margin: '0 auto'
          }}>
            <div className="progress-bar" style={{
              width: `${progress}%`,
              height: '10px',
              backgroundColor: '#3498db',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        )}
        
        <p style={{ marginTop: '15px', fontSize: '14px', opacity: 0.8 }}>
          This may take a few moments...
        </p>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};

// Result Modal Component
const ResultModal = ({ isOpen, onClose, imageUrl, prompt, modelUsed }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="modal-content" style={{
        backgroundColor: '#1a1a1a',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '90%',
        maxHeight: '90%',
        width: 'auto',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        overflow: 'auto',
        color: 'white'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#fff' }}>Image Generated Successfully!</h3>
        
        <div className="generated-image-container" style={{
          marginBottom: '20px',
          maxWidth: '512px',
          margin: '0 auto 20px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
        }}>
          <img 
            src={imageUrl} 
            alt="Generated image" 
            style={{ 
              width: '100%', 
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
        
        <div className="generation-details" style={{
          textAlign: 'left',
          marginBottom: '25px',
          padding: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px'
        }}>
          <p><strong>Prompt:</strong> {prompt}</p>
          <p><strong>Model:</strong> {modelUsed}</p>
        </div>
        
        <div className="action-buttons" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <a 
            href={imageUrl} 
            download="generated-image.png"
            className="btn btn-primary"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Download Image
          </a>
          
          <button 
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Generate Another
          </button>
        </div>
      </div>
    </div>
  );
};

const AIImage = () => {
  const [selectedModel, setSelectedModel] = useState('stabilityai/stable-diffusion-3.5-large');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [numInferenceSteps, setNumInferenceSteps] = useState(20);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generationDetails, setGenerationDetails] = useState({});
  const [generationHistory, setGenerationHistory] = useState([]);
  const [error, setError] = useState(null);

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

    // Load generation history from localStorage
    const savedHistory = localStorage.getItem('aiGenerationHistory');
    if (savedHistory) {
      try {
        setGenerationHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading generation history:', e);
      }
    }

    return () => {
      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [location]);

  const models = [
    { 
      value: 'stabilityai/stable-diffusion-3.5-large', 
      label: 'Stable Diffusion 3.5 Large (Higher Quality)' 
    },
    { 
      value: 'stabilityai/stable-diffusion-3.5-large-turbo', 
      label: 'Stable Diffusion 3.5 Large Turbo (Faster Generation)' 
    },
    { 
        value: 'runwayml/stable-diffusion-v1-5', 
        label: 'Stable Diffusion 1.5 (Classic)' 
    },
    { 
        value: 'stabilityai/stable-diffusion-2-1', 
        label: 'Stable Diffusion 2.1 (Enhanced)' 
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setIsLoading(true);
    setProgress(0);
    setError(null);
    
    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 500);
      
      const requestData = {
        prompt,
        negative_prompt: negativePrompt,
        width,
        height,
        num_inference_steps: numInferenceSteps,
        guidance_scale: guidanceScale,
        model: selectedModel
      };
      
      const response = await axios.post(
        `${BACKEND_URL}/api/ai-image/generate`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': API_SECRET_KEY
          },
          timeout: 300000 // 5 minutes timeout
        }
      );
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Add to generation history
      const newGeneration = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        prompt,
        model: selectedModel,
        image: response.data.image
      };
      
      const updatedHistory = [newGeneration, ...generationHistory.slice(0, 9)];
      setGenerationHistory(updatedHistory);
      localStorage.setItem('aiGenerationHistory', JSON.stringify(updatedHistory));
      
      setGeneratedImage(response.data.image);
      setGenerationDetails({
        prompt,
        model: selectedModel,
        time: response.data.generation_time
      });
      
      setTimeout(() => {
        setIsLoading(false);
        setResultModalOpen(true);
      }, 500);
      
    } catch (error) {
      console.error('Error generating image:', error);
      setIsLoading(false);
      setProgress(0);
      
      if (error.response) {
        setError(`Server error: ${error.response.data.detail || 'Unknown error'}`);
      } else if (error.request) {
        setError('Network error: Could not connect to the AI service');
      } else {
        setError('Error: ' + error.message);
      }
    }
  };

  const clearHistory = () => {
    setGenerationHistory([]);
    localStorage.removeItem('aiGenerationHistory');
  };

  const loadFromHistory = (historyItem) => {
    setPrompt(historyItem.prompt);
    setSelectedModel(historyItem.model);
  };

  return (
    <div id="colorlib-page">
      <ThreeJSParticles />
      
      <Helmet>
        <title>InfiniteWaveX - AI Image Generation</title>
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
        
        <style>
          {`
            .ai-params-container {
              background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
              border-radius: 12px;
              padding: 25px;
              margin-bottom: 30px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            
            .param-slider {
              width: 100%;
              margin: 10px 0;
            }
            
            .param-value {
              font-weight: bold;
              color: #3498db;
            }
            
            .history-item {
              transition: all 0.3s ease;
              cursor: pointer;
            }
            
            .history-item:hover {
              transform: translateY(-3px);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .prompt-input {
              min-height: 100px;
            }
            
            .ai-feature-card {
              background: rgba(255, 255, 255, 0.05);
              border-radius: 10px;
              padding: 20px;
              height: 100%;
              transition: all 0.3s ease;
            }
            
            .ai-feature-card:hover {
              background: rgba(255, 255, 255, 0.1);
              transform: translateY(-5px);
            }
            
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            
            .gradient-bg {
              background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
              background-size: 400% 400%;
              animation: gradientShift 15s ease infinite;
            }
          `}
        </style>
      </Helmet>

      <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
      <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
        <h1 id="colorlib-logo">
          <a href="#" onClick={() => window.location.href = '/'}>InfWX<span>.</span></a>
        </h1>

        <AIFactoryNavigation />

        <Copyright />
      </aside>

      <div id="colorlib-main" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-wrap js-fullheight gradient-bg" style={{ background: 'none' }} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="img mb-4" style={{
                backgroundImage: "url(/images/logo.png)",
                backgroundSize: "contain",
                minHeight: "100px"
              }}></div>
              <div className="desc">
                <h2 className="subheading">AI-Powered Creativity</h2>
                <h1 className="mb-4">Image Generation</h1>
                <p className="mb-4">
                  Transform your ideas into stunning visuals with our advanced AI image generation. 
                  Choose between high-quality or turbo modes to create unique artwork from text descriptions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-7 heading-section text-center ftco-animate">
                <h2 className="mb-4">Create AI-Generated Images</h2>
                <p>Describe what you want to see and let our AI bring your imagination to life.</p>
              </div>
            </div>
            
            {error && (
              <div className="row justify-content-center mb-4">
                <div className="col-md-10">
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="close" onClick={() => setError(null)}>
                      <span>&times;</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="row">
              <div className="col-md-8">
                <div className="ai-params-container ftco-animate">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="text-light">Select Model *</label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="form-control bg-dark text-light"
                        required
                      >
                        {models.map((model) => (
                          <option key={model.value} value={model.value}>
                            {model.label}
                          </option>
                        ))}
                      </select>
                      <small className="form-text text-muted">
                        {selectedModel.includes('turbo') 
                          ? 'Turbo mode is faster but may have slightly lower quality' 
                          : 'Standard mode produces higher quality images but takes longer'}
                      </small>
                    </div>
                    
                    <div className="form-group">
                      <label className="text-light">Prompt *</label>
                      <textarea 
                        className="form-control prompt-input bg-dark text-light" 
                        placeholder="Describe what you want to generate in detail..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="text-light">Negative Prompt (Optional)</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-light" 
                        placeholder="What you don't want to see in the image..."
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                      />
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="text-light">Width: <span className="param-value">{width}px</span></label>
                          <input 
                            type="range" 
                            className="form-control param-slider" 
                            min="256"
                            max="1024"
                            step="64"
                            value={width}
                            onChange={(e) => setWidth(parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="text-light">Height: <span className="param-value">{height}px</span></label>
                          <input 
                            type="range" 
                            className="form-control param-slider" 
                            min="256"
                            max="1024"
                            step="64"
                            value={height}
                            onChange={(e) => setHeight(parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="text-light">Inference Steps: <span className="param-value">{numInferenceSteps}</span></label>
                          <input 
                            type="range" 
                            className="form-control param-slider" 
                            min="10"
                            max="50"
                            step="1"
                            value={numInferenceSteps}
                            onChange={(e) => setNumInferenceSteps(parseInt(e.target.value))}
                          />
                          <small className="form-text text-muted">More steps = higher quality (slower)</small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="text-light">Guidance Scale: <span className="param-value">{guidanceScale}</span></label>
                          <input 
                            type="range" 
                            className="form-control param-slider" 
                            min="1"
                            max="20"
                            step="0.5"
                            value={guidanceScale}
                            onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                          />
                          <small className="form-text text-muted">How closely to follow the prompt</small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group text-center mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary py-3 px-5"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Generating...' : 'Generate Image'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="ftco-animate">
                  <div className="card bg-dark text-light mb-4">
                    <div className="card-header">
                      <h5 className="mb-0">Generation History</h5>
                    </div>
                    <div className="card-body">
                      {generationHistory.length === 0 ? (
                        <p className="text-muted">No generation history yet</p>
                      ) : (
                        <>
                          <div className="history-list">
                            {generationHistory.slice(0, 5).map((item) => (
                              <div 
                                key={item.id} 
                                className="history-item card mb-2 bg-secondary text-light"
                                onClick={() => loadFromHistory(item)}
                                style={{ cursor: 'pointer' }}
                              >
                                <div className="card-body p-2">
                                  <small className="text-truncate d-block">{item.prompt}</small>
                                  <small className="text-muted">{new Date(item.timestamp).toLocaleString()}</small>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button 
                            className="btn btn-sm btn-outline-light mt-2"
                            onClick={clearHistory}
                          >
                            Clear History
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="card bg-dark text-light">
                    <div className="card-header">
                      <h5 className="mb-0">Tips for Better Results</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled">
                        <li className="mb-2">• Be specific and descriptive</li>
                        <li className="mb-2">• Include details about style, mood, and composition</li>
                        <li className="mb-2">• Use negative prompts to exclude unwanted elements</li>
                        <li className="mb-2">• Higher resolution takes longer but produces better results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-7 heading-section text-center ftco-animate">
                <h2 className="mb-4">How It Works</h2>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-4 ftco-animate">
                <div className="ai-feature-card">
                  <div className="icon mb-3">
                    <span className="flaticon-idea"></span>
                  </div>
                  <h4>Describe Your Vision</h4>
                  <p>Provide a detailed text description of what you want to create. The more specific you are, the better the results.</p>
                </div>
              </div>
              
              <div className="col-md-4 ftco-animate">
                <div className="ai-feature-card">
                  <div className="icon mb-3">
                    <span className="flaticon-ai"></span>
                  </div>
                  <h4>AI Processes Your Request</h4>
                  <p>Our advanced AI models interpret your description and generate a unique image based on your parameters.</p>
                </div>
              </div>
              
              <div className="col-md-4 ftco-animate">
                <div className="ai-feature-card">
                  <div className="icon mb-3">
                    <span className="flaticon-download"></span>
                  </div>
                  <h4>Download & Use</h4>
                  <p>Once generated, you can download your image in high resolution and use it for your projects.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ftco-section ftco-hireme bg-primary">
          <div className="overlay"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <h2>Need Custom AI Solutions?</h2>
                <p>We can develop tailored AI applications for your specific business needs.</p>
                <p className="mb-0">
                  <a href="/#/contact" className="btn btn-secondary py-3 px-5">Contact Us</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Loading Animation */}
      <LoadingAnimation isVisible={isLoading} progress={progress} />
      
      {/* Result Modal */}
      <ResultModal 
        isOpen={resultModalOpen}
        onClose={() => setResultModalOpen(false)}
        imageUrl={generatedImage}
        prompt={generationDetails.prompt}
        modelUsed={generationDetails.model}
      />

      <div id="ftco-loader" className="show fullscreen">
        <svg className="circular" width="48px" height="48px">
          <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/>
          <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/>
        </svg>
      </div>
    </div>
  );
};

export default AIImage;