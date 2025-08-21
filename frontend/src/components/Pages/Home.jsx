import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer'
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';

const Home = () => {
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  
  useEffect(() => {
    if (window.AOS) window.AOS.init();
    if (window.$ && window.$('.owl-carousel').length) {
      window.$('.owl-carousel').owlCarousel();
    }


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
  }, [location]);

  return (
    <div id="colorlib-page">
      {/* Three.js Container - placed first so it's in the background */}
      
      <ThreeJSParticles />

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

        <Navigation />

        <Copyright />


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

              <div className="col-md-4">
                <div className="blog-entry ftco-animate">
                  <div className="img img-2">
                    <video 
                      src="/images/music.mp4" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="text text-2 pt-2 mt-3">
                    <span className="category mb-3 d-block"><a href="#">Singing</a></span>
                    <h3 className="mb-4"><a href="#">Expressive Singing & Voice Artistry</a></h3>
                    <p className="mb-4">
                      Singing is a timeless art that blends melody, rhythm, and emotion to create powerful 
                      connections with audiences. Through practice and creativity, singers develop unique 
                      styles that showcase their vocal range and storytelling ability. From classical to 
                      contemporary, singing continues to inspire, heal, and entertain across cultures worldwide.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="blog-entry ftco-animate">
                  <div className="img img-2">
                    <video 
                      src="/images/4.mp4" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="text text-2 pt-2 mt-3">
                    <span className="category mb-3 d-block"><a href="#">Exterior Design</a></span>
                    <h3 className="mb-4"><a href="#">Innovative Exterior Design Solutions</a></h3>
                    <p className="mb-4">
                      Exterior design transforms outdoor spaces into visually stunning and functional environments. 
                      From architectural facades to landscaping, materials, and lighting, every element is carefully 
                      planned to enhance aesthetics, durability, and harmony with surroundings. Innovative exterior 
                      design blends creativity with practicality to create spaces that impress and inspire.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="blog-entry ftco-animate">
                  <div className="img img-2">
                    <video 
                      src="/images/5.mp4" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="text text-2 pt-2 mt-3">
                    <span className="category mb-3 d-block"><a href="#">Web & App Development</a></span>
                    <h3 className="mb-4"><a href="#">Custom Web and Mobile Applications</a></h3>
                    <p className="mb-4">
                      Our team designs and develops web and mobile applications tailored to your business needs. 
                      From responsive websites to feature-rich mobile apps, we combine usability, scalability, 
                      and aesthetics to deliver digital solutions that engage users and drive growth. 
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />

      </div>

      {/* loader */}
      <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div>
    </div>
  );
};

export default Home;