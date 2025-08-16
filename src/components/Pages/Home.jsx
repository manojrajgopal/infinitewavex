import React, { useEffect,useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink } from 'react-router-dom';


const Home = () => {
  const [showMore, setShowMore] = useState(false);
    useEffect(() => {
      
    const scriptElements = [];
    
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
        // Skip if already loaded
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        
        // Add error handling
        script.onerror = () => {
            console.error(`Failed to load script: ${src}`);
            reject(new Error(`Script load error for ${src}`));
        };
        
        script.onload = resolve;
        document.body.appendChild(script);
        scriptElements.push(script);
        });
    };

    const scripts = [
        // Load jQuery first
        '/js/jquery.min.js',
        '/js/jquery-migrate-3.0.1.min.js',
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
        // Load scripts sequentially
        for (const src of scripts) {
            await loadScript(src).catch(err => {
            console.warn(`Skipping ${src} due to load error`);
            });
        }
        } catch (error) {
        console.error('Script loading error:', error);
        }
    };

    loadScripts();

    return () => {
        // Cleanup
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
                Leadership Spotlight
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
        <div className="hero-wrap js-fullheight" style={{backgroundImage: "url(/images/bg_1.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="img mb-4" style={{backgroundImage: "url(/images/logo.png)"}}></div>
              <div className="desc">
                <h2 className="subheading">Hello I'm</h2>
                <h1 className="mb-4">InfiniteWaveX</h1>
                <p className="mb-4">
                  We are a technology-driven company specializing in innovative digital solutions that bring ideas to life.
                  Our expertise spans across custom coding, website development, creative design, 3D visualization, Artificial Intelligence (AI),
                  and Machine Learning (ML). With a strong foundation in computer science, we craft scalable and intelligent systems that not only solve problems but also create new opportunities for growth.<br />
                </p>

                <p>
                  <button 
                    className="btn-custom" 
                    onClick={() => setShowMore(!showMore)}
                    style={{ border: "none", background: "transparent", cursor: "pointer" }}
                  >
                    More About Me <span className="ion-ios-arrow-forward"></span>
                  </button>
                </p>

                {showMore && (
                  <p className="mt-3">
                    From building sleek, user-friendly websites to designing immersive 3D experiences and deploying AI-powered solutions, 
                    we bridge creativity with technology. Our mission is to deliver cutting-edge digital experiences that help businesses 
                    stay ahead in an ever-evolving digital world.
                  </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-7 heading-section text-center ftco-animate">
                <h2 className="mb-4">Services Overview</h2>
                <p>From web apps to AI systems, our programmers design and develop solutions tailored to your needs.</p>
              </div>
            </div>
            <div className="row">
            <div className="col-md-4">
              <div className="blog-entry ftco-animate">
                <div className="img img-2">
                  <video 
                    src="/images/ai.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>
                <div className="text text-2 pt-2 mt-3">
                  <span className="category mb-3 d-block"><a href="#">AI Technology</a></span>
                  <h3 className="mb-4"><a href="#">Artificial Intelligence: Powering Innovation and Progress</a></h3>
                  <p className="mb-4">
                   Artificial intelligence is a field of science concerned with building computers and machines 
                   that can reason, learn, and act in such a way that would normally require human intelligence or
                    that involves data whose scale exceeds what humans can analyze.
                  </p>
                </div>
              </div>
            </div>

                 <div className="col-md-4">
              <div className="blog-entry ftco-animate">
                <div className="img img-2">
                  <video 
                    src="/images/2.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>
                <div className="text text-2 pt-2 mt-3">
                  <span className="category mb-3 d-block"><a href="#">3D view</a></span>
                  <h3 className="mb-4"><a href="#">The Newest Technology 3D Visualization</a></h3>
                  <p className="mb-4">
                   This AI-powered demo showcases how advanced artificial intelligence 
                   can create dynamic, realistic visual experiences for modern applications.
                  </p>
                </div>
              </div>
            </div>


             <div className="col-md-4">
              <div className="blog-entry ftco-animate">
                <div className="img img-2">
                  <video 
                    src="/images/1.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>
                <div className="text text-2 pt-2 mt-3">
                  <span className="category mb-3 d-block"><a href="#">Ai Based Fashion System</a></span>
                  <h3 className="mb-4"><a href="#">AI-Enhanced Fashion Creation System</a></h3>
                  <p className="mb-4">
                   AI is rapidly transforming the fashion industry, offering innovative solutions for design, 
                   production, and customer experience. AI-powered systems can analyze trends, personalize recommendations,
                    optimize manufacturing processes, and enhance the overall shopping experience. 
                  </p>
                </div>
              </div>
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

      {/* loader */}
      <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div>
    </div>
  );
};

export default Home;