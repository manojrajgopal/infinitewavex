import React, { useState, useEffect } from 'react';

const AdminProjectRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    status: 'pending'
  });

  // Mock data - In production, this would come from an API
  const mockRequests = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      projectType: 'AI Development',
      budget: '$50,000 - $100,000',
      timeline: '3-6 months',
      description: 'Looking for an AI-powered chatbot for customer service with natural language processing capabilities.',
      status: 'pending',
      submittedAt: '2024-01-15 14:30:00',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+1 234 567 8901',
      projectType: 'Web Development',
      budget: '$20,000 - $50,000',
      timeline: '2-4 months',
      description: 'Need a responsive e-commerce website with payment integration and admin dashboard.',
      status: 'in-progress',
      submittedAt: '2024-01-14 10:15:00',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 8902',
      projectType: 'Mobile App',
      budget: '$30,000 - $60,000',
      timeline: '4-6 months',
      description: 'Developing a fitness tracking mobile application with real-time analytics and social features.',
      status: 'completed',
      submittedAt: '2024-01-13 09:45:00',
      priority: 'low'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '+1 234 567 8903',
      projectType: 'Consulting',
      budget: '$10,000 - $20,000',
      timeline: '1-2 months',
      description: 'Seeking consultation on implementing AI solutions for supply chain optimization.',
      status: 'pending',
      submittedAt: '2024-01-12 16:20:00',
      priority: 'high'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert@example.com',
      phone: '+1 234 567 8904',
      projectType: 'UI/UX Design',
      budget: '$15,000 - $30,000',
      timeline: '2-3 months',
      description: 'Complete redesign of existing web application with focus on user experience.',
      status: 'in-progress',
      submittedAt: '2024-01-11 11:10:00',
      priority: 'medium'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setRequests(mockRequests);
    setFilteredRequests(mockRequests);
  }, []);

  useEffect(() => {
    let filtered = [...requests];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.projectType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    setFilteredRequests(filtered);
  }, [searchTerm, statusFilter, requests]);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleEdit = (request) => {
    setFormData(request);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      setRequests(requests.filter(request => request.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update existing request
      setRequests(requests.map(request =>
        request.id === formData.id ? formData : request
      ));
    } else {
      // Add new request
      const newRequest = {
        ...formData,
        id: requests.length + 1,
        submittedAt: new Date().toISOString(),
        priority: 'medium'
      };
      setRequests([...requests, newRequest]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      description: '',
      status: 'pending'
    });
    setEditMode(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'warning', text: 'Pending' },
      'in-progress': { color: 'info', text: 'In Progress' },
      completed: { color: 'success', text: 'Completed' },
      cancelled: { color: 'danger', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { color: 'secondary', text: status };
    return (
      <span className={`badge badge-${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'danger', text: 'High' },
      medium: { color: 'warning', text: 'Medium' },
      low: { color: 'success', text: 'Low' }
    };
    
    const config = priorityConfig[priority] || { color: 'secondary', text: priority };
    return (
      <span className={`badge badge-${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-12">
          <h2 className="mb-4">Project Requests Management</h2>
          <p className="text-muted">Manage and track all project requests submitted by clients.</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or project type..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#333'
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row mb-4">
        <div className="col-md-12">
          <button
            className="btn btn-primary mr-2"
            onClick={() => {
              resetForm();
              setEditMode(false);
              setIsModalOpen(true);
            }}
          >
            <i className="fa fa-plus mr-2"></i>
            Add New Request
          </button>
          <button className="btn btn-outline-secondary mr-2">
            <i className="fa fa-download mr-2"></i>
            Export CSV
          </button>
          <button className="btn btn-outline-secondary">
            <i className="fa fa-print mr-2"></i>
            Print Report
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h4>{requests.filter(r => r.status === 'pending').length}</h4>
              <p className="mb-0">Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h4>{requests.filter(r => r.status === 'in-progress').length}</h4>
              <p className="mb-0">In Progress</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h4>{requests.filter(r => r.status === 'completed').length}</h4>
              <p className="mb-0">Completed</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h4>{requests.length}</h4>
              <p className="mb-0">Total Requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Table */}
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
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client Name</th>
                      <th>Project Type</th>
                      <th>Budget</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr key={request.id}>
                        <td>#{request.id}</td>
                        <td>
                          <div>
                            <strong>{request.name}</strong>
                            <div className="small text-muted">{request.email}</div>
                          </div>
                        </td>
                        <td>{request.projectType}</td>
                        <td>{request.budget}</td>
                        <td>
                          <select
                            className="form-control form-control-sm"
                            value={request.status}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            style={{
                              width: '120px',
                              background: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>{getPriorityBadge(request.priority)}</td>
                        <td>{new Date(request.submittedAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info mr-1"
                            onClick={() => handleViewDetails(request)}
                            title="View Details"
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-warning mr-1"
                            onClick={() => handleEdit(request)}
                            title="Edit"
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(request.id)}
                            title="Delete"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredRequests.length === 0 && (
                <div className="text-center py-5">
                  <i className="fa fa-inbox fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No project requests found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for View/Edit */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div 
              className="modal-content"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '15px'
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? 'Edit Project Request' : selectedRequest ? 'Project Request Details' : 'Add New Request'}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {editMode || !selectedRequest ? (
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Client Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email *</label>
                          <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Project Type *</label>
                          <select
                            className="form-control"
                            value={formData.projectType}
                            onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                            required
                          >
                            <option value="">Select Type</option>
                            <option value="AI Development">AI Development</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Consulting">Consulting</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Budget Range</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.budget}
                            onChange={(e) => setFormData({...formData, budget: e.target.value})}
                            placeholder="e.g., $50,000 - $100,000"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Timeline</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.timeline}
                            onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                            placeholder="e.g., 3-6 months"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Project Description</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setIsModalOpen(false);
                          resetForm();
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editMode ? 'Update' : 'Create'} Request
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h6>Client Information</h6>
                        <p><strong>Name:</strong> {selectedRequest.name}</p>
                        <p><strong>Email:</strong> {selectedRequest.email}</p>
                        <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                      </div>
                      <div className="col-md-6">
                        <h6>Project Details</h6>
                        <p><strong>Type:</strong> {selectedRequest.projectType}</p>
                        <p><strong>Budget:</strong> {selectedRequest.budget}</p>
                        <p><strong>Timeline:</strong> {selectedRequest.timeline}</p>
                        <p><strong>Status:</strong> {getStatusBadge(selectedRequest.status)}</p>
                        <p><strong>Priority:</strong> {getPriorityBadge(selectedRequest.priority)}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6>Project Description</h6>
                      <div className="card p-3">
                        {selectedRequest.description}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6>Submission Details</h6>
                      <p><strong>Submitted:</strong> {new Date(selectedRequest.submittedAt).toLocaleString()}</p>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleEdit(selectedRequest)}
                      >
                        Edit Request
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectRequests;