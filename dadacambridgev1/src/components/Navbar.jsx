// frontend/components/Navbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null); 
    navigate('/'); 
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Past Papers", path: "/past-papers" },
  ];

  return (
    <nav className="bg-black text-white flex items-center p-4">
      <div className="mr-10 font-bold text-lg">Past Papers App</div>
      <div className="flex space-x-6">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) => `hover:text-red-500 ${isActive ? "text-red-500" : "text-white"}`}
          >
            {link.name}
          </NavLink>
        ))}
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
