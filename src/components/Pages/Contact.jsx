import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink } from 'react-router-dom';

const Contact = () => {
  useEffect(() => {
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

    loadScripts();

    return () => {
      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <div id="colorlib-page">
      <Helmet>
        <title>Elen - Free Bootstrap 4 Template by Colorlib</title>
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
        <h1 id="colorlib-logo"><Link to="/">elen<span>.</span></Link></h1>
        <nav id="colorlib-main-menu" role="navigation">
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/photography" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Photography
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/travel" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Travel
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/fashion" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Fashion
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="colorlib-footer">
          <p>
            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://manojrajgopal.github.io/portfolio/" target="_blank">InfiniteWaveX</a>
          </p>
          <ul>
            <li><a href="#"><i className="icon-facebook"></i></a></li>
            <li><a href="#"><i className="icon-twitter"></i></a></li>
            <li><a href="#"><i className="icon-instagram"></i></a></li>
            <li><a href="#"><i className="icon-linkedin"></i></a></li>
          </ul>
        </div>
      </aside>

      <div id="colorlib-main">
        <section className="ftco-section contact-section">
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
                <iframe 
                    width="100%" 
                    height="100%"
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.5366%2C12.9236%2C77.6366%2C13.0236&amp;layer=mapnik&amp;marker=12.9716%2C77.5946" 
                    style={{border: '1px solid black'}}
                    >
                    </iframe>
              </div>
            </div>
          </div>
        </section>

        <footer className="ftco-footer ftco-bg-dark ftco-section">
          <div className="container px-md-5">
            <div className="row mb-5">
              <div className="col-md">
                <div className="ftco-footer-widget mb-4 ml-md-4">
                  <h2 className="ftco-heading-2">Category</h2>
                  <ul className="list-unstyled categories">
                    <li><a href="#">Photography <span>(6)</span></a></li>
                    <li><a href="#">Fashion <span>(8)</span></a></li>
                    <li><a href="#">Technology <span>(2)</span></a></li>
                    <li><a href="#">Travel <span>(2)</span></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Archives</h2>
                  <ul className="list-unstyled categories">
                    <li><a href="#">October 2018 <span>(6)</span></a></li>
                    <li><a href="#">September 2018 <span>(6)</span></a></li>
                    <li><a href="#">August 2018 <span>(8)</span></a></li>
                    <li><a href="#">July 2018 <span>(2)</span></a></li>
                    <li><a href="#">June 2018 <span>(7)</span></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Have a Questions?</h2>
                  <div className="block-23 mb-3">
                    <ul>
                      <li><span className="icon icon-map-marker"></span><span className="text">Krishshnarajapuram, Bangalore, India - 560049</span></li>
                      <li><a href="#"><span className="icon icon-phone"></span><span className="text">+91 8951663446</span></a></li>
                      <li><a href="#"><span className="icon icon-envelope"></span><span className="text">infinitewavexofficial@gmail.com</span></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p>
                  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://manojrajgopal.github.io/portfolio/" target="_blank">InfiniteWaveX</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div>
    </div>
  );
};

export default Contact;