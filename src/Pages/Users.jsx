import React from "react";

export default function Users() {
  const users = [
    {
      id: 1,
      name: "Ali Valiyev",
      email: "ali@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Hasan Karimov",
      email: "hasan@gmail.com",
      role: "User",
    },
    {
      id: 3,
      name: "Olim Toshmatov",
      email: "olim@gmail.com",
      role: "User",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id} className="border-t">

                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      user.role === "Admin"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4">

                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}