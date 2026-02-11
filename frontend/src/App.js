import { useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import useBackendHeartbeat from './hooks/useBackendHeartbeat';
import Home from './components/Pages/Home';
import Photography from './components/Pages/Gallery';
import Projects from './components/Pages/Projects';
import LeadershipSpotlight from './components/Pages/LeadershipSpotlight';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Career from './components/Pages/Career';
import Testimonials from './components/Pages/Testimonials';
import News from './components/Pages/News';
import ProjectRequest from './components/Pages/ProjectRequest';
import AICallDialer from './components/Pages/AICallDialer';
import AIImage from './components/Pages/AIImage';
import AIFactory from "./components/Pages/AIFactory";

import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/animate.css';
import './assets/css/aos.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/ionicons.min.css';
import './assets/css/open-iconic-bootstrap.min.css';
import './assets/css/flaticon.css';
import './assets/css/jquery.timepicker.css';
import './assets/css/bootstrap-datepicker.css';

function ScriptReloader() {
  const location = useLocation();

  useEffect(() => {
    if (window.AOS) window.AOS.init();
    if (window.$ && window.$('.owl-carousel').length) {
      window.$('.owl-carousel').owlCarousel();
    }
  }, [location]);

  return null;
}

function App() {
  // Call backend every 5 minutes when frontend is open (fire-and-forget, no waiting)
  useBackendHeartbeat(process.env.REACT_APP_BACKEND_URL, 300000);
  
  return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Photography />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/leadershipSpotlight" element={<LeadershipSpotlight />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/news" element={<News />} />
          <Route path="/projectrequest" element={<ProjectRequest />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-call" element={<AICallDialer />} />
          <Route path="/ai-image" element={<AIImage />} />
          <Route path="/ai-factory" element={<AIFactory />} />
          <Route path="*" element={<Home />} />
          
        </Routes>
      <ScriptReloader />
    </>
  );
}

export default App;