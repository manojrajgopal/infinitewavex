import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink } from 'react-router-dom';

const Travel = () => {
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
            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
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
          <div className="slider-item js-fullheight" style={{backgroundImage: "url(/images/bg_2.jpg)"}}>
            <div className="overlay"></div>
            <div className="container-fluid">
              <div className="row no-gutters slider-text slider-text-2 js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
                <div className="col-md-10 text-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
                  <h1 className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Discover the Place</h1>
                  <p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Find great places to stay, eat, shop, or visit from local experts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="slider-item js-fullheight" style={{backgroundImage: "url(/images/bg_3.jpg)"}}>
            <div className="overlay"></div>
            <div className="container-fluid">
              <div className="row no-gutters slider-text slider-text-2 js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
                <div className="col-md-10 text-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
                  <h1 className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Explore and travel</h1>
                  <p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Find great places to stay, eat, shop, or visit from local experts</p>
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
                      <a href="#" className="img" style={{backgroundImage: "url(/images/image_1.jpg)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technology</a></span>
                        <h3 className="mb-4"><a href="#">The Newest Technology On This Year 2019</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov 28, 2018</span></h3>
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
                            <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Continue Reading</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img" style={{backgroundImage: "url(/images/image_2.jpg)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technology</a></span>
                        <h3 className="mb-4"><a href="#">The Newest Technology On This Year 2019</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov 28, 2018</span></h3>
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
                            <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Continue Reading</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img" style={{backgroundImage: "url(/images/image_3.jpg)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technology</a></span>
                        <h3 className="mb-4"><a href="#">The Newest Technology On This Year 2019</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov 28, 2018</span></h3>
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
                            <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Continue Reading</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img" style={{backgroundImage: "url(/images/image_4.jpg)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technology</a></span>
                        <h3 className="mb-4"><a href="#">The Newest Technology On This Year 2019</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov 28, 2018</span></h3>
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
                            <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Continue Reading</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="blog-entry ftco-animate">
                      <a href="#" className="img" style={{backgroundImage: "url(/images/image_5.jpg)"}}></a>
                      <div className="text pt-2 mt-3">
                        <span className="category mb-1 d-block"><a href="#">Technology</a></span>
                        <h3 className="mb-4"><a href="#">The Newest Technology On This Year 2019</a></h3>
                        <p className="mb-4">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                        <div className="author mb-4 d-flex align-items-center">
                          <a href="#" className="img" style={{backgroundImage: "url(/images/person_1.jpg)"}}></a>
                          <div className="ml-3 info">
                            <span>Written by</span>
                            <h3><a href="#">Dave Lewis</a>, <span>Nov 28, 2018</span></h3>
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
                            <p><a href="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Continue Reading</a></p>
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
                      <li><span className="icon icon-map-marker"></span><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                      <li><a href="#"><span className="icon icon-phone"></span><span className="text">+2 392 3929 210</span></a></li>
                      <li><a href="#"><span className="icon icon-envelope"></span><span className="text">info@yourdomain.com</span></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p>
                  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
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

export default Travel;