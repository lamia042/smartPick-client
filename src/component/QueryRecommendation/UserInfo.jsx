// components/UserInfo.jsx
import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center mb-6">
      <img
        src={user.profileImage}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover mr-4"
      />
      <div>
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
