import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/admin/users", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
    <Navbar />  
     <div className="min-h-screen w-full p-8 bg-white relative overflow-hidden">
      {/* Subtle grid-like background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h40v1H0zM0 0v40h1V0z%22 fill=%22%23bfdbfe%22 fill-opacity=%220.1%22/%3E%3C/svg%3E')] opacity-10"></div>
      
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-8 relative z-10">
        Smart Grid User Dashboard
      </h2>

      {loading ? (
        <div className="text-center py-12 text-blue-500 animate-pulse">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16M8 4v16M12 4v16M16 4v16M20 4v16" />
          </svg>
          <span className="text-lg">Loading Users...</span>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
          </svg>
          <span className="text-lg">No users found in the grid.</span>
        </div>
      ) : (
        <div className="w-full relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-green-100 text-gray-800">
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Name</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Email</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Last Login</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Profile</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200">
                    <td className="py-4 px-6 text-gray-700">{u.name}</td>
                    <td className="py-4 px-6 text-gray-700">{u.email}</td>
                    <td className="py-4 px-6 text-gray-700">
                      {u.last_login
                        ? new Date(u.last_login).toLocaleString()
                        : "Never"}
                    </td>
                    <td className="py-4 px-6">
                      {u.picture && (
                        <img
                          src={u.picture}
                          alt="profile"
                          className="w-10 h-10 rounded-full inline border-2 border-blue-500"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </>
   
  );
};

export default UserList;