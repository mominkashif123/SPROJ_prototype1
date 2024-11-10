import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-dark text-white p-4 shadow-lg sticky top-0 z-50 flex justify-between items-center">
      <div className="font-bold text-lg md:text-xl">DadaCambridge</div>

      {/* Hamburger Icon */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
      >
        <FontAwesomeIcon
          icon={menuOpen ? faTimes : faBars}
          className="h-6 w-6 text-white"
        />
      </button>

      <div
        className={`flex flex-col md:flex-row md:items-center md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-dark md:bg-transparent ${
          menuOpen ? 'block' : 'hidden'
        } md:flex`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-4 text-sm md:text-base hover:text-blue-400 ${
              isActive ? 'text-blue-400' : 'text-white'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/past-papers"
          className="block py-2 px-4 text-sm md:text-base hover:text-blue-400"
        >
          Past Papers
        </NavLink>

        {user && user.username ? (
          <>
            <div className="md:hidden block py-2 px-4 text-sm text-white">
              Logged in as {user.username}
            </div>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 text-sm text-left md:text-base hover:text-blue-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/signup"
              className="block py-2 px-4 text-sm md:text-base hover:text-blue-400"
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              className="block py-2 px-4 text-sm md:text-base hover:text-blue-400"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
