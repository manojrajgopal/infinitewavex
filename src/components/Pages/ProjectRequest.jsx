import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { customerType, ...formData });
    alert('Project request submitted successfully!');
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
                      <label className="text-dark">Estimated Budget ($)</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">$</span>
                        </div>
                        <input 
                          type="number" 
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="5000" 
                          min="0"
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
                          {formData.files ? `${formData.files.length} files selected` : 'Choose files (PDF, DOC, JPG, PNG up to 10MB)'}
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