import React from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import {
  FaApple,
  FaShoppingCart,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export default function Navbar({ setModal, cart, darkMode, toggleTheme }) {
  const { t, i18n } = useTranslation();

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full text-black dark:text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <FaApple className="text-4xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300">
                {t("appleStore")}
              </h1>

              <p className="text-xs text-gray-400 dark:text-gray-500">
                {t("premiumTechnology")}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                }`
              }
            >
              {t("home")}
            </NavLink>

            <NavLink
              to="/katalog"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                }`
              }
            >
              {t("katalog")}
            </NavLink>

            <NavLink
              to="/aloqa"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                }`
              }
            >
              {t("contactTitle")}
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110 transition-all duration-300"
            >
              <FaShoppingCart />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setModal(true)}
              className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110 transition-all duration-300"
            >
              <FaUserCircle className="text-2xl" />
            </button>

            <button
              onClick={toggleTheme}
              className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-300 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110 transition-all duration-300"
            >
              {darkMode ? (
                <FaSun className="text-lg" />
              ) : (
                <FaMoon className="text-lg" />
              )}
            </button>

            <div className="w-px h-7 bg-gray-200 dark:bg-gray-700 mx-2" />

            <button
              onClick={() => i18n.changeLanguage("en")}
              className={`px-3 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                i18n.language === "en"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => i18n.changeLanguage("uz")}
              className={`px-3 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                i18n.language === "uz"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              UZ
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}