import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
        <nav id="colorlib-main-menu" role="navigation">
          <ul>
            <li>
              <NavLink 
              onClick={() => window.location.href = '/'}
                to="/" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
              onClick={() => window.location.href = '/projects'}
                to="/projects" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink 
              onClick={() => window.location.href = '/photography'}
                to="/photography" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Gallery
              </NavLink>
            </li>

            <li>
              <NavLink 
              onClick={() => window.location.href = '/leadershipSpotlight'}
                to="/leadershipSpotlight" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Leadership Spotlight
              </NavLink>
            </li>
            <li>
              <NavLink 
              onClick={() => window.location.href = '/about'}
                to="/about" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
              onClick={() => window.location.href = '/contact'}
                to="/contact" 
                className={({ isActive }) => isActive ? "colorlib-active" : ""}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
  );
}

export default Navigation;