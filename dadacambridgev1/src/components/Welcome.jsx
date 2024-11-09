import React from 'react';

const Welcome = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}!</h1>
      <p className="text-gray-700">You are now logged in. Enjoy using the Past Papers App!</p>
    </div>
  );
};

export default Welcome;
