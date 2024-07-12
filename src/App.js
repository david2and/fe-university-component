import React from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage  />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/data" element={<MainPage />} />
        <Route path="/" element={<LoginPage  />} />
      </Routes>
    </Router>
  );
}

export default App;