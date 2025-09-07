import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // helper: check if route matches (supports dynamic paths like /projects/123)
  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // wrapper: force reload with window.location.href
  const handleRedirect = (url) => (e) => {
    e.preventDefault(); // stop React Router from handling it
    navigate(url);
    // window.location.href = url; // 🔥 your requirement
  };

  return (
    <>
      <style>
        {`
          /* 🔥 Active menu CSS - unchanged */
          #colorlib-aside #colorlib-main-menu ul li.colorlib-active a {
            color: #000000;
          }
          #colorlib-aside #colorlib-main-menu ul li.colorlib-active a:after {
            visibility: visible;
            transform: scaleX(1);
          }
        `}
      </style>

      <nav id="colorlib-main-menu" role="navigation">
        <ul>
          <li className={isActivePath("/") ? "colorlib-active" : ""}>
            <NavLink to="/" onClick={handleRedirect("/")}>Home</NavLink>
          </li>
          <li className={isActivePath("/projects") ? "colorlib-active" : ""}>
            <NavLink to="/projects" onClick={handleRedirect("/projects")}>Projects</NavLink>
          </li>
          <li className={isActivePath("/ai-factory") ? "colorlib-active" : ""}>
            <NavLink to="/ai-factory" onClick={handleRedirect("/ai-factory")}>AI Factory</NavLink>
          </li>
          {/* <li className={isActivePath("/gallery") ? "colorlib-active" : ""}>
            <NavLink to="/gallery" onClick={handleRedirect("/gallery")}>Gallery</NavLink>
          </li> */}
          <li className={isActivePath("/projectrequest") ? "colorlib-active" : ""}>
            <NavLink to="/projectrequest" onClick={handleRedirect("/projectrequest")}>Project Request</NavLink>
          </li>
          {/* <li className={isActivePath("/career") ? "colorlib-active" : ""}>
            <NavLink to="/career" onClick={handleRedirect("/career")}>Career</NavLink>
          </li> */}
          <li className={isActivePath("/leadershipSpotlight") ? "colorlib-active" : ""}>
            <NavLink to="/leadershipSpotlight" onClick={handleRedirect("/leadershipSpotlight")}>Leadership Spotlight</NavLink>
          </li>
          <li className={isActivePath("/testimonials") ? "colorlib-active" : ""}>
            <NavLink to="/testimonials" onClick={handleRedirect("/testimonials")}>Testimonials</NavLink>
          </li>
          <li className={isActivePath("/news") ? "colorlib-active" : ""}>
            <NavLink to="/news" onClick={handleRedirect("/news")}>News</NavLink>
          </li>    
          <li className={isActivePath("/about") ? "colorlib-active" : ""}>
            <NavLink to="/about" onClick={handleRedirect("/about")}>About</NavLink>
          </li>
          <li className={isActivePath("/contact") ? "colorlib-active" : ""}>
            <NavLink to="/contact" onClick={handleRedirect("/contact")}>Contact</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
