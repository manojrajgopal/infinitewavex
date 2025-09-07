import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const AIFactoryNavigation = () => {
  
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
          <li className={isActivePath("/ai-image") ? "colorlib-active" : ""}>
            <NavLink to="/ai-image" onClick={handleRedirect("/ai-image")}>Image Gen</NavLink>
          </li>
          <li className={isActivePath("/ai-video") ? "colorlib-active" : ""}>
            <NavLink to="/ai-video" onClick={handleRedirect("/ai-video")}>Video Gen</NavLink>
          </li>
          <li className={isActivePath("/contact") ? "colorlib-active" : ""}>
            <NavLink to="/contact" onClick={handleRedirect("/contact")}>Contact</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AIFactoryNavigation;
