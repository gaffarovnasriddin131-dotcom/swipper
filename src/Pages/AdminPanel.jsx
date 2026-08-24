import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaChartPie,
  FaBox,
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminPanel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("isAdmin");
    navigate("/");
  }

  const links = [
    { to: "/admin", end: true, icon: <FaChartPie />, label: t("dashboard") },
    { to: "/admin/products", icon: <FaBox />, label: t("productsLabel") },
    { to: "/admin/orders", icon: <FaShoppingCart />, label: t("orders") },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950">

      {/* DESKTOP SIDEBAR */}

      <aside className="hidden md:flex md:flex-col w-64 bg-gray-900 dark:bg-black text-white p-6 admin-fade-in">

        <h1 className="text-2xl font-bold mb-10 flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-white text-gray-900 flex items-center justify-center text-sm">
            A
          </span>
          {t("adminPanel")}
        </h1>

        <nav className="flex-1">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-white text-gray-900 shadow-lg"
                        : "text-gray-300 hover:bg-white/10 hover:translate-x-1"
                    }`
                  }
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
        >
          <FaSignOutAlt />
          {t("logout")}
        </button>

      </aside>

      {/* MOBIL SIDEBAR */}

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            style={{ animation: "fadeIn 0.3s ease-out" }}
          />

          <aside
            className="relative w-64 bg-gray-900 text-white p-6 flex flex-col"
            style={{ animation: "slideIn 0.3s ease-out" }}
          >

            <div className="flex items-center justify-between mb-10">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-white text-gray-900 flex items-center justify-center text-sm">
                  A
                </span>
                {t("adminPanel")}
              </h1>

              <button onClick={() => setMenuOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-white text-gray-900"
                            : "text-gray-300 hover:bg-white/10"
                        }`
                      }
                    >
                      <span className="text-lg">{link.icon}</span>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
            >
              <FaSignOutAlt />
              {t("logout")}
            </button>

          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0">

        <header className="bg-white dark:bg-gray-900 shadow-sm px-5 sm:px-8 py-5 flex justify-between items-center sticky top-0 z-30 transition-colors duration-300">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center"
            >
              <FaBars />
            </button>

            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t("adminDashboard")}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg font-semibold">
              {t("admin")}
            </div>

            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 bg-red-50 dark:bg-red-950 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <FaSignOutAlt />
              {t("logout")}
            </button>
          </div>
        </header>

        <div className="p-5 sm:p-8 admin-fade-in-content">
          <Outlet />
        </div>

      </main>

      <style>{`

        .admin-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        .admin-fade-in-content {
          animation: contentUp 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes contentUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

      `}</style>

    </div>
  );
}