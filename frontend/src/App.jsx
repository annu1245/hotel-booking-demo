import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import BookHotel from './pages/BookHotel';
import Checkin from './pages/Checkin';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <span className="text-white font-semibold text-xl">Hotel App</span>
              <NavigationLinks />
            </div>
          </nav>
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/book-hotel" element={<BookHotel />} />
              <Route path="/checkin" element={<Checkin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

function NavigationLinks() {
  const { user } = useAuth();

  return (
    <ul className="flex space-x-4 text-white">
      {user ? (
        <>
          <li>
            <Link to="/logout" className="hover:text-gray-300">
              Logout
            </Link>
          </li>
          <li>
            <Link to="/book-hotel" className="hover:text-gray-300">
              Book Hotel
            </Link>
          </li>
          <li>
            <Link to="/checkin" className="hover:text-gray-300">
              Check-in
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default App;