// src/components/Admin/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ThreeJSParticles from '../ThreeJSParticles';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }

    if (window.AOS) window.AOS.init();
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

    return () => {
      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation - in production, connect to backend
    if (email === 'admin@infinitewavex.com' && password === 'Admin@123') {
      // Simulate API call
      setTimeout(() => {
        const token = 'admin_' + Date.now();
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminEmail', email);
        navigate('/admin/dashboard');
      }, 1000);
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div id="colorlib-page" style={{ minHeight: '100vh' }}>
      <ThreeJSParticles />
      <Helmet>
        <title>InfiniteWaveX - Admin Login</title>
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
        
        <style>
          {`
            .admin-login-container {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            
            .login-card {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
              border: 1px solid rgba(255, 255, 255, 0.3);
              width: 100%;
              max-width: 450px;
              position: relative;
              z-index: 10;
            }
            
            .login-header {
              text-align: center;
              margin-bottom: 30px;
            }
            
            .login-logo {
              width: 80px;
              height: 80px;
              margin: 0 auto 20px;
              background-image: url('/images/logo.png');
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
            }
            
            .login-title {
              font-size: 24px;
              font-weight: 600;
              color: #333;
              margin-bottom: 5px;
            }
            
            .login-subtitle {
              color: #666;
              font-size: 14px;
            }
            
            .form-group {
              margin-bottom: 20px;
            }
            
            .form-control {
              height: 50px;
              border-radius: 8px;
              border: 1px solid #ddd;
              padding: 0 15px;
              font-size: 14px;
              transition: all 0.3s;
            }
            
            .form-control:focus {
              border-color: #007bff;
              box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
            }
            
            .btn-login {
              width: 100%;
              height: 50px;
              background: linear-gradient(45deg, #007bff, #0056b3);
              border: none;
              border-radius: 8px;
              color: white;
              font-weight: 600;
              font-size: 16px;
              cursor: pointer;
              transition: all 0.3s;
            }
            
            .btn-login:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
            }
            
            .btn-login:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }
            
            .error-message {
              color: #dc3545;
              font-size: 14px;
              margin-top: 10px;
              text-align: center;
            }
            
            .back-to-home {
              text-align: center;
              margin-top: 20px;
            }
            
            .back-to-home a {
              color: #007bff;
              text-decoration: none;
              font-size: 14px;
            }
            
            .back-to-home a:hover {
              text-decoration: underline;
            }
            
            @media (max-width: 768px) {
              .login-card {
                padding: 30px 20px;
                margin: 20px;
              }
            }
          `}
        </style>
      </Helmet>

      <div className="admin-login-container">
        <div className="login-card ftco-animate">
          <div className="login-header">
            <div className="login-logo"></div>
            <h2 className="login-title">Admin Dashboard</h2>
            <p className="login-subtitle">InfiniteWaveX Management System</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && (
              <div className="error-message">
                <i className="fa fa-exclamation-circle"></i> {error}
              </div>
            )}
            
            <div className="form-group">
              <button 
                type="submit" 
                className="btn-login"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                    Signing In...
                  </>
                ) : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="back-to-home">
            <Link to="/">← Back to Home</Link>
          </div>
          
          <div className="mt-4 text-center" style={{ fontSize: '12px', color: '#999' }}>
            <p>Default credentials: admin@infinitewavex.com / Admin@123</p>
          </div>
        </div>
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

export default AdminLogin;