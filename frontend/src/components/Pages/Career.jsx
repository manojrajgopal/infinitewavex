import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';

const Career = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    location: '',
    type: '',
    experience: ''
  });
  
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Bangalore",
      type: "Full-time",
      experience: "Mid-level",
      description: "We are looking for a talented Frontend Developer to join our team and help build amazing user experiences.",
      requirements: ["React", "JavaScript", "HTML/CSS", "REST APIs"],
      postedDate: "2023-10-15"
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "Senior",
      description: "Join our design team to create beautiful and intuitive user interfaces for our products.",
      requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      postedDate: "2023-10-10"
    },
    {
      id: 3,
      title: "Backend Engineer",
      department: "Engineering",
      location: "Bangalore",
      type: "Full-time",
      experience: "Senior",
      description: "We need a backend engineer to help scale our infrastructure and build robust APIs.",
      requirements: ["Node.js", "Python", "Databases", "AWS"],
      postedDate: "2023-10-05"
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Data",
      location: "Remote",
      type: "Contract",
      experience: "Mid-level",
      description: "Help us extract insights from data and build machine learning models.",
      requirements: ["Python", "Machine Learning", "Statistics", "SQL"],
      postedDate: "2023-10-01"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Bangalore",
      type: "Full-time",
      experience: "Senior",
      description: "Manage our cloud infrastructure and implement CI/CD pipelines.",
      requirements: ["Docker", "Kubernetes", "AWS", "Jenkins"],
      postedDate: "2023-09-28"
    },
    {
      id: 6,
      title: "Content Writer",
      department: "Marketing",
      location: "Remote",
      type: "Part-time",
      experience: "Entry-level",
      description: "Create engaging content for our blog and marketing materials.",
      requirements: ["Content Writing", "SEO", "Research", "Creative Writing"],
      postedDate: "2023-09-25"
    }
  ]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

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

  // Filter jobs based on selected filters
  useEffect(() => {
    let result = jobs;
    
    if (filters.department) {
      result = result.filter(job => job.department === filters.department);
    }
    
    if (filters.location) {
      result = result.filter(job => job.location === filters.location);
    }
    
    if (filters.type) {
      result = result.filter(job => job.type === filters.type);
    }
    
    if (filters.experience) {
      result = result.filter(job => job.experience === filters.experience);
    }
    
    setFilteredJobs(result);
  }, [filters, jobs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      department: '',
      location: '',
      type: '',
      experience: ''
    });
  };

  // Get unique values for filter options
  const departments = [...new Set(jobs.map(job => job.department))];
  const locations = [...new Set(jobs.map(job => job.location))];
  const types = [...new Set(jobs.map(job => job.type))];
  const experiences = [...new Set(jobs.map(job => job.experience))];

  return (
    <div id="colorlib-page">
      <ThreeJSParticles />
      <Helmet>
        <title>InfiniteWaveX - Careers</title>
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
        <div className="hero-wrap js-fullheight" style={{backgroundImage: "url(/images/career_bg.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="desc">
                <h2 className="subheading">Join Our Team</h2>
                <h1 className="mb-4">Careers at InfiniteWaveX</h1>
                <p className="mb-4">
                  We're always looking for talented individuals to join our growing team. 
                  Explore our current openings and find where you fit in our mission to 
                  innovate and create amazing digital experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-7 heading-section text-center ftco-animate">
                <h2 className="mb-4">Current Openings</h2>
                <p>Find the perfect role that matches your skills and aspirations</p>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-md-12">
                <button 
                  className="btn btn-primary mb-3" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                
                {showFilters && (
                  <div className="filter-card p-4 mb-4" style={{backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
                    <h4>Filter Jobs</h4>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Department</label>
                          <select 
                            className="form-control" 
                            name="department"
                            value={filters.department}
                            onChange={handleFilterChange}
                          >
                            <option value="">All Departments</option>
                            {departments.map(dept => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Location</label>
                          <select 
                            className="form-control" 
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                          >
                            <option value="">All Locations</option>
                            {locations.map(loc => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Job Type</label>
                          <select 
                            className="form-control" 
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                          >
                            <option value="">All Types</option>
                            {types.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Experience Level</label>
                          <select 
                            className="form-control" 
                            name="experience"
                            value={filters.experience}
                            onChange={handleFilterChange}
                          >
                            <option value="">All Levels</option>
                            {experiences.map(exp => (
                              <option key={exp} value={exp}>{exp}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-secondary mt-3" onClick={clearFilters}>
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div key={job.id} className="col-md-12 mb-4">
                    <div className="blog-entry ftco-animate">
                      <div className="text pt-2 mt-3">
                        <span className="category mb-3 d-block">
                          <span className="mr-3">{job.department}</span> 
                          | <span className="mx-3">{job.location}</span> 
                          | <span className="mx-3">{job.type}</span>
                          | <span className="mx-3">{job.experience}</span>
                        </span>
                        <h3 className="mb-4">{job.title}</h3>
                        <p className="mb-4">{job.description}</p>
                        
                        <div className="mb-4">
                          <h5>Requirements:</h5>
                          <ul>
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="meta-wrap align-items-center">
                            <div className="half">
                            <p className="meta">
                                <span><i className="fa fa-calendar"></i> Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                                <span className="ml-3"><i className="fa fa-briefcase"></i> {job.type}</span>
                                <span className="ml-3"><i className="fa fa-map-marker"></i> {job.location}</span>
                                <span className="ml-3"><i className="fa fa-user"></i> {job.experience}</span>
                                <span className="ml-3"><i className="fa fa-building"></i> {job.department}</span>
                            </p>
                            </div>
                          <div className="half text-md-right">
                            <p><a href="#" className="btn btn-primary py-2">Apply Now</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-md-12 text-center">
                  <h4>No jobs match your selected filters</h4>
                  <p>Try adjusting your filters or <button className="btn btn-link p-0" onClick={clearFilters}>clear all filters</button></p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="ftco-section ftco-hireme bg-primary">
          <div className="overlay"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <h2>Can't find the perfect role?</h2>
                <p>We're always interested in meeting talented people. Send us your resume and we'll get in touch when we have an opening that matches your skills.</p>
                <p className="mb-0">
                  <a href="mailto:careers@infinitewavex.com" className="btn btn-secondary py-3 px-5">Send Your Resume</a>
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

export default Career;