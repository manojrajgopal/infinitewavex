import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@infinitewavex.com',
    role: 'Super Administrator',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15 14:30:00',
    avatar: '/images/avatar.png',
    bio: 'System administrator with full access to all features and settings.',
    notifications: true,
    twoFactor: false,
    emailNotifications: true
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activityLog, setActivityLog] = useState([
    { id: 1, action: 'Logged in', timestamp: '2024-01-15 14:30:00', ip: '192.168.1.100' },
    { id: 2, action: 'Viewed project requests', timestamp: '2024-01-14 11:20:00', ip: '192.168.1.100' },
    { id: 3, action: 'Updated contact messages', timestamp: '2024-01-13 09:45:00', ip: '192.168.1.100' },
    { id: 4, action: 'Generated analytics report', timestamp: '2024-01-12 16:15:00', ip: '192.168.1.100' },
    { id: 5, action: 'Modified user permissions', timestamp: '2024-01-11 14:30:00', ip: '192.168.1.100' },
  ]);

  useEffect(() => {
    // In production, this would fetch profile data from an API
    setFormData({ ...profileData });
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // In production, this would save to an API
    setProfileData({ ...formData });
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    
    // In production, this would update password via API
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Password updated successfully!');
  };

  const uploadAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In production, this would upload to server
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-12">
          <h2 className="mb-4">Admin Profile</h2>
          <p className="text-muted">Manage your profile, security settings, and preferences.</p>
        </div>
      </div>

      <div className="row">
        {/* Profile Information */}
        <div className="col-lg-4 mb-4">
          <div 
            className="card border-0 shadow-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <div className="card-body text-center">
              <div className="mb-4">
                <div className="avatar-container position-relative" style={{ 
                  width: '120px', 
                  height: '120px', 
                  margin: '0 auto 20px' 
                }}>
                  <img 
                    src={formData.avatar} 
                    alt="Profile" 
                    className="rounded-circle img-fluid border"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {editMode && (
                    <label className="position-absolute" style={{ bottom: '0', right: '0', cursor: 'pointer' }}>
                      <i className="fa fa-camera fa-lg bg-primary text-white rounded-circle p-2"></i>
                      <input 
                        type="file" 
                        className="d-none" 
                        accept="image/*"
                        onChange={uploadAvatar}
                      />
                    </label>
                  )}
                </div>
                <h4 className="mb-1">{formData.name}</h4>
                <p className="text-muted mb-2">{formData.role}</p>
                <div className="badge badge-success">
                  <i className="fa fa-check-circle mr-1"></i>
                  Active
                </div>
              </div>

              <div className="text-left mb-4">
                <div className="mb-3">
                  <i className="fa fa-envelope mr-2 text-primary"></i>
                  <span>{formData.email}</span>
                </div>
                <div className="mb-3">
                  <i className="fa fa-calendar mr-2 text-primary"></i>
                  <span>Joined: {new Date(formData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="mb-3">
                  <i className="fa fa-sign-in-alt mr-2 text-primary"></i>
                  <span>Last Login: {new Date(formData.lastLogin).toLocaleString()}</span>
                </div>
              </div>

              <div className="d-grid gap-2">
                {editMode ? (
                  <>
                    <button className="btn btn-primary" onClick={handleSaveProfile}>
                      <i className="fa fa-save mr-2"></i>
                      Save Changes
                    </button>
                    <button className="btn btn-secondary" onClick={() => {
                      setFormData({ ...profileData });
                      setEditMode(false);
                    }}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                    <i className="fa fa-edit mr-2"></i>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div 
            className="card border-0 shadow-sm mt-4"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <div className="card-body">
              <h5 className="mb-3">Security Settings</h5>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Two-Factor Authentication</h6>
                    <small className="text-muted">Add an extra layer of security</small>
                  </div>
                  <div className="custom-control custom-switch">
                    <input 
                      type="checkbox" 
                      className="custom-control-input" 
                      id="twoFactorToggle"
                      checked={formData.twoFactor}
                      onChange={handleInputChange}
                      name="twoFactor"
                    />
                    <label className="custom-control-label" htmlFor="twoFactorToggle"></label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Email Notifications</h6>
                    <small className="text-muted">Receive system notifications</small>
                  </div>
                  <div className="custom-control custom-switch">
                    <input 
                      type="checkbox" 
                      className="custom-control-input" 
                      id="emailToggle"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                      name="emailNotifications"
                    />
                    <label className="custom-control-label" htmlFor="emailToggle"></label>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Push Notifications</h6>
                    <small className="text-muted">Receive browser notifications</small>
                  </div>
                  <div className="custom-control custom-switch">
                    <input 
                      type="checkbox" 
                      className="custom-control-input" 
                      id="pushToggle"
                      checked={formData.notifications}
                      onChange={handleInputChange}
                      name="notifications"
                    />
                    <label className="custom-control-label" htmlFor="pushToggle"></label>
                  </div>
                </div>
              </div>

              <hr className="my-3" />

              <button className="btn btn-outline-danger btn-block">
                <i className="fa fa-sign-out-alt mr-2"></i>
                Logout All Devices
              </button>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="col-lg-8 mb-4">
          <div 
            className="card border-0 shadow-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <div className="card-body">
              <h5 className="mb-4">Profile Information</h5>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.role}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div 
            className="card border-0 shadow-sm mt-4"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <div className="card-body">
              <h5 className="mb-4">Change Password</h5>
              
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                    <small className="text-muted">Minimum 8 characters</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>Password Strength</h6>
                  <div className="progress" style={{ height: '8px', width: '200px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      style={{ 
                        width: passwordData.newPassword.length >= 8 ? '100%' : 
                               passwordData.newPassword.length >= 6 ? '70%' : 
                               passwordData.newPassword.length >= 4 ? '40%' : '10%' 
                      }}
                    ></div>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleChangePassword}>
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div 
            className="card border-0 shadow-sm mt-4"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Recent Activity</h5>
                <button className="btn btn-sm btn-outline-secondary">
                  View All
                </button>
              </div>
              
              <div className="activity-timeline">
                {activityLog.map((activity) => (
                  <div key={activity.id} className="activity-item d-flex mb-3">
                    <div className="activity-icon mr-3">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                        style={{ width: '40px', height: '40px' }}>
                        <i className="fa fa-history"></i>
                      </div>
                    </div>
                    <div className="activity-content flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">{activity.action}</h6>
                        <small className="text-muted">
                          {new Date(activity.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </small>
                      </div>
                      <small className="text-muted">
                        <i className="fa fa-globe mr-1"></i>
                        {activity.ip} • {new Date(activity.timestamp).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="row mt-4">
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
              <h5 className="mb-3">Account Statistics</h5>
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="mb-3">
                    <h2 className="mb-0">156</h2>
                    <small className="text-muted">Total Logins</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <h2 className="mb-0">24</h2>
                    <small className="text-muted">Projects Managed</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <h2 className="mb-0">89</h2>
                    <small className="text-muted">Messages Handled</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <h2 className="mb-0">15</h2>
                    <small className="text-muted">System Reports</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div 
            className="card border-0 shadow-sm border-danger"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}
          >
            <div className="card-body">
              <h5 className="text-danger mb-3">
                <i className="fa fa-exclamation-triangle mr-2"></i>
                Danger Zone
              </h5>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h6>Export Account Data</h6>
                    <p className="text-muted small mb-2">
                      Download all your account data including activity logs and settings.
                    </p>
                    <button className="btn btn-outline-secondary">
                      <i className="fa fa-download mr-2"></i>
                      Export Data
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <h6 className="text-danger">Delete Account</h6>
                    <p className="text-muted small mb-2">
                      Permanently delete your admin account. This action cannot be undone.
                    </p>
                    <button className="btn btn-danger" onClick={() => {
                      if (window.confirm('Are you absolutely sure? This will permanently delete your admin account and all associated data.')) {
                        alert('Account deletion requested. This feature would call your API in production.');
                      }
                    }}>
                      <i className="fa fa-trash mr-2"></i>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;