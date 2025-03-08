import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserCircle, FaLock, FaTrash, FaUpload } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post(
        "https://sproj-prototype1-1.onrender.com/api/change-password",
        { username: user.username, oldPassword: currentPassword, newPassword }
      );
      setPasswordChangeMessage(response.data.message);
      setIsEditing(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordChangeMessage(
        error.response?.data?.message || "Error changing password"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-teal-50 to-teal-70 text-gray-900 px-6 pt-20">
      <motion.div
        className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Profile</h1>

        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-300 mx-auto border-4 border-teal-500 shadow-lg mb-4">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="cursor-pointer flex justify-center items-center gap-2 text-teal-600 hover:text-teal-500">
          <FaUpload size={20} />
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>

        <div className="mt-8 text-lg">
          <p className="flex items-center justify-center gap-2 text-gray-600"><FaUserCircle /> {user.username}</p>
          <p className="flex items-center justify-center gap-2 text-gray-500"><MdEmail /> {user.email}</p>
        </div>

        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-6 px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-400 transition-all w-full"
        >
          {isEditing ? "Cancel" : "Change Password"}
        </motion.button>

        {isEditing && (
          <motion.div
            className="mt-4 bg-gray-100 p-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              type="password"
              placeholder="Current Password"
              className="w-full mb-2 px-4 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-teal-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full mb-4 px-4 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-teal-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handlePasswordChange}
              className="w-full px-4 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-400"
            >
              Save Password
            </button>
          </motion.div>
        )}
        {passwordChangeMessage && (
          <p className="mt-4 text-sm text-green-500">{passwordChangeMessage}</p>
        )}

        <motion.button
          onClick={() => setIsDeleting(!isDeleting)}
          className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-all w-full"
        >
          Delete Account <FaTrash className="inline" />
        </motion.button>

        {isDeleting && (
          <motion.div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p className="text-red-600">Are you sure? This is irreversible!</p>
            <input
              type="text"
              placeholder="Type 'delete' to confirm"
              className="w-full mt-2 px-4 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-red-500"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
            />
            <button
              onClick={() => console.log("Account deleted")}
              disabled={deleteInput.toLowerCase() !== "delete"}
              className="mt-2 w-full px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 disabled:bg-gray-400"
            >
              Confirm Deletion
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
