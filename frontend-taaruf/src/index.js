import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './mainApp';
import './index.css'; // ✅ Import styling global

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
