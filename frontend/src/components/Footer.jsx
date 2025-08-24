import { Helmet } from 'react-helmet';

const Footer = () => {
  return (
    <>
        <Helmet>
            <link rel="stylesheet" href="/css/icomoon.css" />
            <link 
                rel="stylesheet" 
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" 
            />
        </Helmet>

        <footer className="ftco-footer ftco-bg-dark ftco-section">
          <div className="container px-md-5">
            <div className="row mb-5">
              <div className="col-md">
                <div className="ftco-footer-widget mb-4 ml-md-4">
                <h2 className="ftco-heading-2">Our Solutions</h2>
                <ul className="list-unstyled categories">
                  <li><a href="#">AI & Machine Learning <span>(6)</span></a></li>
                  <li><a href="#">Cloud & DevOps <span>(2)</span></a></li>
                  <li><a href="#">Web & App Development <span>(4)</span></a></li>
                  <li><a href="#">ERP & SAP Consulting <span>(7)</span></a></li>
                  <li><a href="#">3D Visualization <span>(12)</span></a></li>
                </ul>
                </div>
              </div>
              <div className="col-md">
                <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Explore</h2>
                <ul className="list-unstyled categories">
                  <li><a href="#">Innovation <span>(1)</span></a></li>
                  <li><a href="#">Creative Design <span>(5)</span></a></li>
                  <li><a href="#">Music & Art <span>(19)</span></a></li>
                  <li><a href="#">Technology <span>(34)</span></a></li>
                  <li><a href="#">Future Trends <span>(11)</span></a></li>
                </ul>
                </div>
              </div>
              <div className="col-md">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Have a Questions?</h2>
                  <div className="block-23 mb-3">
                    <ul>
                        <li><span className="fa fa-map-marker" style={{ marginRight: '10px' }}></span><span className="text">Krishshnarajapuram, Bangalore, India - 560049</span></li>
                        <li><a href="tel:+918951663446"><span className="fa fa-phone" style={{ marginRight: '10px' }}></span><span className="text">+91 8951663446</span></a></li>
                        <li><a href="mailto:infinitewavexofficial@gmail.com"><span className="fa fa-envelope" style={{ marginRight: '10px' }}></span><span className="text">infinitewavexofficial@gmail.com</span></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p>
                    Copyright &copy; {new Date().getFullYear()} All rights reserved | 
                    This template is made with{' '}
                    <i 
                    className="fa fa-heart" 
                    style={{ 
                        color: '#ff0000', 
                        margin: '0 5px',
                        fontSize: '1.2em'
                    }} 
                    aria-hidden="true"
                    ></i>{' '}
                    by{' '}
                    <a href="https://manojrajgopal.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
                    InfiniteWaveX
                    </a>
                </p>
                </div>
            </div>
          </div>
        </footer>
    </>
  );
};

export default Footer;