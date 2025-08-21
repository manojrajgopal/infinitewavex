import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const News = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/newsletter/subscribe`,
        { email: email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.data.message.includes('already subscribed')) {
        // Show warning that email is already subscribed
        alert('This email is already subscribed to our newsletter!');
      } else {
        // Show success message
        alert('Successfully subscribed to our newsletter!');
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Error subscribing to newsletter. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <title>InfiniteWaveX - News</title>
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

      <a href="/" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
      <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
        <h1 id="colorlib-logo">
          <a href="/" onClick={() => window.location.href = '/'}>InfWX<span>.</span></a>
        </h1>

        <Navigation />

        <Copyright />

      </aside>

      <div id="colorlib-main">
        <div className="hero-wrap js-fullheight" style={{backgroundImage: "url(/images/news_bg.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="desc">
                <h2 className="subheading">Latest Updates</h2>
                <h1 className="mb-4">News & Insights</h1>
                <p className="mb-4">
                  Stay updated with the latest news, trends, and insights from InfiniteWaveX. 
                  Discover our recent achievements, industry perspectives, and thought leadership.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="/" className="img img-2" style={{backgroundImage: "url(/images/news_1.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="/">Technology</a></span>
                        <h3 className="mb-4"><a href="/">InfiniteWaveX Launches New AI-Powered Platform</a></h3>
                        <p className="mb-4">
                          We're excited to announce the launch of our new AI-powered platform that revolutionizes 
                          how businesses approach digital transformation. The platform integrates machine learning 
                          algorithms with intuitive user interfaces.
                        </p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="/" className="img" style={{backgroundImage: "url(/images/manoj_r_photo.png)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="/">Manoj R</a>, <span>Oct. 15, 2023</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>42</span>
                              <span><i className="fa fa-eye"></i>250</span>
                              <span><i className="fa fa-comment"></i>18</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="/" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <div className="img img-2" style={{ position: "relative", overflow: "hidden" }}>
                        <video 
                          src="/images/news_2.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 0
                          }}
                        />
                      </div>

                      <div className="text text-2 pt-2 mt-3" style={{ position: "relative", zIndex: 1 }}>
                        <span className="category mb-3 d-block"><a href="/">Innovation</a></span>
                        <h3 className="mb-4"><a href="/">How We're Revolutionizing 3D Visualization</a></h3>
                        <p className="mb-4">
                          Our team has developed groundbreaking techniques in 3D visualization that are setting 
                          new industry standards. Learn how our approach combines artistic vision with technical 
                          expertise to create immersive experiences.
                        </p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="/" className="img" style={{backgroundImage: "url(/images/person_2.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="/">Manoj G</a>, <span>Oct. 10, 2023</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>35</span>
                              <span><i className="fa fa-eye"></i>198</span>
                              <span><i className="fa fa-comment"></i>12</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="/" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="/" className="img img-2" style={{backgroundImage: "url(/images/news_3.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="/">Company News</a></span>
                        <h3 className="mb-4"><a href="/">InfiniteWaveX Expands to New Markets</a></h3>
                        <p className="mb-4">
                          We're proud to announce our expansion into three new international markets. This strategic 
                          move allows us to bring our innovative solutions to a broader audience while creating new 
                          opportunities for collaboration.
                        </p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="/" className="img" style={{backgroundImage: "url(/images/logo.png)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="/">Team InfiniteWaveX</a>, <span>Oct. 5, 2023</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>28</span>
                              <span><i className="fa fa-eye"></i>175</span>
                              <span><i className="fa fa-comment"></i>9</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="/" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="/" className="img img-2" style={{backgroundImage: "url(/images/news_4.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="/">Industry Insights</a></span>
                        <h3 className="mb-4"><a href="/">The Future of AI in Web Development</a></h3>
                        <p className="mb-4">
                          Artificial Intelligence is transforming how we approach web development. In this article, 
                          we explore the emerging trends and how InfiniteWaveX is at the forefront of this revolution.
                        </p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="/" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="/">Manoj R</a>, <span>Oct. 1, 2023</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>51</span>
                              <span><i className="fa fa-eye"></i>312</span>
                              <span><i className="fa fa-comment"></i>24</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="/" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="/" className="img img-2" style={{backgroundImage: "url(/images/news_5.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="/">Case Study</a></span>
                        <h3 className="mb-4"><a href="/">How We Helped a Retail Brand Transform Their Digital Presence</a></h3>
                        <p className="mb-4">
                          Discover how our team helped a major retail brand completely transform their digital 
                          presence, resulting in a 45% increase in online engagement and a 32% boost in sales.
                        </p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="/" className="img" style={{backgroundImage: "url(/images/person_2.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="/">Manoj G</a>, <span>Sept. 25, 2023</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>39</span>
                              <span><i className="fa fa-eye"></i>228</span>
                              <span><i className="fa fa-comment"></i>15</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="/" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="row mt-5">
                  <div className="col">
                    <div className="block-27">
                      <ul>
                        <li><a href="/">&lt;</a></li>
                        <li className="active"><span>1</span></li>
                        {/* <li><a href="/">2</a></li>
                        <li><a href="/">3</a></li>
                        <li><a href="/">4</a></li>
                        <li><a href="/">5</a></li> */}
                        <li><a href="/">&gt;</a></li>
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
                      <input type="text" className="form-control" placeholder="Search news..." />
                    </div>
                  </form>
                </div>

                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Categories</h3>
                  <ul className="categories">
                    <li><a href="/">Technology <span>(12)</span></a></li>
                    <li><a href="/">Innovation <span>(8)</span></a></li>
                    <li><a href="/">Company News <span>(6)</span></a></li>
                    <li><a href="/">Industry Insights <span>(10)</span></a></li>
                    <li><a href="/">Case Studies <span>(7)</span></a></li>
                    <li><a href="/">Events <span>(4)</span></a></li>
                  </ul>
                </div>

                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Popular Articles</h3>
                  <div className="block-21 mb-4 d-flex">
                    <a className="blog-img mr-4" style={{backgroundImage: "url(/images/news_1.jpg)"}}></a>
                    <div className="text">
                      <h3 className="heading"><a href="/">InfiniteWaveX Launches New AI-Powered Platform</a></h3>
                      <div className="meta">
                        <div><a href="/"><span className="icon-calendar"></span> Oct. 15, 2023</a></div>
                        <div><a href="/"><span className="icon-person"></span> Manoj R</a></div>
                        <div><a href="/"><span className="icon-chat"></span> 18</a></div>
                      </div>
                    </div>
                  </div>
                  <div className="block-21 mb-4 d-flex">
                    <a className="blog-img mr-4" style={{backgroundImage: "url(/images/news_4.jpg)"}}></a>
                    <div className="text">
                      <h3 className="heading"><a href="/">The Future of AI in Web Development</a></h3>
                      <div className="meta">
                        <div><a href="/"><span className="icon-calendar"></span> Oct. 1, 2023</a></div>
                        <div><a href="/"><span className="icon-person"></span> Manoj R</a></div>
                        <div><a href="/"><span className="icon-chat"></span> 24</a></div>
                      </div>
                    </div>
                  </div>
                  <div className="block-21 mb-4 d-flex">
                    <a className="blog-img mr-4" style={{backgroundImage: "url(/images/news_2.jpg)"}}></a>
                    <div className="text">
                      <h3 className="heading"><a href="/">How We're Revolutionizing 3D Visualization</a></h3>
                      <div className="meta">
                        <div><a href="/"><span className="icon-calendar"></span> Oct. 10, 2023</a></div>
                        <div><a href="/"><span className="icon-person"></span> Manoj G</a></div>
                        <div><a href="/"><span className="icon-chat"></span> 12</a></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Tag Cloud</h3>
                  <ul className="tagcloud">
                    <a href="/" className="tag-cloud-link">AI</a>
                    <a href="/" className="tag-cloud-link">Technology</a>
                    <a href="/" className="tag-cloud-link">Innovation</a>
                    <a href="/" className="tag-cloud-link">Web Development</a>
                    <a href="/" className="tag-cloud-link">3D Visualization</a>
                    <a href="/" className="tag-cloud-link">Digital Transformation</a>
                    <a href="/" className="tag-cloud-link">Machine Learning</a>
                    <a href="/" className="tag-cloud-link">Case Study</a>
                  </ul>
                </div>

                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Archives</h3>
                  <ul className="categories">
                    <li><a href="/">October 2023 <span>(5)</span></a></li>
                    <li><a href="/">September 2023 <span>(8)</span></a></li>
                    <li><a href="/">August 2023 <span>(6)</span></a></li>
                    <li><a href="/">July 2023 <span>(4)</span></a></li>
                    <li><a href="/">June 2023 <span>(7)</span></a></li>
                    <li><a href="/">May 2023 <span>(5)</span></a></li>
                  </ul>
                </div>

                <div className="sidebar-box subs-wrap img" style={{backgroundImage: "url(/images/bg_1.jpg)"}}>
                  <div className="overlay"></div>
                  <h3 className="mb-4 sidebar-heading">Subscribe to Our Newsletter</h3>
                  <p className="mb-4">Stay updated with our latest business news, services, and updates.</p>
                  {isSubscribed ? (
                    <div className="alert alert-success">
                      <i className="fa fa-check"></i> Thank you for subscribing!
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="subscribe-form">
                      <div className="form-group">
                        <input 
                          type="email" 
                          className="form-control" 
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <button 
                          type="submit" 
                          className="mt-2 btn btn-white submit"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                      </div>
                    </form>
                  )}
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

export default News;