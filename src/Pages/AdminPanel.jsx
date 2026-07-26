import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminPanel() {
  return (
    <div className="min-h-screen flex bg-gray-100">
     
      <aside className="w-64 bg-gray-900 text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          Admin Panel
        </h1>

        <nav>
          <ul className="space-y-3">

            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `block p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                📊 Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `block p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                📦 Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `block p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                🛒 Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `block p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                👤 Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  `block p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                ⚙️ Settings
              </NavLink>
            </li>

          </ul>
        </nav>

      </aside>

   
      <main className="flex-1">

       
        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            Admin Dashboard
          </h2>

          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Admin
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
}