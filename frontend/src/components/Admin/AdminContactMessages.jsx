import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AdminNavigation from '../AdminNavigation';
import Copyright from '../Copyright';
import Footer from '../Footer';
import ThreeJSParticles from '../ThreeJSParticles';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

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

    setMessages(mockMessages);
    setFilteredMessages(mockMessages);
    
    return () => {
      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [location]);

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
    <div id="colorlib-page">
      <ThreeJSParticles />
      <Helmet>
        <title>InfiniteWaveX - Admin Contact Messages</title>
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

          .admin-messages-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
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
          }

          .message-row-unread {
            background-color: rgba(255, 193, 7, 0.1) !important;
            border-left: 4px solid #ffc107;
          }

          .message-row-replied {
            background-color: rgba(40, 167, 69, 0.1) !important;
            border-left: 4px solid #28a745;
          }

          .message-row-archived {
            background-color: rgba(108, 117, 125, 0.1) !important;
            border-left: 4px solid #6c757d;
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .modal-content {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 15px;
            padding: 30px;
            max-width: 800px;
            width: 90%;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          }

          .message-detail-card {
            background: rgba(248, 249, 250, 0.8);
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }

          .message-content {
            background: white;
            border-radius: 10px;
            padding: 20px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            white-space: pre-wrap;
            word-wrap: break-word;
          }

          .admin-action-btn {
            transition: all 0.3s ease;
            border-radius: 8px;
          }

          .admin-action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          @media (max-width: 768px) {
            .hero-wrap.js-fullheight {
              padding-top: 20px;
            }
            #colorlib-aside {
              padding-top: 20px;
            }
            .admin-messages-card {
              padding: 15px;
            }
            .admin-stats-card {
              padding: 15px;
            }
            .modal-content {
              padding: 20px;
              width: 95%;
            }
          }
          
          @media (max-width: 480px) {
            .hero-wrap.js-fullheight {
              padding-top: 10px;
            }
            .admin-stats-card h4 {
              font-size: 1.5rem;
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
        <div className="hero-wrap js-fullheight" style={{backgroundImage: "url(/images/adminContact_bg.jpg)"}} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="js-fullheight d-flex justify-content-center align-items-center">
            <div className="col-md-8 text text-center">
              <div className="desc">
                <h2 className="subheading">Admin Panel</h2>
                <h1 className="mb-4">Contact Messages Management</h1>
                <p className="mb-4">
                  Manage and respond to all contact form submissions from your website visitors and clients.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            {/* Stats Summary */}
            <div className="row mb-5">
              <div className="col-md-3 mb-4">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #dc3545, #ff6b6b)'}}>
                  <div className="text-center">
                    <h4>{messages.filter(m => m.status === 'unread').length}</h4>
                    <p className="mb-0">Unread</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #17a2b8, #4dc0b5)'}}>
                  <div className="text-center">
                    <h4>{messages.filter(m => m.status === 'read').length}</h4>
                    <p className="mb-0">Read</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #28a745, #20c997)'}}>
                  <div className="text-center">
                    <h4>{messages.filter(m => m.status === 'replied').length}</h4>
                    <p className="mb-0">Replied</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="admin-stats-card" style={{background: 'linear-gradient(45deg, #6c757d, #adb5bd)'}}>
                  <div className="text-center">
                    <h4>{messages.length}</h4>
                    <p className="mb-0">Total Messages</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="row mb-4">
              <div className="col-md-12">
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <button className="btn btn-outline-primary admin-action-btn">
                    <i className="fa fa-download mr-2"></i>
                    Export Messages
                  </button>
                  <button 
                    className="btn btn-outline-warning admin-action-btn"
                    onClick={() => {
                      const unreadCount = messages.filter(m => m.status === 'unread').length;
                      alert(`You have ${unreadCount} unread messages`);
                    }}
                  >
                    <i className="fa fa-envelope mr-2"></i>
                    Check Unread
                  </button>
                  <button className="btn btn-outline-secondary admin-action-btn">
                    <i className="fa fa-archive mr-2"></i>
                    Archive All Read
                  </button>
                  <button className="btn btn-outline-danger admin-action-btn">
                    <i className="fa fa-trash mr-2"></i>
                    Delete Selected
                  </button>
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
                    placeholder="Search by name, email, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Messages Table */}
            <div className="row">
              <div className="col-md-12">
                <div className="admin-messages-card">
                  <h4 className="mb-3">Contact Messages</h4>
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
                            className={`message-row-${msg.status}`}
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
                                style={{ width: '100px' }}
                              >
                                <option value="unread">Unread</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>
                            <td>{getPriorityBadge(msg.priority)}</td>
                            <td className="text-muted">{new Date(msg.submittedAt).toLocaleDateString()}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <button
                                  className="btn btn-sm btn-info"
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
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredMessages.length === 0 && (
                    <div className="text-center py-5">
                      <i className="fa fa-inbox fa-3x text-muted mb-3"></i>
                      <p className="text-muted">No messages found matching your filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for Viewing Message */}
      {isModalOpen && selectedMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title">
                <i className="fa fa-envelope mr-2 text-primary"></i>
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
                  <div className="message-detail-card">
                    <h6 className="border-bottom pb-2 mb-3">
                      <i className="fa fa-user mr-2"></i>
                      Sender Information
                    </h6>
                    <div className="row">
                      <div className="col-6 mb-2">
                        <small className="text-muted">Name</small>
                        <div><strong>{selectedMessage.name}</strong></div>
                      </div>
                      <div className="col-6 mb-2">
                        <small className="text-muted">Status</small>
                        <div>{getStatusBadge(selectedMessage.status)}</div>
                      </div>
                      <div className="col-6 mb-2">
                        <small className="text-muted">Email</small>
                        <div>{selectedMessage.email}</div>
                      </div>
                      <div className="col-6 mb-2">
                        <small className="text-muted">Priority</small>
                        <div>{getPriorityBadge(selectedMessage.priority)}</div>
                      </div>
                      <div className="col-6 mb-2">
                        <small className="text-muted">Phone</small>
                        <div>{selectedMessage.phone}</div>
                      </div>
                      <div className="col-6 mb-2">
                        <small className="text-muted">Category</small>
                        <div>{getCategoryBadge(selectedMessage.category)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="message-detail-card">
                    <h6 className="border-bottom pb-2 mb-3">
                      <i className="fa fa-info-circle mr-2"></i>
                      Message Details
                    </h6>
                    <div className="row">
                      <div className="col-12 mb-2">
                        <small className="text-muted">Subject</small>
                        <div><strong>{selectedMessage.subject}</strong></div>
                      </div>
                      <div className="col-6 mb-2">
                        <small className="text-muted">Received</small>
                        <div>{new Date(selectedMessage.submittedAt).toLocaleString()}</div>
                      </div>
                      <div className="col-6 mb-2">
                        <small className="text-muted">Message ID</small>
                        <div className="text-primary">#{selectedMessage.id}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="border-bottom pb-2 mb-3">
                  <i className="fa fa-file-text mr-2"></i>
                  Message Content
                </h6>
                <div className="message-content">
                  <p>{selectedMessage.message}</p>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="border-bottom pb-2 mb-3">
                  <i className="fa fa-reply mr-2"></i>
                  Quick Reply
                </h6>
                <textarea
                  className="form-control mb-2"
                  rows="4"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <small className="text-muted">
                  This will send an email reply to <strong>{selectedMessage.email}</strong>
                </small>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedMessage.email);
                      alert('Email address copied to clipboard!');
                    }}
                  >
                    <i className="fa fa-copy mr-2"></i>
                    Copy Email
                  </button>
                </div>
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
      )}

      <div id="ftco-loader" className="show fullscreen">
        <svg className="circular" width="48px" height="48px">
          <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/>
          <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/>
        </svg>
      </div>
    </div>
  );
};

export default AdminContactMessages;