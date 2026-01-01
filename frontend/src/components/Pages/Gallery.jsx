import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer'
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';

const Gallery = () => {
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
        // Load jQuery first
        '/js/jquery.min.js',
        // Then other dependencies
        '/js/popper.min.js',
        '/js/bootstrap.min.js',
        // Then plugins
        '/js/jquery.easing.1.3.js',
        '/js/jquery.waypoints.min.js',
        '/js/jquery.stellar.min.js',
        '/js/owl.carousel.min.js',
        '/js/jquery.magnific-popup.min.js',
        '/js/aos.js',
        '/js/jquery.animateNumber.min.js',
        '/js/bootstrap-datepicker.js',
        // '/js/jquery.timepicker.min.js',  // Make sure this file exists
        '/js/scrollax.min.js',
        // Load Google Maps only if needed
        // '/js/google-map.js',  // Consider loading this only when needed
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

  return (
    <div id="colorlib-page">
      <ThreeJSParticles />
      <Helmet>
        <title>InfiniteWaveX</title>
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

      <div id="colorlib-main">
        <section className="ftco-section-2">
          <div className="photograhy">
            <div className="row no-gutters">
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_1.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 01</h3>
                    <span>Technology</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_2.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 02</h3>
                    <span>Python Language</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_3.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 03</h3>
                    <span>Coding</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_4.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 04</h3>
                    <span>Website Design</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_5.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 05</h3>
                    <span>Big Data</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_6.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 06</h3>
                    <span>Digital Market</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_7.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 07</h3>
                    <span>Animation</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_8.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 08</h3>
                    <span>Photography</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_9.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 09</h3>
                    <span>Interior Design</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_10.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 10</h3>
                    <span>Music</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_11.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 11</h3>
                    <span>Application</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/image_12.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Work 12</h3>
                    <span>AI</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />

      </div>

      <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div>
    </div>
  );
};

export default Gallery;