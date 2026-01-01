import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';

const AIFactory = () => {
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
        <title>InfiniteWaveX - AI Factory</title>
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
                <a href="/#/ai-image" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/ai_image_gen.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>AI Image Generation</h3>
                    <span>Create stunning visuals with AI</span>
                  </div>
                </a>
              </div>
            <div className="col-md-3">
                <a href="/#/ai-video" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/ai_video_gen.jpg)"}}>
                    <div className="overlay"></div>
                    <div className="text text-center">
                    <h3>AI Video Generation</h3>
                    <span>Create dynamic videos with AI</span>
                    </div>
                </a>
            </div>
              <div className="col-md-3">
                <a href="/#/ai-call" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/ai_call.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>AI Call Dialer</h3>
                    <span>Intelligent voice conversations</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/ai_chatbot.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>AI Chatbots</h3>
                    <span>Smart conversational agents</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/ai_analytics.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>AI Analytics</h3>
                    <span>Data-driven insights</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/computer_vision.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Computer Vision</h3>
                    <span>Image and video analysis</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/nlp.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Natural Language Processing</h3>
                    <span>Text understanding and generation</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/predictive_ai.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Predictive AI</h3>
                    <span>Forecasting and predictions</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/ai_automation.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>AI Automation</h3>
                    <span>Streamline business processes</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/machine_learning.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Machine Learning</h3>
                    <span>Intelligent algorithms</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/deep_learning.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Deep Learning</h3>
                    <span>Neural networks</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/ai_consulting.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>AI Consulting</h3>
                    <span>Strategic AI implementation</span>
                  </div>
                </a>
              </div>
              <div className="col-md-3">
                <a href="/#/" className="photography-entry img d-flex justify-content-center align-items-center" style={{backgroundImage: "url(/images/custom_ai.jpg)"}}>
                  <div className="overlay"></div>
                  <div className="text text-center">
                    <h3>Custom AI Solutions</h3>
                    <span>Tailored AI development</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-8 text-center heading-section ftco-animate">
                <h2 className="mb-4">Our AI Capabilities</h2>
                <p>Discover the full range of artificial intelligence services we offer to transform your business</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 ftco-animate">
                <div className="blog-entry">
                  <div className="text text-2 pt-2 mt-3">
                    <span className="category mb-3 d-block">AI Development</span>
                    <h3 className="mb-4"><a href="/#/">Custom AI Models</a></h3>
                    <p className="mb-4">We develop bespoke AI models tailored to your specific business needs and data requirements.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ftco-animate">
                <div className="blog-entry">
                  <div className="text text-2 pt-2 mt-3">
                    <span className="category mb-3 d-block">AI Integration</span>
                    <h3 className="mb-4"><a href="/#/">Seamless Integration</a></h3>
                    <p className="mb-4">Our experts integrate AI capabilities into your existing systems and workflows for maximum impact.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ftco-animate">
                <div className="blog-entry">
                  <div className="text text-2 pt-2 mt-3">
                    <span className="category mb-3 d-block">AI Training</span>
                    <h3 className="mb-4"><a href="/#/">Knowledge Transfer</a></h3>
                    <p className="mb-4">We provide comprehensive training to help your team understand and work with AI technologies.</p>
                  </div>
                </div>
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

export default AIFactory;