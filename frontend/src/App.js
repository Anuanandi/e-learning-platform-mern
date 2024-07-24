import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Courses from './components/Courses';
import Login from './components/Login';
import Register from './components/Register';
import CourseDetail from './components/CourseDetail';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Courses />
            </PrivateRoute>
          } />
          <Route path="/courses/:id" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CourseDetail />
            </PrivateRoute>
          } />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/courses" /> : <Login onLogin={login} />
          } />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;