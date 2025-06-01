// src/MainApp.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';
import FormPage from './pages/FormPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/loginPage'; // ✅ tambahkan
import RegisterPage from './pages/registerPage'; // ✅ tambahkan
import './App.css';

function MainApp() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} /> {/* ✅ tambahkan */}
          <Route path="/register" element={<RegisterPage />} /> {/* ✅ tambahkan */}
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<FormPage />} />
          <Route path="/edit/:id" element={<FormPage />} />
          <Route path="/view/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MainApp;
