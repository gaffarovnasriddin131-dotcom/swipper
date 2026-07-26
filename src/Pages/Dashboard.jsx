import React from "react";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div>
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold">
          👋 Welcome Back, Admin
        </h1>

        <p className="mt-2 text-lg">
          Manage your Apple Store quickly and easily.
        </p>
      </div>

     
      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <FaBox className="text-blue-600 text-4xl mb-3" />
          <h2 className="text-gray-500">Products</h2>
          <p className="text-3xl font-bold">120</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <FaShoppingCart className="text-green-600 text-4xl mb-3" />
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-3xl font-bold">80</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <FaUsers className="text-purple-600 text-4xl mb-3" />
          <h2 className="text-gray-500">Users</h2>
          <p className="text-3xl font-bold">560</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <FaDollarSign className="text-yellow-500 text-4xl mb-3" />
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold">$5,000</p>
        </div>

      </div>

    
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          📋 Recent Orders
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">
              <td className="p-3">Ali</td>
              <td className="p-3">iPhone 17 Pro Max</td>
              <td className="p-3">$1500</td>
              <td className="p-3 text-green-600 font-bold">
                Completed
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-3">Vali</td>
              <td className="p-3">MacBook Pro</td>
              <td className="p-3">$2000</td>
              <td className="p-3 text-yellow-500 font-bold">
                Pending
              </td>
            </tr>

            <tr>
              <td className="p-3">Hasan</td>
              <td className="p-3">iPad Pro</td>
              <td className="p-3">$1200</td>
              <td className="p-3 text-red-500 font-bold">
                Cancelled
              </td>
            </tr>

          </tbody>

        </table>

      </div>

     
      <div className="grid grid-cols-4 gap-5">

        <button className="bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition">
          ➕ Add Product
        </button>

        <button className="bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition">
          🛒 View Orders
        </button>

        <button className="bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition">
          👥 Manage Users
        </button>

        <button className="bg-gray-800 text-white py-4 rounded-xl hover:bg-black transition">
          ⚙️ Settings
        </button>

      </div>
    </div>
  );
}