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
                        <li><span className="fa fa-map-marker" style={{ marginRight: '10px' }}></span><span className="text">Krishshnarajapuram, Bangalore, India - 560049</span></li>
                        <li><a href="#"><span className="fa fa-phone" style={{ marginRight: '10px' }}></span><span className="text">+91 8951663446</span></a></li>
                        <li><a href="#"><span className="fa fa-envelope" style={{ marginRight: '10px' }}></span><span className="text">infinitewavexofficial@gmail.com</span></a></li>
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