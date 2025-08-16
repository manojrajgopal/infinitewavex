import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink } from 'react-router-dom';

const Projects = () => {
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
        <link rel="stylesheet" href="%PUBLIC_URL%/css/open-iconic-bootstrap.min.css" />
        <link rel="stylesheet" href="%PUBLIC_URL%/css/ionicons.min.css" />
        <link rel="stylesheet" href="%PUBLIC_URL%/css/flaticon.css" />
        <link rel="stylesheet" href="%PUBLIC_URL%/css/icomoon.css" />

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
        <section className="home-slider js-fullheight owl-carousel">
          <div className="slider-item js-fullheight" style={{backgroundImage: "url(/images/bg_11.jpg)"}}>
            <div className="overlay"></div>
            <div className="container-fluid">
              <div className="row no-gutters slider-text slider-text-2 js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
                <div className="col-md-10 text-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
                  <h1 className="mb-4" style={{color: "#f0f0f0ff", textShadow: "2px 2px 4px rgba(0,0,0,0.5)"}} data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Smart Coding</h1>
                  <p style={{color: "#f0f0f0ff", textShadow: "1px 1px 2px rgba(0,0,0,0.5)"}} data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Expert programmers turning complex problems into simple, smart digital solutions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="slider-item js-fullheight" style={{backgroundImage: "url(/images/bg_12.jpg)"}}>
            <div className="overlay"></div>
            <div className="container-fluid">
              <div className="row no-gutters slider-text slider-text-2 js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
                <div className="col-md-10 text-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
                  <h1 className="mb-4" style={{color: "#f0f0f0ff", textShadow: "2px 2px 4px rgba(0,0,0,0.5)"}} data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Problem Solvers</h1>
                  <p style={{color: "#f0f0f0ff", textShadow: "1px 1px 2px rgba(0,0,0,0.5)"}} data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Our programmers craft clean, efficient, and scalable solutions to bring your ideas to life.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ftco-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img" style={{backgroundImage: "url(/images/project_1.png)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technologies: <strong>HTML, SCSS, CSS, JavaScript</strong></a></span>
                        <h3 className="mb-4"><a href="#">Responsive Website Restaurant</a></h3>
                        <p className="mb-4">Nice design of a responsive restaurant website 🥗 . It contains a header, home, about, services, menu, app and contact. It also has a fully developed light/dark mode 🌓 first for mobile then for desktop.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/manoj_r_photo.png)"}}></a>
                          <div className="ml-3 info">
                            <span>Developed by</span>
                            <h3><a href="#">Manoj R</a>, <span>Nov 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap d-md-flex align-items-center">
                          <div className="half order-md-last text-md-right">
                            <p className="meta">
                              <span><i className="icon-heart"></i>3</span>
                              <span><i className="icon-eye"></i>100</span>
                              <span><i className="icon-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/tasty-food/" className="btn btn-primary p-3 px-xl-4 py-xl-3">GitHub</a></p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/ai-powered-personal-stylist-and-outfit-recommendation" className="btn btn-primary p-3 px-xl-4 py-xl-3">Download</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img" style={{backgroundImage: "url(/images/project_2.png)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technologies: <strong>Flask, ML, DeepFace, PyTorch, OpenCV, HTML, SCSS, CSS, JavaScript</strong></a></span>
                        <h3 className="mb-4"><a href="#">AI-Powered Personal Stylish and Outfit Recommendation</a></h3>
                        <p className="mb-4">An AI-driven fashion assistant that creates personalized outfit suggestions based on user profile, wardrobe, and preferences. It supports virtual try-on, weather and occasion-based recommendations, and skin-tone-aware styling. With ML-powered outfit recognition and trend analysis, it offers a smart, interactive fashion experience tailored uniquely for every user.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/manoj_r_photo.png)"}}></a>
                          <div className="ml-3 info">
                            <span>Developed by</span>
                            <h3><a href="#">Manoj R</a>, <span>May 3, 2024</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap d-md-flex align-items-center">
                          <div className="half order-md-last text-md-right">
                            <p className="meta">
                              <span><i className="icon-heart"></i>3</span>
                              <span><i className="icon-eye"></i>100</span>
                              <span><i className="icon-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/ai-powered-personal-stylist-and-outfit-recommendation" className="btn btn-primary p-3 px-xl-4 py-xl-3">GitHUb</a></p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/ai-powered-personal-stylist-and-outfit-recommendation" className="btn btn-primary p-3 px-xl-4 py-xl-3">Download</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img" style={{backgroundImage: "url(/images/project_2.png)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technologies: <strong>Flask, ML, DeepFace, PyTorch, OpenCV, HTML, SCSS, CSS, JavaScript</strong></a></span>
                        <h3 className="mb-4"><a href="#">AI-Powered Personal Stylish and Outfit Recommendation</a></h3>
                        <p className="mb-4">An AI-driven fashion assistant that creates personalized outfit suggestions based on user profile, wardrobe, and preferences. It supports virtual try-on, weather and occasion-based recommendations, and skin-tone-aware styling. With ML-powered outfit recognition and trend analysis, it offers a smart, interactive fashion experience tailored uniquely for every user.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/manoj_r_photo.png)"}}></a>
                          <div className="ml-3 info">
                            <span>Developed by</span>
                            <h3><a href="#">Manoj R</a>, <span>May 3, 2024</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap d-md-flex align-items-center">
                          <div className="half order-md-last text-md-right">
                            <p className="meta">
                              <span><i className="icon-heart"></i>3</span>
                              <span><i className="icon-eye"></i>100</span>
                              <span><i className="icon-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/ai-powered-personal-stylist-and-outfit-recommendation" className="btn btn-primary p-3 px-xl-4 py-xl-3">GitHUb</a></p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/ai-powered-personal-stylist-and-outfit-recommendation" className="btn btn-primary p-3 px-xl-4 py-xl-3">Download</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img" style={{backgroundImage: "url(/images/project_2.png)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technologies: <strong>Flask, ML, DeepFace, PyTorch, OpenCV, HTML, SCSS, CSS, JavaScript</strong></a></span>
                        <h3 className="mb-4"><a href="#">AI-Powered Personal Stylish and Outfit Recommendation</a></h3>
                        <p className="mb-4">An AI-driven fashion assistant that creates personalized outfit suggestions based on user profile, wardrobe, and preferences. It supports virtual try-on, weather and occasion-based recommendations, and skin-tone-aware styling. With ML-powered outfit recognition and trend analysis, it offers a smart, interactive fashion experience tailored uniquely for every user.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/manoj_r_photo.png)"}}></a>
                          <div className="ml-3 info">
                            <span>Developed by</span>
                            <h3><a href="#">Manoj R</a>, <span>May 3, 2024</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap d-md-flex align-items-center">
                          <div className="half order-md-last text-md-right">
                            <p className="meta">
                              <span><i className="icon-heart"></i>3</span>
                              <span><i className="icon-eye"></i>100</span>
                              <span><i className="icon-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/ai-powered-personal-stylist-and-outfit-recommendation" className="btn btn-primary p-3 px-xl-4 py-xl-3">GitHUb</a></p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/ai-powered-personal-stylist-and-outfit-recommendation" className="btn btn-primary p-3 px-xl-4 py-xl-3">Download</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img" style={{backgroundImage: "url(/images/project_2.png)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technologies: <strong>Flask, ML, DeepFace, PyTorch, OpenCV, HTML, SCSS, CSS, JavaScript</strong></a></span>
                        <h3 className="mb-4"><a href="#">AI-Powered Personal Stylish and Outfit Recommendation</a></h3>
                        <p className="mb-4">An AI-driven fashion assistant that creates personalized outfit suggestions based on user profile, wardrobe, and preferences. It supports virtual try-on, weather and occasion-based recommendations, and skin-tone-aware styling. With ML-powered outfit recognition and trend analysis, it offers a smart, interactive fashion experience tailored uniquely for every user.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/manoj_r_photo.png)"}}></a>
                          <div className="ml-3 info">
                            <span>Developed by</span>
                            <h3><a href="#">Manoj R</a>, <span>May 3, 2024</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap d-md-flex align-items-center">
                          <div className="half order-md-last text-md-right">
                            <p className="meta">
                              <span><i className="icon-heart"></i>3</span>
                              <span><i className="icon-eye"></i>100</span>
                              <span><i className="icon-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/ai-powered-personal-stylist-and-outfit-recommendation" className="btn btn-primary p-3 px-xl-4 py-xl-3">GitHUb</a></p>
                          </div>
                          <div className="half">
                            <p><a href="https://github.com/manojrajgopal/ai-powered-personal-stylist-and-outfit-recommendation" className="btn btn-primary p-3 px-xl-4 py-xl-3">Download</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="row mt-5">
                  <div className="col">
                    <div className="block-27">
                      <ul>
                        <li><a href="#">&lt;</a></li>
                        <li className="active"><span>1</span></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#">&gt;</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 sidebar ftco-animate">
                <div className="sidebar-box">
                  <form action="#" className="search-form">
                    <div className="form-group">
                      <span className="icon icon-search"></span>
                      <input type="text" className="form-control" placeholder="Type a keyword and hit enter" />
                    </div>
                  </form>
                </div>
                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Categories</h3>
                    <ul className="categories">
                      <li><a href="#">AI & ML <span>(6)</span></a></li>
                      <li><a href="#">Frontend <span>(8)</span></a></li>
                      <li><a href="#">Backend <span>(5)</span></a></li>
                      <li><a href="#">Fullstack <span>(4)</span></a></li>
                      <li><a href="#">Cloud & DevOps <span>(3)</span></a></li>
                      <li><a href="#">Data Science <span>(6)</span></a></li>
                      <li><a href="#">Cybersecurity <span>(2)</span></a></li>
                      <li><a href="#">UI / UX <span>(4)</span></a></li>
                      <li><a href="#">3D Websites <span>(3)</span></a></li>
                      <li><a href="#">Interior Design <span>(4)</span></a></li>
                      <li><a href="#">Exterior Design <span>(2)</span></a></li>
                      <li><a href="#">Graphic Design <span>(5)</span></a></li>
                      <li><a href="#">Photography <span>(7)</span></a></li>
                      <li><a href="#">Music <span>(6)</span></a></li>
                      <li><a href="#">Singing <span>(3)</span></a></li>
                      <li><a href="#">Video Editing <span>(4)</span></a></li>
                      <li><a href="#">Animation <span>(2)</span></a></li>
                      <li><a href="#">Travel <span>(2)</span></a></li>
                      <li><a href="#">Food & Lifestyle <span>(3)</span></a></li>
                      <li><a href="#">Fitness & Sports <span>(2)</span></a></li>
                    </ul>
                </div>

                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Popular Projects</h3>

                  {/* Personal Chatbot */}
                  <div className="block-21 mb-4 d-flex">
                    <a
                      className="blog-img mr-4"
                      style={{
                        backgroundImage: "url(/images/chatbot.png)",
                        borderRadius: "10px"
                      }}
                    ></a>
                    <div className="text">
                      <h3 className="heading"><a href="#">Personal Chatbot</a></h3>
                      <div className="meta">
                        <div><a href="#"><span className="icon-calendar"></span> Aug. 15, 2025</a></div>
                        <div><a href="#"><span className="icon-person"></span> By You</a></div>
                        <div><a href="#"><span className="icon-chat"></span> 12</a></div>
                      </div>
                    </div>
                  </div>

                  {/* AI-Powered Personal Stylish & Outfit Recommender */}
                  <div className="block-21 mb-4 d-flex">
                    <a
                      className="blog-img mr-4"
                      style={{
                        backgroundImage: "url(/images/fashion.png)",
                        borderRadius: "10px"
                      }}
                    ></a>
                    <div className="text">
                      <h3 className="heading"><a href="#">AI-Powered Personal Stylish & Outfit Recommender</a></h3>
                      <div className="meta">
                        <div><a href="#"><span className="icon-calendar"></span> Aug. 10, 2025</a></div>
                        <div><a href="#"><span className="icon-person"></span> By You</a></div>
                        <div><a href="#"><span className="icon-chat"></span> 25</a></div>
                      </div>
                    </div>
                  </div>


                  {/* Coffee Shop */}
                  <div className="block-21 mb-4 d-flex">
                    <a
                      className="blog-img mr-4"
                      style={{
                        backgroundImage: "url(/images/coffee.png)",
                        borderRadius: "10px"
                      }}
                    ></a>
                    <div className="text">
                      <h3 className="heading"><a href="#">Coffee Shop</a></h3>
                      <div className="meta">
                        <div><a href="#"><span className="icon-calendar"></span> Jul. 28, 2025</a></div>
                        <div><a href="#"><span className="icon-person"></span> By You</a></div>
                        <div><a href="#"><span className="icon-chat"></span> 8</a></div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Tag Cloud</h3>
                  <ul className="tagcloud">
                    
                    {/* 🚀 Core Expertise */}
                    <h5 className="tag-category-heading">Our Expertise</h5>
                    <a href="#" className="tag-cloud-link">Web Development</a>
                    <a href="#" className="tag-cloud-link">Custom Coding</a>
                    <a href="#" className="tag-cloud-link">Creative Design</a>
                    <a href="#" className="tag-cloud-link">3D Visualization</a>
                    <a href="#" className="tag-cloud-link">Artificial Intelligence</a>
                    <a href="#" className="tag-cloud-link">Machine Learning</a>
                    <a href="#" className="tag-cloud-link">Digital Solutions</a>
                    <a href="#" className="tag-cloud-link">UI/UX Design</a>
                    <a href="#" className="tag-cloud-link">Scalable Systems</a>
                    <a href="#" className="tag-cloud-link">Innovation</a>
                    
                    {/* 💻 Technology Stack */}
                    <h5 className="tag-category-heading">Technology Stack</h5>
                    <a href="#" className="tag-cloud-link">Python</a>
                    <a href="#" className="tag-cloud-link">JavaScript</a>
                    <a href="#" className="tag-cloud-link">React</a>
                    <a href="#" className="tag-cloud-link">Node.js</a>
                    <a href="#" className="tag-cloud-link">Next.js</a>
                    <a href="#" className="tag-cloud-link">TensorFlow</a>
                    <a href="#" className="tag-cloud-link">PyTorch</a>
                    <a href="#" className="tag-cloud-link">Django</a>
                    <a href="#" className="tag-cloud-link">Flask</a>
                    <a href="#" className="tag-cloud-link">Cloud Computing</a>
                    <a href="#" className="tag-cloud-link">AWS</a>
                    <a href="#" className="tag-cloud-link">Azure</a>
                    <a href="#" className="tag-cloud-link">Docker</a>
                    <a href="#" className="tag-cloud-link">Kubernetes</a>
                    <a href="#" className="tag-cloud-link">Blockchain</a>
                    
                    {/* 🎨 Creative & Design */}
                    <h5 className="tag-category-heading">Creative & Design</h5>
                    <a href="#" className="tag-cloud-link">Graphic Design</a>
                    <a href="#" className="tag-cloud-link">3D Modeling</a>
                    <a href="#" className="tag-cloud-link">Animation</a>
                    <a href="#" className="tag-cloud-link">Augmented Reality</a>
                    <a href="#" className="tag-cloud-link">Virtual Reality</a>
                    <a href="#" className="tag-cloud-link">Photography</a>
                    <a href="#" className="tag-cloud-link">Motion Graphics</a>
                    <a href="#" className="tag-cloud-link">Branding</a>
                    
                    {/* 🤖 AI/ML Specializations */}
                    <h5 className="tag-category-heading">AI/ML Specializations</h5>
                    <a href="#" className="tag-cloud-link">Deep Learning</a>
                    <a href="#" className="tag-cloud-link">Computer Vision</a>
                    <a href="#" className="tag-cloud-link">NLP</a>
                    <a href="#" className="tag-cloud-link">Neural Networks</a>
                    <a href="#" className="tag-cloud-link">Data Science</a>
                    <a href="#" className="tag-cloud-link">Predictive Analytics</a>
                    <a href="#" className="tag-cloud-link">Chatbots</a>
                    <a href="#" className="tag-cloud-link">Generative AI</a>
                    
                    {/* 🌐 Digital Transformation */}
                    <h5 className="tag-category-heading">Digital Transformation</h5>
                    <a href="#" className="tag-cloud-link">Smart Solutions</a>
                    <a href="#" className="tag-cloud-link">Automation</a>
                    <a href="#" className="tag-cloud-link">IoT</a>
                    <a href="#" className="tag-cloud-link">Big Data</a>
                    <a href="#" className="tag-cloud-link">Business Intelligence</a>
                    <a href="#" className="tag-cloud-link">Digital Strategy</a>
                    
                    {/* 🎵 Creative Interests */}
                    <h5 className="tag-category-heading">Creative Interests</h5>
                    <a href="#" className="tag-cloud-link">Music</a>
                    <a href="#" className="tag-cloud-link">Art</a>
                    <a href="#" className="tag-cloud-link">Photography</a>
                    <a href="#" className="tag-cloud-link">Film</a>
                    <a href="#" className="tag-cloud-link">Design</a>
                    <a href="#" className="tag-cloud-link">Innovation</a>
                    
                    {/* 🏢 Business & Growth */}
                    <h5 className="tag-category-heading">Business & Growth</h5>
                    <a href="#" className="tag-cloud-link">Entrepreneurship</a>
                    <a href="#" className="tag-cloud-link">Startups</a>
                    <a href="#" className="tag-cloud-link">Digital Marketing</a>
                    <a href="#" className="tag-cloud-link">E-commerce</a>
                    <a href="#" className="tag-cloud-link">Tech Innovation</a>
                  </ul>
                </div>


                <div className="sidebar-box subs-wrap img" style={{backgroundImage: "url(/images/bg_1.jpg)"}}>
                  <div className="overlay"></div>
                  <h3 className="mb-4 sidebar-heading">Subscribe to Our Newsletter</h3>
                  <p className="mb-4">Stay updated with our latest business news, services, and updates.</p>
                  <form action="#" className="subscribe-form">
                    <div className="form-group">
                      <input type="email" className="form-control" placeholder="Enter your email" />
                      <input type="submit" value="Subscribe" className="mt-2 btn btn-white submit" />
                    </div>
                  </form>
                </div>

                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Archives</h3>
                  <ul className="categories">
                    <li><a href="#">October 2018 <span>(10)</span></a></li>
                    <li><a href="#">September 2018 <span>(6)</span></a></li>
                    <li><a href="#">August 2018 <span>(8)</span></a></li>
                    <li><a href="#">July 2018 <span>(2)</span></a></li>
                    <li><a href="#">June 2018 <span>(7)</span></a></li>
                    <li><a href="#">May 2018 <span>(5)</span></a></li>
                  </ul>
                </div>

                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">About Us</h3>
                  <p>
                    We believe that great design is more than just appearance—it’s about creating 
                    spaces that reflect personality, inspire creativity, and bring comfort to 
                    everyday living. Our team combines modern trends with timeless aesthetics to 
                    craft interiors that truly feel like home.
                  </p>
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

      <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div>
    </div>
  );
};

export default Projects;