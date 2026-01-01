import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AdminNavigation from '../AdminNavigation';
import Copyright from '../Copyright';
import ThreeJSParticles from '../ThreeJSParticles';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import Footer from '../Footer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: 12456,
    uniqueVisitors: 8921,
    bounceRate: 32.5,
    avgSessionDuration: '4m 32s',
    conversionRate: 3.8,
    topPages: [
      { page: '/home', views: 3245, duration: '5m 12s' },
      { page: '/projects', views: 2876, duration: '3m 45s' },
      { page: '/ai-factory', views: 2156, duration: '6m 21s' },
      { page: '/contact', views: 1890, duration: '2m 18s' },
      { page: '/about', views: 1678, duration: '4m 53s' },
    ],
    trafficSources: {
      direct: 45,
      organic: 32,
      social: 12,
      referral: 8,
      email: 3
    },
    deviceBreakdown: {
      desktop: 62,
      mobile: 35,
      tablet: 3
    }
  });

  const [chartData, setChartData] = useState({
    trafficData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Page Views',
          data: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Unique Visitors',
          data: [890, 1420, 1100, 1560, 1350, 1750, 1650],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    conversionData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Conversion Rate (%)',
          data: [2.8, 3.2, 3.5, 3.8, 4.1, 4.3],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    performanceData: {
      labels: ['Load Time', 'Uptime', 'API Response', 'Cache Hit', 'Error Rate'],
      datasets: [
        {
          label: 'Performance Score',
          data: [85, 99, 92, 88, 95],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          pointBackgroundColor: 'rgba(255, 206, 86, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 206, 86, 1)'
        }
      ]
    }
  });

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    maintainAspectRatio: false
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div id="colorlib-page">
      <ThreeJSParticles />
      <Helmet>
        <title>InfiniteWaveX - Admin Analytics</title>
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
            backdropFilter: blur(10px);
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

          .time-range-btn {
            border-radius: 20px !important;
            padding: 5px 15px !important;
            margin: 0 2px;
          }

          .traffic-source-item {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
          }

          .traffic-source-item:last-child {
            border-bottom: none;
          }

          .progress-thin {
            height: 8px;
            border-radius: 4px;
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
            .time-range-btn {
              padding: 4px 10px !important;
              font-size: 0.8rem;
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
        <div className="hero-wrap js-fullheight" style={{backgroundImage: "url(/images/analytics_bg.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="desc">
                <h2 className="subheading">Data Insights</h2>
                <h1 className="mb-4">Analytics Dashboard</h1>
                <p className="mb-4">
                  Comprehensive analytics and performance metrics to monitor your website performance
                  and user engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            {/* Header with Time Range */}
            <div className="row mb-4">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">Analytics Overview</h3>
                  <div className="btn-group">
                    <button 
                      className={`btn btn-sm time-range-btn ${timeRange === '24h' ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setTimeRange('24h')}
                    >
                      24H
                    </button>
                    <button 
                      className={`btn btn-sm time-range-btn ${timeRange === '7d' ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setTimeRange('7d')}
                    >
                      7D
                    </button>
                    <button 
                      className={`btn btn-sm time-range-btn ${timeRange === '30d' ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setTimeRange('30d')}
                    >
                      30D
                    </button>
                    <button 
                      className={`btn btn-sm time-range-btn ${timeRange === '90d' ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setTimeRange('90d')}
                    >
                      90D
                    </button>
                  </div>
                </div>
                <p className="text-muted">Viewing data for the last {timeRange === '24h' ? '24 hours' : timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : '90 days'}</p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="row mb-5">
              <div className="col-md-12">
                <h4 className="mb-4">Key Metrics</h4>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #667eea, #764ba2)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Page Views</h6>
                      <h3 className="mb-0">{analyticsData.pageViews.toLocaleString()}</h3>
                      <small className="opacity-75">
                        <i className="fa fa-arrow-up mr-1"></i>
                        +12.5%
                      </small>
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
                      <h6 className="mb-2">Unique Visitors</h6>
                      <h3 className="mb-0">{analyticsData.uniqueVisitors.toLocaleString()}</h3>
                      <small className="opacity-75">
                        <i className="fa fa-arrow-up mr-1"></i>
                        +8.3%
                      </small>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-users"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #4facfe, #00f2fe)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Bounce Rate</h6>
                      <h3 className="mb-0">{analyticsData.bounceRate}%</h3>
                      <small className="opacity-75">
                        <i className="fa fa-arrow-down mr-1"></i>
                        -2.1%
                      </small>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-sign-out"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #43e97b, #38f9d7)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Avg Session</h6>
                      <h3 className="mb-0">{analyticsData.avgSessionDuration}</h3>
                      <small className="opacity-75">
                        <i className="fa fa-arrow-up mr-1"></i>
                        +15s
                      </small>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-clock"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #fa709a, #fee140)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Conversion Rate</h6>
                      <h3 className="mb-0">{analyticsData.conversionRate}%</h3>
                      <small className="opacity-75">
                        <i className="fa fa-arrow-up mr-1"></i>
                        +0.4%
                      </small>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-chart-line"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 mb-3">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-2">Uptime</h6>
                      <h3 className="mb-0">99.9%</h3>
                      <small className="opacity-75">
                        <i className="fa fa-minus mr-1"></i>
                        0.0%
                      </small>
                    </div>
                    <div className="stat-icon">
                      <i className="fa fa-server"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Charts */}
            <div className="row mb-5">
              <div className="col-lg-8 mb-4">
                <div className="admin-chart-card">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Traffic Analytics</h5>
                    <small className="text-muted">Last 7 days</small>
                  </div>
                  <div style={{ height: '300px' }}>
                    <Line data={chartData.trafficData} options={options} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="admin-chart-card">
                  <h5 className="mb-3">System Performance</h5>
                  <div style={{ height: '250px' }}>
                    <Radar data={chartData.performanceData} options={radarOptions} />
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion & Sources */}
            <div className="row mb-5">
              <div className="col-lg-6 mb-4">
                <div className="admin-chart-card">
                  <h5 className="mb-3">Conversion Trends</h5>
                  <div style={{ height: '250px' }}>
                    <Bar data={chartData.conversionData} options={options} />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="admin-chart-card">
                  <h5 className="mb-3">Traffic Sources</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div style={{ height: '200px' }}>
                        <Doughnut 
                          data={{
                            labels: Object.keys(analyticsData.trafficSources),
                            datasets: [{
                              data: Object.values(analyticsData.trafficSources),
                              backgroundColor: [
                                'rgba(255, 99, 132, 0.7)',
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(153, 102, 255, 0.7)'
                              ]
                            }]
                          }} 
                          options={options} 
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mt-3">
                        {Object.entries(analyticsData.trafficSources).map(([source, percentage], index) => (
                          <div key={index} className="traffic-source-item">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <i className={`fa fa-${source === 'direct' ? 'home' : source === 'organic' ? 'search' : source === 'social' ? 'share-alt' : source === 'referral' ? 'link' : 'envelope'} mr-2`}></i>
                                <span className="text-capitalize">{source}</span>
                              </div>
                              <div>
                                <strong>{percentage}%</strong>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Pages & Device Breakdown */}
            <div className="row mb-5">
              <div className="col-lg-6 mb-4">
                <div className="admin-table-card">
                  <h5 className="mb-3">Top Pages</h5>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Page</th>
                          <th>Views</th>
                          <th>Avg. Duration</th>
                          <th>Bounce Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsData.topPages.map((page, index) => (
                          <tr key={index}>
                            <td>
                              <code>{page.page}</code>
                            </td>
                            <td>
                              <strong>{page.views.toLocaleString()}</strong>
                            </td>
                            <td>{page.duration}</td>
                            <td>
                              <span className={`badge ${index < 2 ? 'badge-success' : 'badge-warning'}`}>
                                {index < 2 ? 'Low' : 'Medium'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="admin-chart-card">
                  <h5 className="mb-3">Device & Browser Breakdown</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div style={{ height: '200px' }}>
                        <Doughnut 
                          data={{
                            labels: Object.keys(analyticsData.deviceBreakdown),
                            datasets: [{
                              data: Object.values(analyticsData.deviceBreakdown),
                              backgroundColor: [
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(255, 99, 132, 0.7)',
                                'rgba(255, 206, 86, 0.7)'
                              ]
                            }]
                          }} 
                          options={options} 
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mt-3">
                        <h6>Browser Usage</h6>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <span>Chrome</span>
                            <span>68%</span>
                          </div>
                          <div className="progress progress-thin">
                            <div className="progress-bar bg-success" style={{ width: '68%' }}></div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <span>Firefox</span>
                            <span>18%</span>
                          </div>
                          <div className="progress progress-thin">
                            <div className="progress-bar bg-info" style={{ width: '18%' }}></div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <span>Safari</span>
                            <span>9%</span>
                          </div>
                          <div className="progress progress-thin">
                            <div className="progress-bar bg-warning" style={{ width: '9%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="row">
              <div className="col-12">
                <div className="admin-chart-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">Export Analytics Data</h5>
                      <p className="text-muted mb-0">Download comprehensive analytics reports</p>
                    </div>
                    <div>
                      <button className="btn btn-outline-primary mr-2">
                        <i className="fa fa-download mr-2"></i>
                        Export as CSV
                      </button>
                      <button className="btn btn-primary">
                        <i className="fa fa-file-pdf mr-2"></i>
                        Generate PDF Report
                      </button>
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

export default AdminAnalytics;