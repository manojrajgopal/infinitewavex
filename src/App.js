import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Photography from './components/Pages/Photography';
import Projects from './components/Pages/Projects';
import Fashion from './components/Pages/Fashion';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;