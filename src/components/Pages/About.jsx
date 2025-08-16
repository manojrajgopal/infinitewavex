import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink } from 'react-router-dom';

const About = () => {
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
        <title>Explorer - Free Bootstrap 4 Template by Colorlib</title>
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
        <h1 id="colorlib-logo"><Link to="/">InfWX<span>.</span></Link></h1>
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
                to="/projects" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Projects
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
        <div className="hero-wrap hero-wrap-2 js-fullheight" style={{backgroundImage: "url(/images/about_bg_1.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="img mb-4" style={{backgroundImage: "url(/images/logo.png)"}}></div>
                <div className="desc">
                  <h2 className="subheading">Hello I'm</h2>
                  <h1 className="mb-4">InfiniteWaveX</h1>
                  <p className="mb-4">
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
                  <ul className="ftco-social mt-3">
                    <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                    <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                    <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
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