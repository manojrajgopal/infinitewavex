import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="modal-content" style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Confirm Submission</h3>
        <p style={{ marginBottom: '25px', color: '#666' }}>Are you sure you want to submit your project request?</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
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
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Confirm'}
          </button>
        </div>
        
        {isLoading && (
          <div style={{ marginTop: '20px' }}>
            <div className="loading-spinner" style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        )}
      </div>
    </div>
  );
};

// Success/Error Modal Component
const ResultModal = ({ isOpen, onClose, isSuccess, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="modal-content" style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '50px',
          marginBottom: '15px',
          color: isSuccess ? '#28a745' : '#dc3545'
        }}>
          {isSuccess ? '✓' : '✗'}
        </div>
        
        <h3 style={{ 
          marginBottom: '15px', 
          color: isSuccess ? '#28a745' : '#dc3545' 
        }}>
          {isSuccess ? 'Success!' : 'Error!'}
        </h3>
        
        <p style={{ marginBottom: '25px', color: '#666' }}>{message}</p>
        
        <button 
          onClick={onClose}
          style={{
            padding: '10px 25px',
            backgroundColor: isSuccess ? '#28a745' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const ProjectRequest = () => {
  const [customerType, setCustomerType] = useState('individual');
  const [formData, setFormData] = useState({
    projectTitle: '',
    name: '',
    email: '',
    budget: '',
    deadline: '',
    details: '',
    files: null
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    return () => {
      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [location]);

  const customerTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'student', label: 'Student (15% discount)' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'startup', label: 'Startup (10% discount)' },
    { value: 'small-business', label: 'Small Business' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'non-profit', label: 'Non-Profit Organization' },
    { value: 'government', label: 'Government Agency' },
    { value: 'educational', label: 'Educational Institution' },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('customer_type', customerType);
      formDataToSend.append('project_title', formData.projectTitle);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('budget', formData.budget);
      formDataToSend.append('deadline', formData.deadline);
      formDataToSend.append('details', formData.details);
      
      // Append files if any
      if (formData.files) {
        for (let i = 0; i < formData.files.length; i++) {
          formDataToSend.append('files', formData.files[i]);
        }
      }
      
      const response = await axios.post(
        `${BACKEND_URL}/api/project-requests/`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log('Form submitted successfully:', response.data);
      
      // Show success modal
      setIsSuccess(true);
      setResultMessage('Project request submitted successfully!');
      setIsResultModalOpen(true);
      
      // Reset form
      setCustomerType('individual');
      setFormData({
        projectTitle: '',
        name: '',
        email: '',
        budget: '',
        deadline: '',
        details: '',
        files: null
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show error modal
      setIsSuccess(false);
      setResultMessage('Error submitting project request. Please try again.');
      setIsResultModalOpen(true);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div id="colorlib-page">
      <ThreeJSParticles />
      
      <Helmet>
        <title>InfiniteWaveX - Project Request</title>
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
      </Helmet>

      <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
      <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
        <h1 id="colorlib-logo">
          <a href="#" onClick={() => window.location.href = '/'}>InfWX<span>.</span></a>
        </h1>

        <Navigation />

        <Copyright />
      </aside>

      <div id="colorlib-main" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-wrap js-fullheight" style={{ background: 'none' }} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="img mb-4" style={{
                backgroundImage: "url(/images/logo.png)",
                backgroundSize: "contain",
                minHeight: "100px"
              }}></div>
              <div className="desc">
                <h2 className="subheading">Start Your Project</h2>
                <h1 className="mb-4">Project Request</h1>
                <p className="mb-4">
                  Tell us about your project requirements and let our experts bring your ideas to life. 
                  We'll review your request and get back to you with a customized solution.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-7 heading-section text-center ftco-animate">
                <h2 className="mb-4">Submit Your Project Details</h2>
                <p>Fill out the form below and our team will contact you within 24 hours.</p>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-12">
                <div className="contact-form bg-light p-4 p-md-5 ftco-animate">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="text-dark">Customer Type *</label>
                      <select
                        value={customerType}
                        onChange={(e) => setCustomerType(e.target.value)}
                        className="form-control"
                        required
                      >
                        {customerTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="text-dark">Project Title *</label>
                      <input 
                        type="text" 
                        name="projectTitle"
                        value={formData.projectTitle}
                        onChange={handleChange}
                        className="form-control" 
                        placeholder="My Awesome Project" 
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="text-dark">Your Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control" 
                        placeholder="John Doe" 
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="text-dark">Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control" 
                        placeholder="your@email.com" 
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="text-dark">Estimated Budget (₹)</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">₹</span>
                        </div>
                        <input 
                          type="number" 
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="900" 
                          min="750"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="text-dark">Target Deadline</label>
                      <input 
                        type="date" 
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="text-dark">Project Details *</label>
                      <textarea 
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        className="form-control" 
                        placeholder="Describe your project requirements, goals, and any specific needs..."
                        rows="8"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="text-dark">Attachments</label>
                      <div className="custom-file">
                        <input 
                          type="file" 
                          name="files"
                          onChange={handleChange}
                          className="custom-file-input" 
                          id="customFile" 
                          multiple 
                        />
                        <label className="custom-file-label" htmlFor="customFile">
                          {formData.files ? `${formData.files.length} files selected` : 'Choose files'}
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group text-center">
                      <button 
                        type="submit" 
                        className="btn btn-primary py-3 px-5"
                      >
                        Submit Project Request
                      </button>
                    </div>
                  </form>
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
                <h2>Have questions about your project?</h2>
                <p>Contact us directly for a free consultation and quote.</p>
                <p className="mb-0">
                  <a href="/contact" className="btn btn-secondary py-3 px-5">Contact Us</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        isLoading={isSubmitting}
      />
      
      {/* Result Modal */}
      <ResultModal 
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        isSuccess={isSuccess}
        message={resultMessage}
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

export default ProjectRequest;