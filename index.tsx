
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { clearAllAppData } from './services/apiKey';

// Soporte para cierre automático vía query (?logout)
if (window.location.search.includes('logout')) {
  try { clearAllAppData(); } catch {}
  const cleanUrl = window.location.origin + window.location.pathname + window.location.hash;
  window.history.replaceState({}, '', cleanUrl);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
