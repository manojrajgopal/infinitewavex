import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AdminNavigation from '../AdminNavigation';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Footer from '../Footer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVisitors: 12456,
    totalProjects: 89,
    totalContacts: 245,
    totalRevenue: 152000,
    activeUsers: 342,
    pendingRequests: 12
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: 'John Doe', action: 'Submitted project request', time: '2 mins ago', type: 'project' },
    { id: 2, user: 'Sarah Smith', action: 'Sent contact message', time: '15 mins ago', type: 'contact' },
    { id: 3, user: 'Mike Johnson', action: 'Downloaded brochure', time: '1 hour ago', type: 'download' },
    { id: 4, user: 'Emma Wilson', action: 'Requested callback', time: '2 hours ago', type: 'contact' },
    { id: 5, user: 'Robert Brown', action: 'Submitted project inquiry', time: '3 hours ago', type: 'project' },
  ]);

  const location = useLocation();
  
  useEffect(() => {
    if (window.AOS) window.AOS.init();
    if (window.$ && window.$('.owl-carousel').length) {
      window.$('.owl-carousel').owlCarousel();
    }
    const scriptElements = [];
    
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
        scriptElements.push(script);
      });
    };

    const scripts = [
      '/js/jquery.min.js',
      '/js/popper.min.js',
      '/js/bootstrap.min.js',
      '/js/jquery.easing.1.3.js',
      '/js/jquery.waypoints.min.js',
      '/js/jquery.stellar.min.js',
      '/js/owl.carousel.min.js',
      '/js/jquery.magnific-popup.min.js',
      '/js/aos.js',
      '/js/jquery.animateNumber.min.js',
      '/js/bootstrap-datepicker.js',
      '/js/scrollax.min.js',
      '/js/main.js'
    ];

    const loadScripts = async () => {
      try {
        for (const src of scripts) {
          await loadScript(src);
        }
      } catch (error) {
        console.error('Script loading error:', error);
      }
    };

    if (!window.__themeScriptsLoaded) {
      window.__themeScriptsLoaded = true;
      loadScripts();
    }
    loadScripts();

    return () => {
      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [location]);

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Website Visitors',
        data: [650, 890, 1200, 1450, 1680, 1950, 2200],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: 'Contact Requests',
        data: [45, 60, 75, 90, 110, 130, 145],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4
      }
    ]
  };

  const barData = {
    labels: ['AI Projects', 'Web Development', 'Mobile Apps', 'Consulting', 'Design'],
    datasets: [
      {
        label: 'Project Requests',
        data: [45, 28, 36, 19, 22],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const pieData = {
    labels: ['New', 'In Progress', 'Completed', 'On Hold'],
    datasets: [
      {
        data: [12, 28, 45, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div id="colorlib-page">
      <ThreeJSParticles />
      <Helmet>
        <title>InfiniteWaveX - Admin Dashboard</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700" rel="stylesheet" />

        <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />

        <link rel="stylesheet" href="/css/aos.css" />

        <link rel="stylesheet" href="/css/ionicons.min.css" />

        <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
        <link rel="stylesheet" href="/css/jquery.timepicker.css" />

        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/icomoon.css" />
        <link rel="stylesheet" href="/css/style.css" />

        <style type="text/css">{`
          .js-fullheight {
            min-height: 100vh;
            height: auto !important;
            display: flex;
            flex-direction: column;
          }

          html, body {
            height: auto;
            min-height: 100vh;
            overflow-x: hidden;
            overflow-y: auto;
          }

          .admin-stats-card {
            border-radius: 10px;
            color: white;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .admin-stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
          }

          .admin-stats-card h3 {
            font-size: 1.8rem;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .admin-stats-card h6 {
            font-size: 0.9rem;
            opacity: 0.9;
            margin-bottom: 10px;
          }

          .admin-chart-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
            height: 100%;
          }

          .admin-table-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
            height: 100%;
          }

          .admin-quick-stats {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
          }

          .stat-icon {
            font-size: 28px;
            opacity: 0.8;
            margin-left: 15px;
          }

          .activity-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            margin-left: 10px;
          }

          .badge-project {
            background: rgba(75, 192, 192, 0.2);
            color: rgb(75, 192, 192);
          }

          .badge-contact {
            background: rgba(255, 99, 132, 0.2);
            color: rgb(255, 99, 132);
          }

          .badge-download {
            background: rgba(255, 206, 86, 0.2);
            color: rgb(255, 206, 86);
          }

          @media (max-width: 768px) {
            .hero-wrap.js-fullheight {
              padding-top: 20px;
            }
            #colorlib-aside {
              padding-top: 20px;
            }
            .admin-stats-card {
              padding: 15px;
            }
            .admin-stats-card h3 {
              font-size: 1.5rem;
            }
            .admin-chart-card,
            .admin-table-card,
            .admin-quick-stats {
              padding: 15px;
            }
          }
          
          @media (max-width: 480px) {
            .hero-wrap.js-fullheight {
              padding-top: 10px;
            }
            .admin-stats-card h3 {
              font-size: 1.3rem;
            }
            .stat-icon {
              font-size: 22px;
            }
          }
        `}</style>
      </Helmet>

      <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
      <aside id="colorlib-aside" role="complementary" className="js-fullheight text-center">
        <h1 id="colorlib-logo">
          <a href="#" onClick={() => window.location.href = '/'}>InfWX<span>.</span></a>
        </h1>

        <AdminNavigation />

        <Copyright />
      </aside>

      <div id="colorlib-main">
        <div className="hero-wrap js-fullheight" style={{backgroundImage: "url(/images/adminDashboard_bg.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="desc">
                <h2 className="subheading">Admin Panel</h2>
                <h1 className="mb-4">Dashboard Overview</h1>
                <p className="mb-4">
                  Welcome to your admin dashboard. Monitor your business performance and manage everything from here.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            {/* Stats Cards */}
            <div className="row mb-5">
              <div className="col-md-12">
                <h3 className="mb-4">Quick Stats</h3>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #667eea, #764ba2)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Total Visitors</h6>
                      <h3 className="mb-0">{stats.totalVisitors.toLocaleString()}</h3>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-eye"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #f093fb, #f5576c)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Project Requests</h6>
                      <h3 className="mb-0">{stats.totalProjects}</h3>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-briefcase"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #4facfe, #00f2fe)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Contact Messages</h6>
                      <h3 className="mb-0">{stats.totalContacts}</h3>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-envelope"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #43e97b, #38f9d7)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Revenue</h6>
                      <h3 className="mb-0">${stats.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-dollar"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #fa709a, #fee140)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Active Users</h6>
                      <h3 className="mb-0">{stats.activeUsers}</h3>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-users"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Pending Requests</h6>
                      <h3 className="mb-0">{stats.pendingRequests}</h3>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-clock"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="row mb-5">
              <div className="col-lg-8 mb-4">
                <div className="admin-chart-card">
                  <h5 className="mb-3">Monthly Analytics</h5>
                  <div style={{ height: '300px' }}>
                    <Line data={lineData} options={options} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="admin-chart-card">
                  <h5 className="mb-3">Project Distribution</h5>
                  <div style={{ height: '250px' }}>
                    <Pie data={pieData} options={options} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity & Project Types */}
            <div className="row mb-5">
              <div className="col-lg-6 mb-4">
                <div className="admin-table-card">
                  <h5 className="mb-3">Recent Activity</h5>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Action</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActivity.map((activity) => (
                          <tr key={activity.id}>
                            <td>
                              <i className={`fa fa-${
                                activity.type === 'project' ? 'briefcase' : 
                                activity.type === 'contact' ? 'envelope' : 'download'
                              } mr-2 text-primary`}></i>
                              {activity.user}
                              <span className={`activity-badge badge-${activity.type}`}>
                                {activity.type}
                              </span>
                            </td>
                            <td>{activity.action}</td>
                            <td className="text-muted">{activity.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="admin-chart-card">
                  <h5 className="mb-3">Project Requests by Category</h5>
                  <div style={{ height: '250px' }}>
                    <Bar data={barData} options={options} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="row">
              <div className="col-12">
                <div className="admin-quick-stats">
                  <div className="row text-center">
                    <div className="col-md-3 mb-4">
                      <h2 className="mb-0 text-primary">98%</h2>
                      <p className="text-muted mb-0">Satisfaction Rate</p>
                    </div>
                    <div className="col-md-3 mb-4">
                      <h2 className="mb-0 text-primary">24/7</h2>
                      <p className="text-muted mb-0">Support Available</p>
                    </div>
                    <div className="col-md-3 mb-4">
                      <h2 className="mb-0 text-primary">89%</h2>
                      <p className="text-muted mb-0">Response Rate</p>
                    </div>
                    <div className="col-md-3 mb-4">
                      <h2 className="mb-0 text-primary">45</h2>
                      <p className="text-muted mb-0">Active Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>

      <div id="ftco-loader" className="show fullscreen">
        <svg className="circular" width="48px" height="48px">
          <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/>
          <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/>
        </svg>
      </div>
    </div>
  );
};

export default AdminDashboard;