import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './components/landingpage';
import Login from './components/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
