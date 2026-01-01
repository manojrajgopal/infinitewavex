import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import { AdminAuthProvider } from './components/Admin/AdminAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </HashRouter>
  </HelmetProvider>
);

reportWebVitals();