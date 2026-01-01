import React from 'react';

const AdminNavigation = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-dashboard' },
    { id: 'project-requests', label: 'Project Requests', icon: 'fa-briefcase' },
    { id: 'contact-messages', label: 'Contact Messages', icon: 'fa-envelope' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-chart-line' },
    { id: 'users', label: 'User Activity', icon: 'fa-users' },
    { id: 'system', label: 'System Logs', icon: 'fa-cogs' },
    { id: 'profile', label: 'Admin Profile', icon: 'fa-user' },
  ];

  return (
    <>
      <style>
        {`
          .admin-nav-item {
            margin-bottom: 15px;
            padding: 0;
            list-style: none;
            font-size: 16px;
            font-weight: 700;
          }
          .admin-nav-item a {
            color: rgba(0, 0, 0, 0.4);
            text-decoration: none;
            position: relative;
            padding: 10px 0;
            display: block;
            transition: all 0.3s ease;
          }
          .admin-nav-item a:hover {
            color: black;
          }
          .admin-nav-item.active a {
            color: #000000;
          }
          .admin-nav-item a:after {
            content: "";
            position: absolute;
            height: 1px;
            bottom: 7px;
            left: 0;
            right: 0;
            background-color: #000000;
            visibility: hidden;
            transform: scaleX(0);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .admin-nav-item.active a:after,
          .admin-nav-item a:hover:after {
            visibility: visible;
            transform: scaleX(1);
          }
          .nav-icon {
            margin-right: 10px;
            font-size: 14px;
            width: 20px;
            text-align: center;
          }
          .logout-btn {
            margin-top: 30px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a52);
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
          }
          .logout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
          }
        `}
      </style>

      <nav id="colorlib-main-menu" role="navigation">
        <ul>
          {menuItems.map((item) => (
            <li 
              key={item.id}
              className={`admin-nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                }}
              >
                <i className={`fa ${item.icon} nav-icon`}></i>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        <button className="logout-btn" onClick={onLogout}>
          <i className="fa fa-sign-out mr-2"></i>
          Logout
        </button>
      </nav>
    </>
  );
};

export default AdminNavigation;