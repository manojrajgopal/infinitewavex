import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const AdminNavigation = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // helper: check if route matches (supports dynamic paths like /projects/123)
  const isActivePath = (path) => {
    if (path === "/admin/") {
      return location.pathname === "/admin/";
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
          <li className={isActivePath("/admin/dashboard") ? "colorlib-active" : ""}>
            <NavLink to="/admin/dashboard" onClick={handleRedirect("/admin/dashboard")}>Admin Dashboard</NavLink>
          </li>
          <li className={isActivePath("/admin/projectRequest") ? "colorlib-active" : ""}>
            <NavLink to="/admin/projectRequest" onClick={handleRedirect("/admin/projectRequest")}>Project Requests</NavLink>
          </li>
          <li className={isActivePath("/admin/contactMessages") ? "colorlib-active" : ""}>
            <NavLink to="/admin/contactMessages" onClick={handleRedirect("/admin/contactMessages")}>Contact Messages</NavLink>
          </li>
          <li className={isActivePath("/admin/analytics") ? "colorlib-active" : ""}>
            <NavLink to="/admin/analytics" onClick={handleRedirect("/admin/analytics")}>Analytics</NavLink>
          </li>
          <li className={isActivePath("/admin/userActivity") ? "colorlib-active" : ""}>
            <NavLink to="/admin/userActivity" onClick={handleRedirect("/admin/userActivity")}>User Activity</NavLink>
          </li>
          <li className={isActivePath("/admin/systemLogs") ? "colorlib-active" : ""}>
            <NavLink to="/admin/systemLogs" onClick={handleRedirect("/admin/systemLogs")}>System Logs</NavLink>
          </li>
          <li className={isActivePath("/admin/profile") ? "colorlib-active" : ""}>
            <NavLink to="/admin/profile" onClick={handleRedirect("/admin/profile")}>Admin Profile</NavLink>
          </li>

          {/* <li className={isActivePath("/testimonials") ? "colorlib-active" : ""}>
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
          </li> */}

        </ul>
      </nav>
    </>
  );
};

export default AdminNavigation;
