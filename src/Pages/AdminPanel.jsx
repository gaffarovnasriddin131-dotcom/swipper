import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminPanel() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex bg-gray-100">
     
      <aside className="w-64 bg-gray-900 text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          {t("adminPanel")}
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
                📊 {t("dashboard")}
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
                📦 {t("products")}
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
                🛒 {t("orders")}
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
                👤 {t("users")}
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
                ⚙️ {t("settings")}
              </NavLink>
            </li>

          </ul>
        </nav>

      </aside>

   
      <main className="flex-1">

       
        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            {t("adminDashboard")}
          </h2>

          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            {t("admin")}
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
}