import React, { useState, useEffect } from 'react';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Mock data
  const mockMessages = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      subject: 'Project Inquiry',
      message: 'I am interested in your AI services for my business. Can we schedule a call to discuss?',
      status: 'unread',
      priority: 'high',
      submittedAt: '2024-01-15 14:30:00',
      category: 'General Inquiry'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+1 234 567 8901',
      subject: 'Partnership Opportunity',
      message: 'Looking for potential partnership opportunities in the AI space.',
      status: 'read',
      priority: 'medium',
      submittedAt: '2024-01-14 10:15:00',
      category: 'Partnership'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 8902',
      subject: 'Technical Support',
      message: 'Need assistance with implementing your AI solution in our system.',
      status: 'replied',
      priority: 'high',
      submittedAt: '2024-01-13 09:45:00',
      category: 'Support'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '+1 234 567 8903',
      subject: 'Career Opportunities',
      message: 'Interested in joining your team. Please share current job openings.',
      status: 'unread',
      priority: 'low',
      submittedAt: '2024-01-12 16:20:00',
      category: 'Career'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert@example.com',
      phone: '+1 234 567 8904',
      subject: 'Quote Request',
      message: 'Need a quote for developing a custom AI chatbot.',
      status: 'read',
      priority: 'medium',
      submittedAt: '2024-01-11 11:10:00',
      category: 'Quote'
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
    setFilteredMessages(mockMessages);
  }, []);

  useEffect(() => {
    let filtered = [...messages];

    if (searchTerm) {
      filtered = filtered.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }

    setFilteredMessages(filtered);
  }, [searchTerm, statusFilter, messages]);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    // Mark as read when viewed
    if (message.status === 'unread') {
      setMessages(messages.map(msg =>
        msg.id === message.id ? { ...msg, status: 'read' } : msg
      ));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: newStatus } : msg
    ));
  };

  const handleReply = () => {
    if (replyText.trim()) {
      // In production, this would send an email
      alert(`Reply sent to ${selectedMessage.email}`);
      setMessages(messages.map(msg =>
        msg.id === selectedMessage.id ? { ...msg, status: 'replied' } : msg
      ));
      setReplyText('');
      setIsModalOpen(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      unread: { color: 'danger', text: 'Unread' },
      read: { color: 'info', text: 'Read' },
      replied: { color: 'success', text: 'Replied' },
      archived: { color: 'secondary', text: 'Archived' }
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

  const getCategoryBadge = (category) => {
    const categoryColors = {
      'General Inquiry': 'primary',
      'Support': 'info',
      'Quote': 'warning',
      'Partnership': 'success',
      'Career': 'secondary'
    };
    
    return (
      <span className={`badge badge-${categoryColors[category] || 'secondary'}`}>
        {category}
      </span>
    );
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-12">
          <h2 className="mb-4">Contact Messages Management</h2>
          <p className="text-muted">Manage and respond to all contact form submissions.</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or subject..."
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
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row mb-4">
        <div className="col-md-12">
          <button className="btn btn-outline-secondary mr-2">
            <i className="fa fa-download mr-2"></i>
            Export Messages
          </button>
          <button 
            className="btn btn-outline-secondary mr-2"
            onClick={() => {
              const unreadCount = messages.filter(m => m.status === 'unread').length;
              alert(`You have ${unreadCount} unread messages`);
            }}
          >
            <i className="fa fa-envelope mr-2"></i>
            Check Unread
          </button>
          <button className="btn btn-outline-secondary">
            <i className="fa fa-archive mr-2"></i>
            Archive All Read
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h4>{messages.filter(m => m.status === 'unread').length}</h4>
              <p className="mb-0">Unread</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h4>{messages.filter(m => m.status === 'read').length}</h4>
              <p className="mb-0">Read</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h4>{messages.filter(m => m.status === 'replied').length}</h4>
              <p className="mb-0">Replied</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-secondary text-white">
            <div className="card-body text-center">
              <h4>{messages.length}</h4>
              <p className="mb-0">Total Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Table */}
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
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>From</th>
                      <th>Subject</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Received</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMessages.map((msg) => (
                      <tr 
                        key={msg.id} 
                        className={msg.status === 'unread' ? 'table-warning' : ''}
                      >
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          <div>
                            <strong>{msg.name}</strong>
                            <div className="small text-muted">{msg.email}</div>
                          </div>
                        </td>
                        <td>
                          <div className="font-weight-bold">{msg.subject}</div>
                          <div className="small text-muted text-truncate" style={{ maxWidth: '200px' }}>
                            {msg.message.substring(0, 50)}...
                          </div>
                        </td>
                        <td>{getCategoryBadge(msg.category)}</td>
                        <td>
                          <select
                            className="form-control form-control-sm"
                            value={msg.status}
                            onChange={(e) => handleStatusChange(msg.id, e.target.value)}
                            style={{
                              width: '100px',
                              background: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td>{getPriorityBadge(msg.priority)}</td>
                        <td>{new Date(msg.submittedAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info mr-1"
                            onClick={() => handleViewMessage(msg)}
                            title="View Message"
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(msg.id)}
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

              {filteredMessages.length === 0 && (
                <div className="text-center py-5">
                  <i className="fa fa-inbox fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No messages found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Message */}
      {isModalOpen && selectedMessage && (
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
                  <i className="fa fa-envelope mr-2"></i>
                  Message Details
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Sender Information</h6>
                    <div className="card p-3">
                      <p><strong>Name:</strong> {selectedMessage.name}</p>
                      <p><strong>Email:</strong> {selectedMessage.email}</p>
                      <p><strong>Phone:</strong> {selectedMessage.phone}</p>
                      <p><strong>Status:</strong> {getStatusBadge(selectedMessage.status)}</p>
                      <p><strong>Priority:</strong> {getPriorityBadge(selectedMessage.priority)}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Message Details</h6>
                    <div className="card p-3">
                      <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                      <p><strong>Category:</strong> {getCategoryBadge(selectedMessage.category)}</p>
                      <p><strong>Received:</strong> {new Date(selectedMessage.submittedAt).toLocaleString()}</p>
                      <p><strong>Message ID:</strong> #{selectedMessage.id}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h6>Message Content</h6>
                  <div className="card p-4">
                    <p style={{ whiteSpace: 'pre-wrap' }}>{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h6>Quick Reply</h6>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  />
                  <small className="text-muted">
                    This will send an email reply to {selectedMessage.email}
                  </small>
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
                    className="btn btn-info mr-2"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedMessage.email);
                      alert('Email address copied to clipboard!');
                    }}
                  >
                    <i className="fa fa-copy mr-2"></i>
                    Copy Email
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                  >
                    <i className="fa fa-paper-plane mr-2"></i>
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;