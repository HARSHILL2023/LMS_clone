import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './components/landingpage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<Dashboard role="Student" />} />
        <Route path="/student/attendance" element={<Attendance role="Student" />} />
        
        {/* Admin/Mentor Routes */}
        <Route path="/admin/dashboard" element={<Dashboard role="Admin" />} />
        <Route path="/admin/attendance" element={<Attendance role="Admin" />} />
        
        {/* Fallback */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
};

export default App;
