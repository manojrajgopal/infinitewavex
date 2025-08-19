import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer'
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';

const LeadershipSpotlight = () => {
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
  }, [Location]);

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
        <div className="hero-wrap js-fullheight" style={{backgroundImage: "url(/images/contact_bg_2.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="img mb-4" style={{backgroundImage: "url(/images/logo.png)"}}></div>
              <div className="desc">
                <h2 className="subheading">Hello I'm</h2>
                <h1 className="mb-4">InfiniteWaveX</h1>
                <p className="mb-4">
                  At InfiniteWaveX, leadership is more than decision-making—it’s about inspiring people,
                  building trust, and shaping a future driven by innovation. Our leaders bring together years
                  of expertise across diverse industries, blending strategic vision with a deep commitment to
                  collaboration and growth.
                </p>

                <p className="mb-4">
                  With a forward-looking mindset, the InfiniteWaveX leadership team focuses on empowering
                  individuals, nurturing creativity, and driving transformative solutions that make a real
                  difference. Each leader embodies the core values of integrity, innovation, and impact—
                  ensuring that every step we take moves us closer to creating sustainable opportunities for
                  our clients, our people, and the communities we serve.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <section className="ftco-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_1.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Technology</a></span>
                        <h3 className="mb-4"><a href="#">The Newest Technology On This Year 2019</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_2.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_2.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Travel</a></span>
                        <h3 className="mb-4"><a href="#">What to pack when visiting Sea</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_3.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Fashion</a></span>
                        <h3 className="mb-4"><a href="#">Awesome Fashion Trend in For Summer</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_3.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_4.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Travel</a></span>
                        <h3 className="mb-4"><a href="#">10 Most Awesome Place</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_5.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Travel</a></span>
                        <h3 className="mb-4"><a href="#">10 Most Awesome Beach in Asia</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_2.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_6.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Travel</a></span>
                        <h3 className="mb-4"><a href="#">Top Amazing Places to Go in Summer</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_3.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_7.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Fashion</a></span>
                        <h3 className="mb-4"><a href="#">7 Beginner Photographer's Mistakes</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_8.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Photography</a>, <a href="#">Travel</a></span>
                        <h3 className="mb-4"><a href="#">Excited to Visit in Palawan Philippines</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_2.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_9.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Technology</a></span>
                        <h3 className="mb-4"><a href="#">How to Make a Paper Boat in Scratch</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_3.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_10.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Fashion</a></span>
                        <h3 className="mb-4"><a href="#">10 Best Way to Styling Your Lifestyle</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_11.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Fashion</a></span>
                        <h3 className="mb-4"><a href="#">10 Tips to Become a Fashion Pro</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_2.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img img-2" style={{backgroundImage: "url(/images/image_12.jpg)"}}></a>
                      <div className="text text-2 pt-2 mt-3">
                        <span className="category mb-3 d-block"><a href="#">Photography</a></span>
                        <h3 className="mb-4"><a href="#">Visit the Most Amazing Place in North America</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_3.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov. 28, 2018</span></h3>
                          </div>
                        </div>
                        <div className="meta-wrap align-items-center">
                          <div className="half order-md-last">
                            <p className="meta">
                              <span><i className="fa fa-heart"></i>3</span>
                              <span><i className="fa fa-eye"></i>100</span>
                              <span><i className="fa fa-comment"></i>5</span>
                            </p>
                          </div>
                          <div className="half">
                            <p><a href="#" className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></a></p>
                          </div>
                        </div>
                      </div>
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
                    <li><a href="#">Fashion <span>(6)</span></a></li>
                    <li><a href="#">Technology <span>(8)</span></a></li>
                    <li><a href="#">Travel <span>(2)</span></a></li>
                    <li><a href="#">Food <span>(2)</span></a></li>
                    <li><a href="#">Photography <span>(7)</span></a></li>
                  </ul>
                </div>

                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Popular Articles</h3>
                  <div className="block-21 mb-4 d-flex">
                    <a className="blog-img mr-4" style={{backgroundImage: "url(/images/image_1.jpg)"}}></a>
                    <div className="text">
                      <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                      <div className="meta">
                        <div><a href="#"><span className="icon-calendar"></span> Oct. 04, 2018</a></div>
                        <div><a href="#"><span className="icon-person"></span> Dave Lewis</a></div>
                        <div><a href="#"><span className="icon-chat"></span> 19</a></div>
                      </div>
                    </div>
                  </div>
                  <div className="block-21 mb-4 d-flex">
                    <a className="blog-img mr-4" style={{backgroundImage: "url(/images/image_2.jpg)"}}></a>
                    <div className="text">
                      <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                      <div className="meta">
                        <div><a href="#"><span className="icon-calendar"></span> Oct. 04, 2018</a></div>
                        <div><a href="#"><span className="icon-person"></span> Dave Lewis</a></div>
                        <div><a href="#"><span className="icon-chat"></span> 19</a></div>
                      </div>
                    </div>
                  </div>
                  <div className="block-21 mb-4 d-flex">
                    <a className="blog-img mr-4" style={{backgroundImage: "url(/images/image_3.jpg)"}}></a>
                    <div className="text">
                      <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                      <div className="meta">
                        <div><a href="#"><span className="icon-calendar"></span> Oct. 04, 2018</a></div>
                        <div><a href="#"><span className="icon-person"></span> Dave Lewis</a></div>
                        <div><a href="#"><span className="icon-chat"></span> 19</a></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-box ftco-animate">
                  <h3 className="sidebar-heading">Tag Cloud</h3>
                  <ul className="tagcloud">
                    <a href="#" className="tag-cloud-link">animals</a>
                    <a href="#" className="tag-cloud-link">human</a>
                    <a href="#" className="tag-cloud-link">people</a>
                    <a href="#" className="tag-cloud-link">cat</a>
                    <a href="#" className="tag-cloud-link">dog</a>
                    <a href="#" className="tag-cloud-link">nature</a>
                    <a href="#" className="tag-cloud-link">leaves</a>
                    <a href="#" className="tag-cloud-link">food</a>
                  </ul>
                </div>

                <div className="sidebar-box subs-wrap img" style={{backgroundImage: "url(/images/bg_1.jpg)"}}>
                  <div className="overlay"></div>
                  <h3 className="mb-4 sidebar-heading">Newsletter</h3>
                  <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia</p>
                  <form action="#" className="subscribe-form">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Email Address" />
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
                  <h3 className="sidebar-heading">Paragraph</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut.</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <Footer /> */}

      </div>

      <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div>
    </div>
  );
};

export default LeadershipSpotlight;