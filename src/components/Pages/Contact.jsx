import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer'
import Copyright from '../Copyright';

const Contact = () => {
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
    //   '/js/jquery.timepicker.min.js',
      '/js/scrollax.min.js',
    //   '/js/google-map.js',
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
  }, [Location]);

  return (
    <div id="colorlib-page">
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
            height: auto !important; /* don’t force fixed 100vh */
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

      <div id="colorlib-main" style={{ 
                position: 'relative',
                overflow: 'visible'
            }}>
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
                            <div className="w-100"></div>
                            <div className="col-md-3">
                                <p><span>Address:</span> Krishnarajapuram, Bangalore, India - 560049</p>
                            </div>
                            <div className="col-md-3">
                                <p><span>Phone:</span> <a href="tel://1234567920">+91 8951663446</a></p>
                            </div>
                            <div className="col-md-3">
                                <p><span>Email:</span> <a href="mailto:infinitewavexofficial@gmail.com">infinitewavexofficial@gmail.com</a></p>
                            </div>
                            <div className="col-md-3">
                                <p><span>Website</span> <a href="#">yoursite.com</a></p>
                            </div>
                        </div>
                        <div className="row block-9">
                            <div className="col-md-6 order-md-last pr-md-5">
                                <form action="#">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Subject" />
                                    </div>
                                    <div className="form-group">
                                        <textarea name="" id="" cols="30" rows="7" className="form-control" placeholder="Message"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5" />
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
                                        style={{ border: '1px solid black' }}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />

            </div>

            {/* Your existing loader remains the same */}
            <div id="ftco-loader" className="show fullscreen">
                {/* ... loader SVG ... */}
            </div>
        </div>
    );
};

export default Contact;