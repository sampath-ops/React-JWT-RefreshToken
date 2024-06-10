import React from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl max-xl:text-lg font-bold mb-4">Profile</h1>
      <div className="bg-white p-8 rounded border border-gray-600">
        <div className="mb-4 grid grid-cols-2 gap-2 justify-center items-center">
          <label className="block text-gray-700 text-sm font-bold">
            Email :
          </label>
          <p className="text-gray-800 text-start">{auth.email}</p>
          <label className="block text-gray-700 text-sm font-bold">
            Role :
          </label>
          <p className="text-gray-800 text-start">{auth.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
