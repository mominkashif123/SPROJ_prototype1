import React, { useState } from "react";
import axios from "axios";

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  // Handle profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/change-password",
        {
          username: user.username, // Use the username from the `user` object
          oldPassword: currentPassword,
          newPassword,
        }
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

  const handleDeleteAccountClick = () => {
    setIsDeleting(true);
    setDeleteMessage("");
    setDeleteError("");
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(intervalId);
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  // Confirm the account deletion after 5 seconds
  const handleConfirmDelete = async () => {
    if (deleteInput.toLowerCase() === "delete") {
      try {
        await axios.delete("http://localhost:4000/api/delete-account", {
          data: { username: user.username },
        });

        setDeleteMessage(
          "Account has been deleted. You will be logged out in 3 seconds."
        );
        setTimeout(() => {
          setUser(null); // Log the user out by clearing user data
          // Optionally, redirect to login page here
        }, 3000);
      } catch (error) {
        setDeleteError("Error deleting account. Please try again.");
      }
    } else {
      setDeleteError("You must type 'delete' to confirm.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 pt-20">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Your Profile
        </h1>
        <p className="text-lg text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-300 mb-4">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="px-4 py-2 text-sm font-medium text-teal-500 rounded-md cursor-pointer"
        />
        <p className="mt-2 text-sm text-gray-600">Update Profile Picture</p>
      </div>

      {/* Account Details */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-lg font-semibold text-gray-800">Username</p>
            <p className="text-gray-700">{user.username}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Email</p>
            <p className="text-gray-700">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
        >
          {isEditing ? "Cancel" : "Change Password"}
        </button>

        {isEditing && (
          <div className="space-y-4 mt-4">
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Save Password
            </button>
          </div>
        )}
        {passwordChangeMessage && (
          <div className="message mt-4 p-4 text-center rounded-md">
            {passwordChangeMessage}
          </div>
        )}
      </div>

      {/* Delete Account Section */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <button
          onClick={handleDeleteAccountClick}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete Account
        </button>
        {/* Delete confirmation logic */}
        {isDeleting && (
          <div className="mt-4">
            <p className="text-sm text-red-600">
              Are you sure you want to delete your account?
            </p>
            <p className="text-sm text-gray-500">
              This action is irreversible.
            </p>
            <p className="text-sm text-gray-500">
              Time remaining: {countdown}s
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder="Type 'delete' to confirm"
              className="mt-2 w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleConfirmDelete}
              disabled={countdown > 0 || deleteInput.toLowerCase() !== "delete"}
              className="mt-2 w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
            >
              Confirm Deletion
            </button>
            {deleteError && (
              <p className="text-sm text-red-600 mt-2">{deleteError}</p>
            )}
          </div>
        )}
        {deleteMessage && (
          <p className="text-sm text-green-600 mt-2">{deleteMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
