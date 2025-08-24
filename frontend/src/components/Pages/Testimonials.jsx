import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const StarRating = ({ rating, onRatingChange, editable = false }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star}
          className={`star ${star <= (hoverRating || rating) ? "text-warning" : "text-muted"} ${editable ? "editable" : ""}`}
          onClick={() => editable && onRatingChange(star)}
          onMouseEnter={() => editable && setHoverRating(star)}
          onMouseLeave={() => editable && setHoverRating(0)}
          style={{ cursor: editable ? 'pointer' : 'default', fontSize: '24px' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    total_reviews: 0,
    average_rating: 0,
    rating_distribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedRating, setSelectedRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    description: ''
  });
  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reviews`, {
        params: {
          rating: filterRating || undefined,
          search: searchTerm || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        }
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchReviewStats = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reviews/stats`);
      setReviewStats(response.data);
    } catch (error) {
      console.error('Error fetching review stats:', error);
    }
  };

  const submitReview = async () => {
    try {
      if (selectedRating === 0) {
        alert('Please select a rating');
        return;
      }
      
      const reviewData = {
        ...formData,
        rating: selectedRating
      };
      
      await axios.post(`${BACKEND_URL}/api/reviews`, reviewData);
      setShowReviewForm(false);
      setSelectedRating(0);
      setFormData({
        name: '',
        email: '',
        title: '',
        description: ''
      });
      fetchReviews();
      fetchReviewStats();
      alert('Review submitted successfully! It will be visible after approval.');
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data.detail);
      } else {
        alert('Error submitting review. Please try again.');
      }
    }
  };

  const markHelpful = async (reviewId) => {
    try {
      await axios.patch(`${BACKEND_URL}/api/reviews/${reviewId}/helpful`);
      fetchReviews(); // Refresh to update helpful count
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  const reportReview = async (reviewId) => {
    try {
      await axios.patch(`${BACKEND_URL}/api/reviews/${reviewId}/report`);
      alert('Review reported. Our team will review it.');
    } catch (error) {
      console.error('Error reporting review:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
    loadScripts();

    fetchReviews();
    fetchReviewStats();
    
    return () => {
      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [location, filterRating, searchTerm, sortBy, sortOrder]);

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

            {/* Ratings Summary */}
            <div className="row justify-content-center mb-5">
              <div className="col-md-8 text-center">
                <div className="rating-summary p-4 bg-light rounded">
                  <h3 className="mb-3">Customer Reviews</h3>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="average-rating">
                        <h1 className="display-4 text-primary">{reviewStats.average_rating}</h1>
                        <div className="stars mb-2">
                          <StarRating rating={Math.round(reviewStats.average_rating)} />
                        </div>
                        <p>Based on {reviewStats.total_reviews} reviews</p>
                      </div>
                    </div>
                    <div className="col-md-8">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="rating-bar d-flex align-items-center mb-2">
                          <span className="mr-2">{star} star</span>
                          <div className="progress flex-grow-1 mr-2">
                            <div 
                              className="progress-bar" 
                              style={{width: `${(reviewStats.rating_distribution[star] / Math.max(1, reviewStats.total_reviews)) * 100}%`}}
                            ></div>
                          </div>
                          <span>{reviewStats.rating_distribution[star]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            </div>

            {/* Review Form Modal */}
            {showReviewForm && (
              <div className="modal show d-block" tabIndex="-1" role="dialog" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Write a Review</h5>
                      <button type="button" className="close" onClick={() => setShowReviewForm(false)}>
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        submitReview();
                      }}>
                        <div className="form-group">
                          <label>Name *</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>Email *</label>
                          <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>Rating *</label>
                          <div>
                            <StarRating 
                              rating={selectedRating} 
                              onRatingChange={setSelectedRating} 
                              editable={true} 
                            />
                            <div className="mt-2">
                              {selectedRating === 0 ? 'Please select a rating' : `${selectedRating} star${selectedRating > 1 ? 's' : ''} selected`}
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Title</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="title" 
                            value={formData.title}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Review *</label>
                          <textarea 
                            className="form-control" 
                            name="description" 
                            rows="4" 
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={() => setShowReviewForm(false)}>Cancel</button>
                          <button type="submit" className="btn btn-primary">Submit Review</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters and Search */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select 
                  className="form-control"
                  value={filterRating}
                  onChange={(e) => setFilterRating(parseInt(e.target.value))}
                >
                  <option value={0}>All Ratings</option>
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div className="col-md-3">
                <select 
                  className="form-control"
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    setSortBy(sortBy);
                    setSortOrder(sortOrder);
                  }}
                >
                  <option value="created_at-desc">Newest First</option>
                  <option value="created_at-asc">Oldest First</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="rating-asc">Lowest Rated</option>
                  <option value="helpful_count-desc">Most Helpful</option>
                </select>
              </div>
            </div>

            {/* Reviews List */}
            {reviews.map((review) => (
              <div key={review._id} className="review-item mb-4 p-3 border rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>{review.name}</h4>
                  <StarRating rating={review.rating} />
                </div>
                {review.title && <h5>{review.title}</h5>}
                <p className="mb-2">{review.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {new Date(review.created_at).toLocaleDateString()}
                  </small>
                  <div>
                    <button 
                      className="btn btn-sm btn-outline-primary mr-2"
                      onClick={() => markHelpful(review._id)}
                    >
                      Helpful ({review.helpful_count})
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        if (window.confirm('Report this review as inappropriate?')) {
                          reportReview(review._id);
                        }
                      }}
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-4">
                <p>No reviews yet. Be the first to leave a review!</p>
              </div>
            )}

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
                  <a href="#" className="img" style={{backgroundImage: "url(/images/project_6.png)"}}></a>
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
                  <a href="#" className="img" style={{backgroundImage: "url(/images/project_2.png)"}}></a>
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
                  <a href="#" className="img" style={{backgroundImage: "url(/images/project_4.png)"}}></a>
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