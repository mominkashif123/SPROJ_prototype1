import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-50 flex justify-between py-8">
        <div className="relative z-10 flex items-center gap-16">
          {/* Logo */}
          <a aria-label="Home" href="/" className="flex items-center">
            <svg viewBox="0 0 40 40" aria-hidden="true" width="40" height="40" className="fill-cyan-500">
              <path fillRule="evenodd" clipRule="evenodd" d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"></path>
            </svg>
            <span className="ml-2 font-bold text-lg">DadaCambridge</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden lg:flex lg:gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm transition-colors delay-150 hover:text-gray-900 ${
                  isActive ? 'text-gray-900' : 'text-gray-700'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/past-papers"
              className={({ isActive }) =>
                `relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm transition-colors delay-150 hover:text-gray-900 ${
                  isActive ? 'text-gray-900' : 'text-gray-700'
                }`
              }
            >
              Past Papers
            </NavLink>
          </div>
        </div>

        {/* Right Side (User Info & Auth Links) */}
        <div className="hidden lg:flex items-center gap-6">
          {user && user.username ? (
            <>
              <span className="text-gray-700">Logged in as {user.username}</span>
              <button
                onClick={handleLogout}
                className="inline-flex justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors bg-gray-800 text-white hover:bg-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="inline-flex justify-center rounded-lg border py-2 px-4 text-sm transition-colors border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold transition-colors bg-gray-800 text-white hover:bg-gray-900"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-10 -m-2 inline-flex items-center rounded-lg p-2 hover:bg-gray-200/50"
            aria-label="Toggle site navigation"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
              <path d="M5 6h14M5 18h14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 right-4 bg-white shadow-lg rounded-lg p-4 w-48 z-20">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Home
            </NavLink>
            <NavLink
              to="/past-papers"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Past Papers
            </NavLink>
            {user && user.username ? (
              <>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
