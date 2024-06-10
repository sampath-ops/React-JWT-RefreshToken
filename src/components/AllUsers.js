import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users/getAllUsers");
        const responseData = response.data;
        setUsers(responseData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosPrivate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">User List</h2>
      <ul className="bg-white rounded-lg shadow-lg p-6">
        {users.map((user) => (
          <li key={user._id} className="border-b border-gray-200 py-4">
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
