import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);

    setMessage("You have been logged out!");
    setIsModalVisible(true);

    setTimeout(() => {
      setIsModalVisible(false); // Close the modal after delay
    }, 1000);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <nav className="bg-dark text-white flex items-center p-4 shadow-lg sticky top-0 z-50">
        <div className="mr-10 font-bold text-lg">Past Papers App</div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? "text-blue-400" : "text-white"}`
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
              <NavLink
                to="/signup"
                className="hover:text-blue-400 transition duration-200"
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className="hover:text-blue-400 transition duration-200"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-64">
            <p>{message}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

export default Navbar;
