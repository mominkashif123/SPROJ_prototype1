import React, { useState } from 'react';

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState(user.username);

  // Handle profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // Handle password change
  const handlePasswordChange = () => {
    // Here, you would typically call an API to update the password in the backend.
    alert('Password updated successfully!');
    setIsEditing(false);
    setNewPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 pt-20">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Your Profile</h1>
        <p className="text-lg text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-300 mb-4">
          <img
            src={profilePicture || 'https://via.placeholder.com/150'}
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
      </div>

      {/* User Information */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-lg font-semibold text-gray-800">Username</p>
            <p className="text-gray-700">{username}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {/* Edit Password Section */}
        {isEditing && (
          <div className="mb-6">
            <label htmlFor="new-password" className="block text-sm font-semibold text-gray-800 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handlePasswordChange}
              className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Save Password
            </button>
          </div>
        )}
      </div>

      {/* Other Options */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg font-semibold text-gray-800 mb-4">Other Settings</p>
        <div className="space-y-4">
          <button
            onClick={() => alert('Coming soon!')}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Change Email
          </button>
          <button
            onClick={() => alert('Coming soon!')}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Update Profile Info
          </button>
          <button
            onClick={() => alert('Coming soon!')}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
