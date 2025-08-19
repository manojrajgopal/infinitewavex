import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink } from 'react-router-dom';

const ProjectRequest = () => {
  const [customerType, setCustomerType] = useState('individual');
  const [formData, setFormData] = useState({
    projectTitle: '',
    name: '',
    email: '',
    budget: '',
    deadline: '',
    details: '',
    files: null
  });

  const customerTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'student', label: 'Student (15% discount)' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'startup', label: 'Startup (10% discount)' },
    { value: 'small-business', label: 'Small Business' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'non-profit', label: 'Non-Profit Organization' },
    { value: 'government', label: 'Government Agency' },
    { value: 'educational', label: 'Educational Institution' },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { customerType, ...formData });
    // Here you would typically send the data to your backend
    alert('Project request submitted successfully!');
  };

  return (
    <div id="colorlib-page">
      <Helmet>
        <title>InfiniteWaveX - Project Request</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700" rel="stylesheet" />
      </Helmet>

      <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
      <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
        <h1 id="colorlib-logo"><Link to="/">InfWX<span>.</span></Link></h1>
        <nav id="colorlib-main-menu" role="navigation">
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "colorlib-active" : ""}>Home</NavLink></li>
            <li><NavLink to="/photography" className={({ isActive }) => isActive ? "colorlib-active" : ""}>Photography</NavLink></li>
            <li><NavLink to="/projects" className={({ isActive }) => isActive ? "colorlib-active" : ""}>Projects</NavLink></li>
            <li><NavLink to="/fashion" className={({ isActive }) => isActive ? "colorlib-active" : ""}>Fashion</NavLink></li>
            <li><NavLink to="/projectrequest" className={({ isActive }) => isActive ? "colorlib-active" : ""}>Project Request</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "colorlib-active" : ""}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "colorlib-active" : ""}>Contact</NavLink></li>
          </ul>
        </nav>

        <div className="colorlib-footer">
          <p>Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://manojrajgopal.github.io/portfolio/" target="_blank" rel="noopener noreferrer">InfiniteWaveX</a></p>
          <ul>
            <li><a href="#"><i className="icon-facebook"></i></a></li>
            <li><a href="#"><i className="icon-twitter"></i></a></li>
            <li><a href="#"><i className="icon-instagram"></i></a></li>
            <li><a href="#"><i className="icon-linkedin"></i></a></li>
          </ul>
        </div>
      </aside>

      <div id="colorlib-main" style={{ position: 'relative', zIndex: 1 }}>
        <section className="ftco-section contact-section">
          <div className="container">
            <div className="row d-flex mb-5 contact-info">
              <div className="col-md-12 mb-4">
                <h2 className="h4 font-weight-bold">Project Request Form</h2>
              </div>
            </div>
            
            <div className="row block-9">
              <div className="col-md-12 pr-md-5">
                <form onSubmit={handleSubmit} className="bg-white p-5 contact-form">
                  <div className="form-group">
                    <label className="text-dark">Customer Type *</label>
                    <select
                      value={customerType}
                      onChange={(e) => setCustomerType(e.target.value)}
                      className="form-control"
                      required
                    >
                      {customerTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="text-dark">Project Title *</label>
                    <input 
                      type="text" 
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="My Awesome Project" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="text-dark">Your Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="text-dark">Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="your@email.com" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="text-dark">Estimated Budget ($)</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input 
                        type="number" 
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="form-control" 
                        placeholder="5000" 
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="text-dark">Target Deadline</label>
                    <input 
                      type="date" 
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="text-dark">Project Details *</label>
                    <textarea 
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="Describe your project requirements, goals, and any specific needs..."
                      rows="8"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="text-dark">Attachments</label>
                    <div className="custom-file">
                      <input 
                        type="file" 
                        name="files"
                        onChange={handleChange}
                        className="custom-file-input" 
                        id="customFile" 
                        multiple 
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {formData.files ? `${formData.files.length} files selected` : 'Choose files (PDF, DOC, JPG, PNG up to 10MB)'}
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <button 
                      type="submit" 
                      className="btn btn-primary py-3 px-5"
                    >
                      Submit Project Request
                    </button>
                  </div>
                </form>
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
                      <li><span className="icon icon-map-marker"></span><span className="text">Krishnarajapuram, Bangalore, India - 560049</span></li>
                      <li><a href="#"><span className="icon icon-phone"></span><span className="text">+91 8951663446</span></a></li>
                      <li><a href="#"><span className="icon icon-envelope"></span><span className="text">infinitewavexofficial@gmail.com</span></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p>Copyright &copy; All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://manojrajgopal.github.io/portfolio/" target="_blank" rel="noopener noreferrer">InfiniteWaveX</a></p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProjectRequest;