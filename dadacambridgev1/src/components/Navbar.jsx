import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsMenuOpen(false);
    setMessage("You have been logged out!");
    setIsModalVisible(true);

    setTimeout(() => {
      setIsModalVisible(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <header className="bg-white z-50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Logo" className="w-10 h-auto" />
              <span className="ml-2 text-xl font-bold text-gray-800 text-nowrap sm:text-xl text-sm max-[400px]:text-base">
                DadaCambridge
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden lg:flex items-center gap-8">
              <NavLink to="/" className={({ isActive }) => isActive ? "text-teal-500 border-b-2 border-teal-500 text-sm font-medium" : "text-gray-700 hover:text-teal-500 text-sm font-medium"}>
                Home
              </NavLink>
              <NavLink to="/practice-online" className={({ isActive }) => isActive ? "text-teal-500 border-b-2 border-teal-500 text-sm font-medium" : "text-gray-700 hover:text-teal-500 text-sm font-medium"}>
                Practice Online
              </NavLink>
              <NavLink to="/past-papers" className={({ isActive }) => isActive ? "text-teal-500 border-b-2 border-teal-500 text-sm font-medium" : "text-gray-700 hover:text-teal-500 text-sm font-medium"}>
                Yearly Past Papers
              </NavLink>
              <NavLink to="/topical-papers" className={({ isActive }) => isActive ? "text-teal-500 border-b-2 border-teal-500 text-sm font-medium" : "text-gray-700 hover:text-teal-500 text-sm font-medium"}>
                Topical Papers
              </NavLink>
              <NavLink to="/expected-exam" className={({ isActive }) => isActive ? "text-teal-500 border-b-2 border-teal-500 text-sm font-medium" : "text-gray-700 hover:text-teal-500 text-sm font-medium"}>
                Expected Exam
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => isActive ? "text-teal-500 border-b-2 border-teal-500 text-sm font-medium" : "text-gray-700 hover:text-teal-500 text-sm font-medium"}>
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1.5 text-sm font-medium text-white bg-teal-500 rounded-lg shadow-sm hover:bg-teal-600 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          {/* Right side buttons */}
          <div className="flex items-center gap-4 lg:gap-2">
            {!user ? (
              <>
                <NavLink to="/login" className={({ isActive }) =>
                  `px-3 py-1.5 text-sm font-medium max-[400px]:px-2 max-[400px]:py-1 ${
                    isActive
                      ? "text-teal-500 border-b-2 border-teal-500"
                      : "text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  }`
                }>
                  Login
                </NavLink>
                <NavLink to="/signup" className={({ isActive }) =>
                  `px-3 py-1.5 text-sm font-medium max-[400px]:px-2 max-[400px]:py-1 ${
                    isActive
                      ? "text-white bg-teal-500 border-b-2 border-teal-500"
                      : "text-white bg-teal-500 rounded-lg shadow-sm hover:bg-teal-600 transition-colors"
                  }`
                }>
                  Signup
                </NavLink>
              </>
            ) : (
              // Mobile menu toggle (hamburger)
              <div className="relative block lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Mobile dropdown menu */}
                {isMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4 z-50">
                    <NavLink to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Home
                    </NavLink>
                    <NavLink to="/practice-online" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Practice Online
                    </NavLink>
                    <NavLink to="/past-papers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Yearly Past Papers
                    </NavLink>
                    <NavLink to="/topical-papers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Topical Papers
                    </NavLink>
                    <NavLink to="/expected-exam" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Expected Exam
                    </NavLink>
                    <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Profile
                    </NavLink>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
