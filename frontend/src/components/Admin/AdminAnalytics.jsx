import React, { useState, useEffect } from 'react';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
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
    <div>
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Analytics Dashboard</h2>
            <div className="btn-group">
              <button 
                className={`btn btn-sm ${timeRange === '24h' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setTimeRange('24h')}
              >
                24H
              </button>
              <button 
                className={`btn btn-sm ${timeRange === '7d' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setTimeRange('7d')}
              >
                7D
              </button>
              <button 
                className={`btn btn-sm ${timeRange === '30d' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setTimeRange('30d')}
              >
                30D
              </button>
              <button 
                className={`btn btn-sm ${timeRange === '90d' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setTimeRange('90d')}
              >
                90D
              </button>
            </div>
          </div>
          <p className="text-muted">Comprehensive analytics and performance metrics</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="row mb-4">
        {[
          { 
            title: 'Page Views', 
            value: analyticsData.pageViews.toLocaleString(), 
            change: '+12.5%',
            icon: 'fa-eye',
            color: 'linear-gradient(45deg, #667eea, #764ba2)'
          },
          { 
            title: 'Unique Visitors', 
            value: analyticsData.uniqueVisitors.toLocaleString(), 
            change: '+8.3%',
            icon: 'fa-users',
            color: 'linear-gradient(45deg, #f093fb, #f5576c)'
          },
          { 
            title: 'Bounce Rate', 
            value: `${analyticsData.bounceRate}%`, 
            change: '-2.1%',
            icon: 'fa-sign-out',
            color: 'linear-gradient(45deg, #4facfe, #00f2fe)'
          },
          { 
            title: 'Avg Session', 
            value: analyticsData.avgSessionDuration, 
            change: '+15s',
            icon: 'fa-clock',
            color: 'linear-gradient(45deg, #43e97b, #38f9d7)'
          },
          { 
            title: 'Conversion Rate', 
            value: `${analyticsData.conversionRate}%`, 
            change: '+0.4%',
            icon: 'fa-chart-line',
            color: 'linear-gradient(45deg, #fa709a, #fee140)'
          },
          { 
            title: 'Uptime', 
            value: '99.9%', 
            change: '0.0%',
            icon: 'fa-server',
            color: 'linear-gradient(45deg, #ff9a9e, #fad0c4)'
          }
        ].map((stat, index) => (
          <div className="col-md-4 col-lg-2 mb-3" key={index}>
            <div 
              className="card border-0 shadow-sm"
              style={{
                background: stat.color,
                borderRadius: '15px',
                color: 'white',
                height: '120px'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-2">{stat.title}</h6>
                    <h3 className="mb-0">{stat.value}</h3>
                    <small className="opacity-75">
                      <i className={`fa fa-${stat.change.startsWith('+') ? 'arrow-up' : 'arrow-down'} mr-1`}></i>
                      {stat.change}
                    </small>
                  </div>
                  <div className="icon-circle" style={{ fontSize: '24px' }}>
                    <i className={`fa ${stat.icon}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="row mb-4">
        <div className="col-lg-8 mb-4">
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
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
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              height: '100%'
            }}
          >
            <h5 className="mb-3">System Performance</h5>
            <div style={{ height: '250px' }}>
              <Radar data={chartData.performanceData} options={radarOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Conversion & Sources */}
      <div className="row mb-4">
        <div className="col-lg-6 mb-4">
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <h5 className="mb-3">Conversion Trends</h5>
            <div style={{ height: '250px' }}>
              <Bar data={chartData.conversionData} options={options} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
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
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <i className={`fa fa-${source === 'direct' ? 'home' : source === 'organic' ? 'search' : source === 'social' ? 'share-alt' : source === 'referral' ? 'link' : 'envelope'} mr-2`}></i>
                        <span className="text-capitalize">{source}</span>
                      </div>
                      <div>
                        <strong>{percentage}%</strong>
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
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
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
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
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
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-success" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Firefox</span>
                      <span>18%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-info" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Safari</span>
                      <span>9%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
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
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
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
  );
};

export default AdminAnalytics;