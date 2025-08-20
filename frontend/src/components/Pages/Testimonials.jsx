import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';

const Testimonials = () => {
  const location = useLocation();
  
  useEffect(() => {
  if (window.AOS) window.AOS.init();
  const scriptElements = [];

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
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

  return (
    <div id="colorlib-page">
      <ThreeJSParticles />
      <Helmet>
        <title>InfiniteWaveX - Testimonials</title>
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
        <div className="hero-wrap js-fullheight" style={{backgroundImage: "url(/images/testimonials_bg.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="desc">
                <h2 className="subheading">Client Experiences</h2>
                <h1 className="mb-4">Testimonials</h1>
                <p className="mb-4">
                  Discover what our clients have to say about their experience working with InfiniteWaveX. 
                  Their success stories fuel our passion for delivering exceptional digital solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-7 heading-section text-center ftco-animate">
                <h2 className="mb-4">What Our Clients Say</h2>
                <p>Real feedback from businesses and individuals we've had the privilege to work with.</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="carousel-testimony owl-carousel ftco-owl">
                  <div className="item">
                    <div className="testimony-wrap text-center py-4 pb-5">
                      <div className="user-img mb-4" style={{backgroundImage: "url(/images/person_1.jpg)"}}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left"></i>
                        </span>
                      </div>
                      <div className="text p-3">
                        <p className="mb-4">InfiniteWaveX transformed our outdated website into a modern, responsive platform that perfectly represents our brand. Their attention to detail and technical expertise exceeded our expectations.</p>
                        <p className="name">Alex Johnson</p>
                        <span className="position">Marketing Director, TechNova</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimony-wrap text-center py-4 pb-5">
                      <div className="user-img mb-4" style={{backgroundImage: "url(/images/person_2.jpg)"}}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left"></i>
                        </span>
                      </div>
                      <div className="text p-3">
                        <p className="mb-4">The AI-powered recommendation system developed by InfiniteWaveX has significantly increased our customer engagement and sales. Their team was professional and delivered on time.</p>
                        <p className="name">Sarah Williams</p>
                        <span className="position">CEO, FashionForward</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimony-wrap text-center py-4 pb-5">
                      <div className="user-img mb-4" style={{backgroundImage: "url(/images/person_3.jpg)"}}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left"></i>
                        </span>
                      </div>
                      <div className="text p-3">
                        <p className="mb-4">Working with InfiniteWaveX on our e-commerce platform was a game-changer. Their technical skills combined with creative design thinking resulted in a seamless shopping experience.</p>
                        <p className="name">Michael Chen</p>
                        <span className="position">Operations Manager, UrbanGoods</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimony-wrap text-center py-4 pb-5">
                      <div className="user-img mb-4" style={{backgroundImage: "url(/images/person_4.jpg)"}}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left"></i>
                        </span>
                      </div>
                      <div className="text p-3">
                        <p className="mb-4">The 3D visualization tools developed by InfiniteWaveX have revolutionized how we present our architectural designs to clients. The immersive experience sets us apart from competitors.</p>
                        <p className="name">Emily Rodriguez</p>
                        <span className="position">Principal Architect, DesignSpace</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimony-wrap text-center py-4 pb-5">
                      <div className="user-img mb-4" style={{backgroundImage: "url(/images/person_5.jpg)"}}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left"></i>
                        </span>
                      </div>
                      <div className="text p-3">
                        <p className="mb-4">InfiniteWaveX's data analytics solution provided insights we didn't even know were possible. Their team understood our business needs and delivered a custom solution that drives our decision-making.</p>
                        <p className="name">David Kim</p>
                        <span className="position">CTO, DataDrive Inc.</span>
                      </div>
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
                <h2 className="mb-4">Case Studies</h2>
                <p>Detailed success stories showcasing our approach and results.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="blog-entry ftco-animate">
                  <a href="#" className="img" style={{backgroundImage: "url(/images/case_study_1.jpg)"}}></a>
                  <div className="text pt-2 mt-3">
                    <span className="category mb-1 d-block"><a href="#">E-commerce Transformation</a></span>
                    <h3 className="mb-4"><a href="#">Revamping UrbanGoods' Online Presence</a></h3>
                    <p className="mb-4">How we increased conversion rates by 47% and reduced cart abandonment by 62% through a complete platform overhaul.</p>
                    <div className="meta-wrap d-md-flex align-items-center">
                      <div className="half">
                        <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Read Case Study</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="blog-entry ftco-animate">
                  <a href="#" className="img" style={{backgroundImage: "url(/images/case_study_2.jpg)"}}></a>
                  <div className="text pt-2 mt-3">
                    <span className="category mb-1 d-block"><a href="#">AI Implementation</a></span>
                    <h3 className="mb-4"><a href="#">AI-Powered Fashion Recommendations</a></h3>
                    <p className="mb-4">Implementing machine learning algorithms that increased FashionForward's average order value by 35%.</p>
                    <div className="meta-wrap d-md-flex align-items-center">
                      <div className="half">
                        <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Read Case Study</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="blog-entry ftco-animate">
                  <a href="#" className="img" style={{backgroundImage: "url(/images/case_study_3.jpg)"}}></a>
                  <div className="text pt-2 mt-3">
                    <span className="category mb-1 d-block"><a href="#">3D Visualization</a></span>
                    <h3 className="mb-4"><a href="#">Immersive Architectural Presentations</a></h3>
                    <p className="mb-4">How DesignSpace won 40% more contracts after implementing our interactive 3D visualization tools.</p>
                    <div className="meta-wrap d-md-flex align-items-center">
                      <div className="half">
                        <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Read Case Study</a></p>
                      </div>
                    </div>
                  </div>
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
                <h2>Ready to become our next success story?</h2>
                <p>Let's discuss how we can help bring your ideas to life with our expertise.</p>
                <p className="mb-0">
                  <a href="/contact" className="btn btn-secondary py-3 px-5">Get Started Today</a>
                </p>
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

export default Testimonials;