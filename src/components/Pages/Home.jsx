import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Home = () => {
  const [showMore, setShowMore] = useState(false);
  const threeJsContainer = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    if (window.AOS) window.AOS.init();
    if (window.$ && window.$('.owl-carousel').length) {
      window.$('.owl-carousel').owlCarousel();
    }
    // Load Three.js and related scripts dynamically
    const loadThreeJS = () => {
      return new Promise((resolve) => {
        if (window.THREE) return resolve();
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
          // Define THREE for ESLint
          /* global THREE */
          // Load additional Three.js components if needed
          const script2 = document.createElement('script');
          script2.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.min.js';
          document.body.appendChild(script2);
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    // Initialize Three.js scene
    const initThreeJS = async () => {
      await loadThreeJS();
      
      // Only initialize if container exists and Three.js is loaded
      if (!threeJsContainer.current || !window.THREE) return;

      // Reference THREE from window
      const { THREE } = window;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      );
      camera.position.z = 30;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      threeJsContainer.current.appendChild(renderer.domElement);

      // Create particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 1500;

      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
      }

      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x4a9eff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Add glowing center sphere
      const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4a9eff,
        transparent: true,
        opacity: 0.3
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        sphere.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        sphere.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        sphere.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.1;

        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (threeJsContainer.current && renderer.domElement) {
          threeJsContainer.current.removeChild(renderer.domElement);
        }
      };
    };

    initThreeJS();


    // Original script loading logic
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
          await loadScript(src).catch(err => {
            console.warn(`Skipping ${src} due to load error`);
          });
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
      // Cleanup
      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [Location]);

  return (
    <div id="colorlib-page">
      {/* Three.js Container - placed first so it's in the background */}
      <div 
        ref={threeJsContainer} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.7,
          pointerEvents: 'none'
        }}
      />

      <Helmet>
        <title>InfiniteWaveX</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, shrink-to-fit=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

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

        <style type="text/css">{`
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
            .hero-wrap.js-fullheight {
              padding-top: 20px;
            }
            #colorlib-aside {
              padding-top: 20px;
            }
            .img.mb-4 {
              min-height: 80px !important;
            }
            .desc h1 {
              font-size: 2rem;
            }
            .desc p {
              font-size: 1rem;
            }
          }
          
          @media (max-width: 480px) {
            .hero-wrap.js-fullheight {
              padding-top: 10px;
            }
            .desc h1 {
              font-size: 1.8rem;
            }
            .desc h2.subheading {
              font-size: 1.2rem;
            }
          }
          /* Mobile-specific adjustments */
          @media (max-width: 768px) {
            #colorlib-aside {
              padding-top: 20px;
              height: auto;
            }
            
            #colorlib-main {
              padding-top: 20px;
            }
            
            .hero-wrap.js-fullheight {
              min-height: calc(100vh - 40px);
            }
            
            .img.mb-4 {
              background-size: contain !important;
              min-height: 80px !important;
              margin-top: 10px;
            }
            
            .desc h1 {
              font-size: 2rem;
              margin-top: 10px;
            }
            
            .desc h2.subheading {
              font-size: 1.2rem;
            }
            
            .desc p {
              font-size: 1rem;
              padding: 0 10px;
            }
          }

          @media (max-width: 480px) {
            #colorlib-aside {
              padding-top: 10px;
            }
            
            .hero-wrap.js-fullheight {
              min-height: calc(100vh - 20px);
            }
            
            .desc h1 {
              font-size: 1.8rem;
            }
            
            .desc h2.subheading {
              font-size: 1rem;
            }
            
            .blog-entry {
              margin-bottom: 30px;
            }
          }
        `}</style>

      </Helmet>

      <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
      <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
        <h1 id="colorlib-logo">
          <a href="#" onClick={() => window.location.href = '/'}>InfWX<span>.</span></a>
        </h1>

        <nav id="colorlib-main-menu" role="navigation">
          <ul>

            <li>
              <NavLink 
              onClick={() => window.location.href = '/photography'}
                to="/photography" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Leadership Spotlight
              </NavLink>
            </li>
            <li>
              <NavLink 
              onClick={() => window.location.href = '/projects'}
                to="/projects" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink 
              onClick={() => window.location.href = '/fashion'}
                to="/fashion" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Fashion
              </NavLink>
            </li>
            <li>
              <NavLink 
              onClick={() => window.location.href = '/about'}
                to="/about" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
              onClick={() => window.location.href = '/contact'}
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
            Copyright &copy; {new Date().getFullYear()} All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://manojrajgopal.github.io/portfolio/" target="_blank">InfiniteWaveX</a>
          </p>
          <ul>
            <li><a href="#"><i className="icon-facebook"></i></a></li>
            <li><a href="#"><i className="icon-twitter"></i></a></li>
            <li><a href="#"><i className="icon-instagram"></i></a></li>
            <li><a href="#"><i className="icon-linkedin"></i></a></li>
          </ul>
        </div>
      </aside>

      <div id="colorlib-main" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-wrap js-fullheight" style={{ background: 'none' }} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center"style={{
              padding: "20px",  // Add mobile padding
              fontSize: "clamp(14px, 2.5vw, 16px)",
              marginTop: window.innerWidth <= 768 ? "20px" : "0"
            }}>
              <div className="img mb-4" style={{
                backgroundImage: "url(/images/logo.png)",
                backgroundSize: "contain",  // Add this
                minHeight: "100px"  // Add minimum height
              }}></div>
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
                  Copyright &copy; {new Date().getFullYear()} All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://manojrajgopal.github.io/portfolio/" target="_blank">InfiniteWaveX</a>
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