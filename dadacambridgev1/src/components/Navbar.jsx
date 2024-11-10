import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-dark text-white flex items-center p-4 shadow-lg sticky top-0 z-50">
      <div className="mr-10 font-bold text-lg">Past Papers App</div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-white'}`
          }
        >
          Home
        </NavLink>

        {/* Past Papers Link (Without Dropdown) */}
        <NavLink
          to="/past-papers"
          className="hover:text-blue-400 cursor-pointer"
        >
          Past Papers
        </NavLink>
      </div>

      {/* Right Side (User Info & Auth Links) */}
      <div className="ml-auto flex items-center space-x-4">
        {user && user.username ? (
          <>
            <span className="text-white">Logged in as {user.username}</span>
            <button
              onClick={handleLogout}
              className="hover:text-blue-400 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signup" className="hover:text-blue-400 transition duration-200">
              Sign Up
            </NavLink>
            <NavLink to="/login" className="hover:text-blue-400 transition duration-200">
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
