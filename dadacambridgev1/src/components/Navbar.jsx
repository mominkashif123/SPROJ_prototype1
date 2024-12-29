import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust the path as needed

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
    <header className="bg-white shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center">
            <img src={logo} alt="DadaCambridge Logo" className="w-10 h-auto" />
            <span className="ml-2 text-xl font-bold text-gray-800 tracking-wide">
              DadaCambridge
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-teal-500" : "text-gray-700 hover:text-teal-500"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/practice-online"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-teal-500" : "text-gray-700 hover:text-teal-500"
              }`
            }
          >
            Practice Online
          </NavLink>
          <NavLink
            to="/past-papers"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-teal-500" : "text-gray-700 hover:text-teal-500"
              }`
            }
          >
            Past Papers
          </NavLink>
          <NavLink
            to="/expected-exam"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-teal-500" : "text-gray-700 hover:text-teal-500"
              }`
            }
          >
            Expected Exam
          </NavLink>
          
          {user ? (
            <>
              <NavLink
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:text-teal-500"
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition-colors"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 lg:hidden">
            <NavLink
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/practice-online"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Practice Online
            </NavLink>
            <NavLink
              to="/past-papers"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Past Papers
            </NavLink>
            <NavLink
              to="/expected-exam"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Expected Exam
            </NavLink>
            {user?.role === "admin" && (
              <NavLink
                to="/upload"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Upload
              </NavLink>
            )}
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="block px-6 py-2 text-sm text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
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
