import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';

const About = () => {

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

  return (
    <div id="colorlib-page">
      <ThreeJSParticles />
      <Helmet>
        <title>InfiniteWaveX - About</title>
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        {/* Add mobile-specific styles */}
        
        <style type="text/css">{`
        /* Fix full height issue on mobile */
          .js-fullheight {
            min-height: 100vh;       /* allow proper full height */
            height: auto !important; /* don’t force fixed 100vh */
            display: flex;
            flex-direction: column;
          }

          html, body {
            height: auto;
            min-height: 100vh;
            overflow-x: hidden;  /* avoid sideways scroll */
            overflow-y: auto;    /* enable vertical scroll */
          }

          @media (max-width: 768px) {
            .hero-wrap-2.js-fullheight {
              padding-top: 20px;
              min-height: calc(100vh - 40px) !important;
            }
            #colorlib-aside {
              padding-top: 20px;
            }
            .img.mb-4 {
              background-size: contain !important;
              min-height: 80px !important;
              margin-top: 10px;
            }
            .desc h1 {
              font-size: 2rem;
            }
            .desc p {
              font-size: 1rem;
              padding: 0 10px;
            }
            .ftco-social {
              margin-top: 20px !important;
            }
          }
          
          @media (max-width: 480px) {
            .hero-wrap-2.js-fullheight {
              padding-top: 10px;
              min-height: calc(100vh - 20px) !important;
            }
            .desc h1 {
              font-size: 1.8rem;
            }
            .desc h2.subheading {
              font-size: 1.2rem;
            }
            .desc p {
              font-size: 0.9rem;
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
        <div className="hero-wrap hero-wrap-2 js-fullheight" style={{ 
          backgroundImage: "url(/images/about_bg_1.jpg)",
          backgroundPosition: window.innerWidth <= 768 ? "center center" : undefined,
          backgroundSize: window.innerWidth <= 768 ? "cover" : undefined
        }} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center" style={{
              padding: window.innerWidth <= 768 ? "20px" : "0",
              marginTop: window.innerWidth <= 768 ? "20px" : "0"
            }}>
            <div className="img mb-4" style={{
              backgroundImage: "url(/images/logo.png)",
              backgroundSize: "contain",
              minHeight: window.innerWidth <= 768 ? "80px" : "100px"
            }}></div>
                <div className="desc">
                  <h2 className="subheading" style={{
                    fontSize: window.innerWidth <= 480 ? "1.2rem" : undefined
                  }}>Hello I'm</h2>
                  <h1 className="mb-4" style={{
                    fontSize: window.innerWidth <= 480 ? "1.8rem" : window.innerWidth <= 768 ? "2rem" : undefined
                  }}>InfiniteWaveX</h1>
                  <p className="mb-4" style={{
                      fontSize: window.innerWidth <= 480 ? "0.9rem" : "1rem",
                      textAlign: "justify",
                      padding: window.innerWidth <= 768 ? "0 10px" : "0"
                    }}>
                    InfiniteWaveX is a forward-thinking digital venture dedicated to creativity, 
                    technology, and storytelling. What began as a small blogging space has 
                    grown into a platform where ideas, innovation, and inspiration converge. 
                    We believe that every thought has the power to create ripples, and those 
                    ripples form the infinite waves of change that shape the future.  
                    <br /><br />
                    At InfiniteWaveX, we explore diverse domains including technology, design, 
                    business insights, lifestyle, and creative expression. Our goal is to 
                    inspire individuals and businesses by sharing meaningful stories, 
                    practical knowledge, and forward-looking perspectives. We are not just 
                    a blogging space; we are a community built around curiosity, learning, 
                    and digital growth.  
                    <br /><br />
                    With a mission to empower dreamers, creators, and doers, InfiniteWaveX 
                    is constantly evolving into more than just content—it’s an experience. 
                    Through engaging articles, digital solutions, and community-driven 
                    initiatives, we strive to connect people across the globe who share 
                    a passion for innovation and creativity. Whether you are here to 
                    read, learn, collaborate, or get inspired, InfiniteWaveX welcomes you 
                    to ride the wave of endless possibilities.
                  </p>
                  <ul
                    className="ftco-social mt-3"
                    style={{
                      display: "block",
                      marginTop: window.innerWidth <= 768 ? "20px !important" : undefined
                    }}
                  >
                    <li>
                      <a href="#"><i className="fa fa-facebook"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fa fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fa fa-instagram"></i></a>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div>
    </div>
  );
};

export default About;