import React, { useState, useEffect } from 'react';

const AdminSystemLogs = () => {
  const [systemLogs, setSystemLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [logLevel, setLogLevel] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 68,
    diskUsage: 32,
    uptime: '15 days, 6 hours',
    responseTime: '142ms',
    errorRate: '0.2%'
  });

  useEffect(() => {
    // Mock data - In production, this would come from an API
    const mockLogs = [
      {
        id: 1,
        timestamp: '2024-01-15 14:30:25',
        level: 'INFO',
        component: 'API Server',
        message: 'User authentication successful for user@example.com',
        ip: '192.168.1.100',
        userId: 'U001'
      },
      {
        id: 2,
        timestamp: '2024-01-15 14:28:10',
        level: 'WARNING',
        component: 'Database',
        message: 'Connection pool at 85% capacity',
        ip: '192.168.1.1',
        userId: null
      },
      {
        id: 3,
        timestamp: '2024-01-15 14:25:45',
        level: 'ERROR',
        component: 'File Upload',
        message: 'Failed to process file upload: Size exceeds limit',
        ip: '192.168.1.105',
        userId: 'U003'
      },
      {
        id: 4,
        timestamp: '2024-01-15 14:20:30',
        level: 'INFO',
        component: 'Cache',
        message: 'Cache cleared successfully',
        ip: '192.168.1.1',
        userId: null
      },
      {
        id: 5,
        timestamp: '2024-01-15 14:15:22',
        level: 'DEBUG',
        component: 'API Server',
        message: 'Request processed in 142ms',
        ip: '192.168.1.102',
        userId: 'U005'
      },
      {
        id: 6,
        timestamp: '2024-01-15 14:10:18',
        level: 'CRITICAL',
        component: 'Email Service',
        message: 'Email queue processing failed',
        ip: '192.168.1.1',
        userId: null
      },
      {
        id: 7,
        timestamp: '2024-01-15 14:05:12',
        level: 'INFO',
        component: 'Backup Service',
        message: 'Daily backup completed successfully',
        ip: '192.168.1.1',
        userId: null
      },
      {
        id: 8,
        timestamp: '2024-01-15 14:00:05',
        level: 'ERROR',
        component: 'Payment Gateway',
        message: 'Payment processing timeout',
        ip: '192.168.1.107',
        userId: 'U007'
      },
      {
        id: 9,
        timestamp: '2024-01-15 13:55:40',
        level: 'WARNING',
        component: 'Security',
        message: 'Multiple failed login attempts detected',
        ip: '192.168.1.108',
        userId: null
      },
      {
        id: 10,
        timestamp: '2024-01-15 13:50:15',
        level: 'INFO',
        component: 'System Health',
        message: 'All systems operational',
        ip: '192.168.1.1',
        userId: null
      }
    ];

    setSystemLogs(mockLogs);
    setFilteredLogs(mockLogs);
  }, []);

  useEffect(() => {
    let filtered = [...systemLogs];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply log level filter
    if (logLevel !== 'all') {
      filtered = filtered.filter(log => log.level === logLevel.toUpperCase());
    }

    // Apply date range filter (simplified)
    if (dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        switch (dateRange) {
          case 'today':
            return logDate.toDateString() === now.toDateString();
          case 'yesterday':
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            return logDate.toDateString() === yesterday.toDateString();
          case 'week':
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return logDate >= weekAgo;
          default:
            return true;
        }
      });
    }

    setFilteredLogs(filtered);
  }, [searchTerm, logLevel, dateRange, systemLogs]);

  const getLogLevelBadge = (level) => {
    const levelConfig = {
      INFO: { color: 'info', icon: 'fa-info-circle' },
      WARNING: { color: 'warning', icon: 'fa-exclamation-triangle' },
      ERROR: { color: 'danger', icon: 'fa-exclamation-circle' },
      CRITICAL: { color: 'dark', icon: 'fa-bug' },
      DEBUG: { color: 'secondary', icon: 'fa-bug' }
    };
    
    const config = levelConfig[level] || { color: 'secondary', icon: 'fa-circle' };
    return (
      <span className={`badge badge-${config.color}`}>
        <i className={`fa ${config.icon} mr-1`}></i>
        {level}
      </span>
    );
  };

  const clearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      setSystemLogs([]);
      setFilteredLogs([]);
    }
  };

  const getComponentIcon = (component) => {
    if (component.includes('API')) return 'fa-code';
    if (component.includes('Database')) return 'fa-database';
    if (component.includes('File')) return 'fa-file-upload';
    if (component.includes('Cache')) return 'fa-bolt';
    if (component.includes('Email')) return 'fa-envelope';
    if (component.includes('Backup')) return 'fa-save';
    if (component.includes('Payment')) return 'fa-credit-card';
    if (component.includes('Security')) return 'fa-shield-alt';
    return 'fa-server';
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-12">
          <h2 className="mb-4">System Logs & Monitoring</h2>
          <p className="text-muted">Monitor system performance, errors, and server logs in real-time.</p>
        </div>
      </div>

      {/* System Metrics */}
      <div className="row mb-4">
        {[
          { 
            title: 'CPU Usage', 
            value: `${systemMetrics.cpuUsage}%`, 
            status: systemMetrics.cpuUsage > 80 ? 'warning' : 'normal',
            icon: 'fa-microchip',
            color: 'linear-gradient(45deg, #667eea, #764ba2)'
          },
          { 
            title: 'Memory Usage', 
            value: `${systemMetrics.memoryUsage}%`, 
            status: systemMetrics.memoryUsage > 85 ? 'warning' : 'normal',
            icon: 'fa-memory',
            color: 'linear-gradient(45deg, #f093fb, #f5576c)'
          },
          { 
            title: 'Disk Usage', 
            value: `${systemMetrics.diskUsage}%`, 
            status: systemMetrics.diskUsage > 90 ? 'warning' : 'normal',
            icon: 'fa-hdd',
            color: 'linear-gradient(45deg, #4facfe, #00f2fe)'
          },
          { 
            title: 'Uptime', 
            value: systemMetrics.uptime, 
            status: 'normal',
            icon: 'fa-clock',
            color: 'linear-gradient(45deg, #43e97b, #38f9d7)'
          },
          { 
            title: 'Response Time', 
            value: systemMetrics.responseTime, 
            status: 'normal',
            icon: 'fa-tachometer-alt',
            color: 'linear-gradient(45deg, #fa709a, #fee140)'
          },
          { 
            title: 'Error Rate', 
            value: systemMetrics.errorRate, 
            status: systemMetrics.errorRate > '1%' ? 'warning' : 'normal',
            icon: 'fa-exclamation-triangle',
            color: 'linear-gradient(45deg, #ff9a9e, #fad0c4)'
          }
        ].map((metric, index) => (
          <div className="col-md-4 col-lg-2 mb-3" key={index}>
            <div 
              className="card border-0 shadow-sm"
              style={{
                background: metric.color,
                borderRadius: '15px',
                color: 'white',
                height: '120px'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-2">{metric.title}</h6>
                    <h3 className="mb-0">{metric.value}</h3>
                    {metric.status === 'warning' && (
                      <small className="opacity-75">
                        <i className="fa fa-exclamation-triangle mr-1"></i>
                        Warning
                      </small>
                    )}
                  </div>
                  <div className="icon-circle" style={{ fontSize: '24px' }}>
                    <i className={`fa ${metric.icon}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Actions */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search logs by component, message, or IP..."
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
        <div className="col-md-3">
          <select
            className="form-control"
            value={logLevel}
            onChange={(e) => setLogLevel(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#333'
            }}
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="critical">Critical</option>
            <option value="debug">Debug</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#333'
            }}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">Last 7 Days</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <div>
              <button className="btn btn-primary mr-2">
                <i className="fa fa-sync-alt mr-2"></i>
                Refresh Logs
              </button>
              <button className="btn btn-outline-secondary mr-2">
                <i className="fa fa-download mr-2"></i>
                Export Logs
              </button>
              <button className="btn btn-outline-secondary">
                <i className="fa fa-filter mr-2"></i>
                Advanced Filters
              </button>
            </div>
            <div>
              <button className="btn btn-danger" onClick={clearLogs}>
                <i className="fa fa-trash mr-2"></i>
                Clear All Logs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Log Feed */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div 
            className="card border-0 shadow-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Real-time Log Feed</h5>
              <div className="custom-control custom-switch">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  id="autoRefresh" 
                  defaultChecked 
                />
                <label className="custom-control-label" htmlFor="autoRefresh">
                  Auto-refresh
                </label>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="console-log" style={{
                height: '300px',
                overflowY: 'auto',
                backgroundColor: '#1e1e1e',
                color: '#d4d4d4',
                fontFamily: 'Monaco, Consolas, monospace',
                fontSize: '13px',
                padding: '15px'
              }}>
                {filteredLogs.map((log) => (
                  <div key={log.id} className="log-entry mb-2" style={{
                    borderLeft: `3px solid ${
                      log.level === 'INFO' ? '#007bff' :
                      log.level === 'WARNING' ? '#ffc107' :
                      log.level === 'ERROR' ? '#dc3545' :
                      log.level === 'CRITICAL' ? '#343a40' : '#6c757d'
                    }`,
                    paddingLeft: '10px'
                  }}>
                    <div className="d-flex align-items-start">
                      <div style={{ minWidth: '180px' }}>
                        <span style={{ color: '#569cd6' }}>{log.timestamp}</span>
                      </div>
                      <div className="mr-3">
                        {getLogLevelBadge(log.level)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div>
                          <i className={`fa ${getComponentIcon(log.component)} mr-2`}></i>
                          <strong style={{ color: '#9cdcfe' }}>{log.component}</strong>
                        </div>
                        <div className="mt-1">
                          <span>{log.message}</span>
                          {log.userId && (
                            <span className="ml-2">
                              <i className="fa fa-user mr-1"></i>
                              <code>{log.userId}</code>
                            </span>
                          )}
                          <span className="ml-2">
                            <i className="fa fa-network-wired mr-1"></i>
                            <code>{log.ip}</code>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Logs Table */}
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
                <h5 className="mb-0">Detailed System Logs</h5>
                <small className="text-muted">
                  Showing {filteredLogs.length} of {systemLogs.length} logs
                </small>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Level</th>
                      <th>Component</th>
                      <th>Message</th>
                      <th>IP Address</th>
                      <th>User ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr key={log.id}>
                        <td>
                          <div className="small text-muted">
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </td>
                        <td>{getLogLevelBadge(log.level)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className={`fa ${getComponentIcon(log.component)} mr-2`}></i>
                            {log.component}
                          </div>
                        </td>
                        <td>
                          <div style={{ maxWidth: '300px' }}>
                            <div className="text-truncate">
                              {log.message}
                            </div>
                          </div>
                        </td>
                        <td>
                          <code>{log.ip}</code>
                        </td>
                        <td>
                          {log.userId ? (
                            <code>{log.userId}</code>
                          ) : (
                            <span className="text-muted">System</span>
                          )}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-info mr-1" title="View Details">
                            <i className="fa fa-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-warning" title="Mark as Resolved">
                            <i className="fa fa-check"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredLogs.length === 0 && (
                <div className="text-center py-5">
                  <i className="fa fa-clipboard-list fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No system logs found.</p>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <button className="btn btn-sm btn-outline-secondary mr-2">
                    <i className="fa fa-arrow-left"></i>
                  </button>
                  <span className="mx-2">Page 1 of 1</span>
                  <button className="btn btn-sm btn-outline-secondary ml-2">
                    <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
                <div>
                  <select className="form-control form-control-sm d-inline-block w-auto">
                    <option>10 per page</option>
                    <option>25 per page</option>
                    <option>50 per page</option>
                    <option>100 per page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Health Dashboard */}
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
            <h5 className="mb-3">System Health Overview</h5>
            <div className="row text-center">
              <div className="col-4">
                <div className="mb-3">
                  <div className="system-status-circle" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px'
                  }}>
                    <i className="fa fa-check fa-2x text-white"></i>
                  </div>
                  <h6 className="mb-0">API Server</h6>
                  <small className="text-success">Healthy</small>
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <div className="system-status-circle" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #ffc107, #ff9800)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px'
                  }}>
                    <i className="fa fa-exclamation-triangle fa-2x text-white"></i>
                  </div>
                  <h6 className="mb-0">Database</h6>
                  <small className="text-warning">Warning</small>
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <div className="system-status-circle" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px'
                  }}>
                    <i className="fa fa-check fa-2x text-white"></i>
                  </div>
                  <h6 className="mb-0">Cache</h6>
                  <small className="text-success">Healthy</small>
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
            <h5 className="mb-3">Recent Error Summary</h5>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>API Errors</span>
                <span>12</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar bg-danger" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Database Errors</span>
                <span>8</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar bg-warning" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>File System Errors</span>
                <span>4</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar bg-info" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary btn-block">
                <i className="fa fa-wrench mr-2"></i>
                Run System Diagnostics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystemLogs;