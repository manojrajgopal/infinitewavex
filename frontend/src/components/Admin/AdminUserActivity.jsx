import React, { useState, useEffect } from 'react';

const AdminUserActivity = () => {
  const [userActivities, setUserActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [userStats, setUserStats] = useState({
    totalUsers: 1245,
    activeToday: 342,
    newThisWeek: 89,
    avgSessionTime: '4m 32s',
    retentionRate: '78%'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activityFilter, setActivityFilter] = useState('all');

  useEffect(() => {
    // Mock data - In production, this would come from an API
    const mockActivities = [
      {
        id: 1,
        userId: 'U001',
        name: 'John Doe',
        email: 'john@example.com',
        activity: 'Submitted project request',
        page: '/projectrequest',
        ip: '192.168.1.100',
        location: 'New York, USA',
        timestamp: '2024-01-15 14:30:00',
        device: 'Desktop Chrome',
        status: 'completed'
      },
      {
        id: 2,
        userId: 'U002',
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        activity: 'Viewed AI Factory',
        page: '/ai-factory',
        ip: '192.168.1.101',
        location: 'London, UK',
        timestamp: '2024-01-15 13:15:00',
        device: 'Mobile Safari',
        status: 'active'
      },
      {
        id: 3,
        userId: 'U003',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        activity: 'Downloaded resources',
        page: '/resources',
        ip: '192.168.1.102',
        location: 'Tokyo, Japan',
        timestamp: '2024-01-15 12:45:00',
        device: 'Desktop Firefox',
        status: 'completed'
      },
      {
        id: 4,
        userId: 'U004',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        activity: 'Contact form submission',
        page: '/contact',
        ip: '192.168.1.103',
        location: 'Sydney, Australia',
        timestamp: '2024-01-15 11:20:00',
        device: 'Tablet Chrome',
        status: 'pending'
      },
      {
        id: 5,
        userId: 'U005',
        name: 'Robert Brown',
        email: 'robert@example.com',
        activity: 'Account registration',
        page: '/register',
        ip: '192.168.1.104',
        location: 'Berlin, Germany',
        timestamp: '2024-01-15 10:10:00',
        device: 'Desktop Chrome',
        status: 'completed'
      },
      {
        id: 6,
        userId: 'U006',
        name: 'Lisa Anderson',
        email: 'lisa@example.com',
        activity: 'Newsletter subscription',
        page: '/news',
        ip: '192.168.1.105',
        location: 'Toronto, Canada',
        timestamp: '2024-01-15 09:30:00',
        device: 'Mobile Chrome',
        status: 'completed'
      },
      {
        id: 7,
        userId: 'U007',
        name: 'David Lee',
        email: 'david@example.com',
        activity: 'Project inquiry',
        page: '/projects',
        ip: '192.168.1.106',
        location: 'Singapore',
        timestamp: '2024-01-15 08:45:00',
        device: 'Desktop Edge',
        status: 'active'
      },
      {
        id: 8,
        userId: 'U008',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        activity: 'Viewed testimonials',
        page: '/testimonials',
        ip: '192.168.1.107',
        location: 'Madrid, Spain',
        timestamp: '2024-01-14 16:30:00',
        device: 'Mobile Safari',
        status: 'completed'
      }
    ];

    setUserActivities(mockActivities);
    setFilteredActivities(mockActivities);
  }, []);

  useEffect(() => {
    let filtered = [...userActivities];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.activity.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (activityFilter !== 'all') {
      filtered = filtered.filter(activity => activity.status === activityFilter);
    }

    setFilteredActivities(filtered);
  }, [searchTerm, activityFilter, userActivities]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'success', text: 'Active' },
      completed: { color: 'primary', text: 'Completed' },
      pending: { color: 'warning', text: 'Pending' },
      error: { color: 'danger', text: 'Error' }
    };
    
    const config = statusConfig[status] || { color: 'secondary', text: status };
    return (
      <span className={`badge badge-${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getActivityIcon = (activity) => {
    if (activity.includes('project')) return 'fa-briefcase';
    if (activity.includes('viewed')) return 'fa-eye';
    if (activity.includes('download')) return 'fa-download';
    if (activity.includes('contact')) return 'fa-envelope';
    if (activity.includes('register')) return 'fa-user-plus';
    if (activity.includes('subscription')) return 'fa-newspaper';
    return 'fa-history';
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-12">
          <h2 className="mb-4">User Activity Monitoring</h2>
          <p className="text-muted">Monitor user activities, sessions, and interactions across the platform.</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4>{userStats.totalUsers.toLocaleString()}</h4>
                      <p className="mb-0">Total Users</p>
                    </div>
                    <i className="fa fa-users fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4>{userStats.activeToday}</h4>
                      <p className="mb-0">Active Today</p>
                    </div>
                    <i className="fa fa-chart-line fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4>{userStats.newThisWeek}</h4>
                      <p className="mb-0">New This Week</p>
                    </div>
                    <i className="fa fa-user-plus fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4>{userStats.retentionRate}</h4>
                      <p className="mb-0">Retention Rate</p>
                    </div>
                    <i className="fa fa-chart-pie fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or activity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#333'
              }}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#333'
            }}
          >
            <option value="all">All Activities</option>
            <option value="active">Active Sessions</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <h5 className="mb-3">Real-time Activity Feed</h5>
            <div className="activity-feed">
              {filteredActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="activity-item mb-3 p-3" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  borderLeft: `4px solid ${
                    activity.status === 'active' ? '#28a745' : 
                    activity.status === 'completed' ? '#007bff' : 
                    activity.status === 'pending' ? '#ffc107' : '#dc3545'
                  }`
                }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="mr-3">
                        <i className={`fa ${getActivityIcon(activity.activity)} fa-2x`}></i>
                      </div>
                      <div>
                        <h6 className="mb-1">{activity.name}</h6>
                        <p className="mb-1 text-muted">{activity.activity}</p>
                        <small className="text-muted">
                          <i className="fa fa-globe mr-1"></i>{activity.location} • 
                          <i className="fa fa-desktop ml-2 mr-1"></i>{activity.device}
                        </small>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1">{getStatusBadge(activity.status)}</div>
                      <small className="text-muted">
                        {new Date(activity.timestamp).toLocaleString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Activity Table */}
      <div className="row">
        <div className="col-md-12">
          <div 
            className="card border-0 shadow-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Detailed Activity Log</h5>
                <button className="btn btn-sm btn-outline-primary">
                  <i className="fa fa-download mr-2"></i>
                  Export Logs
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Activity</th>
                      <th>Page</th>
                      <th>Location</th>
                      <th>Device</th>
                      <th>IP Address</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.map((activity) => (
                      <tr key={activity.id}>
                        <td>
                          <div>
                            <strong>{activity.name}</strong>
                            <div className="small text-muted">{activity.email}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className={`fa ${getActivityIcon(activity.activity)} mr-2`}></i>
                            {activity.activity}
                          </div>
                        </td>
                        <td>
                          <code>{activity.page}</code>
                        </td>
                        <td>{activity.location}</td>
                        <td>
                          <small>{activity.device}</small>
                        </td>
                        <td>
                          <code>{activity.ip}</code>
                        </td>
                        <td>
                          {new Date(activity.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </td>
                        <td>{getStatusBadge(activity.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredActivities.length === 0 && (
                <div className="text-center py-5">
                  <i className="fa fa-user-slash fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No user activities found.</p>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  Showing {filteredActivities.length} of {userActivities.length} activities
                </small>
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-secondary">Previous</button>
                  <button className="btn btn-sm btn-outline-secondary active">1</button>
                  <button className="btn btn-sm btn-outline-secondary">2</button>
                  <button className="btn btn-sm btn-outline-secondary">3</button>
                  <button className="btn btn-sm btn-outline-secondary">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Analytics */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <h5 className="mb-3">Session Duration Distribution</h5>
            <div className="d-flex align-items-center mb-3">
              <div className="flex-grow-1 mr-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>0-2 minutes</span>
                  <span>25%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div className="progress-bar bg-info" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="flex-grow-1 mr-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>2-5 minutes</span>
                  <span>45%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div className="progress-bar bg-success" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="flex-grow-1 mr-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>5-10 minutes</span>
                  <span>20%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div className="progress-bar bg-warning" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1 mr-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>10+ minutes</span>
                  <span>10%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div className="progress-bar bg-danger" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div 
            className="card border-0 shadow-sm p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <h5 className="mb-3">User Behavior Insights</h5>
            <div className="row text-center">
              <div className="col-4">
                <div className="mb-3">
                  <h4 className="mb-0">4.2</h4>
                  <small className="text-muted">Pages/Visit</small>
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <h4 className="mb-0">78%</h4>
                  <small className="text-muted">Return Rate</small>
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <h4 className="mb-0">2.1</h4>
                  <small className="text-muted">Actions/Min</small>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h6>Top User Actions</h6>
              <div className="d-flex flex-wrap gap-2 mt-2">
                <span className="badge badge-primary">Project View</span>
                <span className="badge badge-success">Form Submit</span>
                <span className="badge badge-info">Page Scroll</span>
                <span className="badge badge-warning">Button Click</span>
                <span className="badge badge-secondary">File Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserActivity;