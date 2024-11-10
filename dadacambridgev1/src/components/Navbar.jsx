import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white flex items-center p-4">
      <div className="mr-10 font-bold text-lg">Past Papers App</div>

      {/* Navigation Links */}
      <div className="flex space-x-6 relative">
        <NavLink to="/" className={({ isActive }) => `hover:text-red-500 ${isActive ? "text-red-500" : "text-white"}`}>
          Home
        </NavLink>

        {/* Past Papers Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {/* Link to /past-papers */}
          <NavLink
            to="/past-papers"
            className="cursor-pointer hover:text-red-500"
          >
            Past Papers
          </NavLink>

          {showDropdown && (
            <div className="absolute top-full mt-1 bg-white text-black rounded shadow-lg w-48">
              {/* Yearly Past Papers Option with Submenu */}
              <div className="relative group">
                <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Yearly Past Papers
                </div>

                {/* Submenu for Levels */}
                <div className="absolute left-full top-0 mt-0 bg-white text-black rounded shadow-lg hidden group-hover:block">
                  <NavLink
                    to="/past-papers/yearly/o-level"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    O Level
                  </NavLink>
                  <NavLink
                    to="/past-papers/yearly/a-level"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    A Level
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {user && user.username ? (
          <>
            <span className="text-white">Logged in as {user.username}</span>
            <button onClick={handleLogout} className="hover:text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signup" className="hover:text-red-500">Sign Up</NavLink>
            <NavLink to="/login" className="hover:text-red-500">Login</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
