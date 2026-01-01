import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
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

const AdminDashboardHome = () => {
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
    <div>
      <div className="row mb-4">
        <div className="col-md-12">
          <h2 className="mb-4">Dashboard Overview</h2>
          <p className="text-muted">Welcome to your admin dashboard. Here's what's happening with your business today.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        {[
          { title: 'Total Visitors', value: stats.totalVisitors, icon: 'fa-eye', color: 'linear-gradient(45deg, #667eea, #764ba2)' },
          { title: 'Project Requests', value: stats.totalProjects, icon: 'fa-briefcase', color: 'linear-gradient(45deg, #f093fb, #f5576c)' },
          { title: 'Contact Messages', value: stats.totalContacts, icon: 'fa-envelope', color: 'linear-gradient(45deg, #4facfe, #00f2fe)' },
          { title: 'Revenue ($)', value: `$${stats.totalRevenue.toLocaleString()}`, icon: 'fa-dollar', color: 'linear-gradient(45deg, #43e97b, #38f9d7)' },
          { title: 'Active Users', value: stats.activeUsers, icon: 'fa-users', color: 'linear-gradient(45deg, #fa709a, #fee140)' },
          { title: 'Pending Requests', value: stats.pendingRequests, icon: 'fa-clock', color: 'linear-gradient(45deg, #ff9a9e, #fad0c4)' }
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

      {/* Charts Row */}
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
            <h5 className="mb-3">Monthly Analytics</h5>
            <div style={{ height: '300px' }}>
              <Line data={lineData} options={options} />
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
            <h5 className="mb-3">Project Distribution</h5>
            <div style={{ height: '250px' }}>
              <Pie data={pieData} options={options} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Project Types */}
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
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
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
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <div className="row text-center">
              <div className="col-md-3">
                <h4 className="mb-0">98%</h4>
                <p className="text-muted mb-0">Satisfaction Rate</p>
              </div>
              <div className="col-md-3">
                <h4 className="mb-0">24/7</h4>
                <p className="text-muted mb-0">Support Available</p>
              </div>
              <div className="col-md-3">
                <h4 className="mb-0">89%</h4>
                <p className="text-muted mb-0">Response Rate</p>
              </div>
              <div className="col-md-3">
                <h4 className="mb-0">45</h4>
                <p className="text-muted mb-0">Active Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;