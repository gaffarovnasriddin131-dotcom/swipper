import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import {
  FaApple,
  FaShoppingCart,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar({
  setModal,
  cart,
  darkMode,
  toggleTheme,
}) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const linkClass = ({ isActive }) =>
    `px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-black dark:bg-white text-white dark:text-black"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block w-full text-center px-5 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
      isActive
        ? "bg-black dark:bg-white text-white dark:text-black"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-20 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full text-black dark:text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <FaApple className="text-3xl sm:text-4xl" />
            </div>

            <div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300">
                {t("appleStore")}
              </h1>

              <p className="hidden sm:block text-xs text-gray-400 dark:text-gray-500">
                {t("premiumTechnology")}
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2">

            <NavLink to="/" className={linkClass}>
              {t("home")}
            </NavLink>

            <NavLink to="/katalog" className={linkClass}>
              {t("katalog")}
            </NavLink>

            <NavLink to="/about" className={linkClass}>
              {t("about")}
            </NavLink>

            <NavLink to="/aloqa" className={linkClass}>
              {t("contactTitle")}
            </NavLink>

          </div>

          <div className="flex items-center gap-1 sm:gap-2">

            <Link
              to="/cart"
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110 transition-all duration-300"
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
              className="hidden sm:flex w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110 transition-all duration-300"
            >
              <FaUserCircle className="text-2xl" />
            </button>

            <button
              onClick={toggleTheme}
              className="hidden sm:flex w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-300 items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110 transition-all duration-300"
            >
              {darkMode ? (
                <FaSun className="text-lg" />
              ) : (
                <FaMoon className="text-lg" />
              )}
            </button>

            <div className="hidden sm:block w-px h-7 bg-gray-200 dark:bg-gray-700 mx-1" />

            <button
              onClick={() => i18n.changeLanguage("en")}
              className={`hidden sm:block px-3 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                i18n.language === "en"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => i18n.changeLanguage("uz")}
              className={`hidden sm:block px-3 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                i18n.language === "uz"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              UZ
            </button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden pb-6 pt-2 space-y-2 border-t border-gray-100 dark:border-gray-800">

            <NavLink
              to="/"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {t("home")}
            </NavLink>

            <NavLink
              to="/katalog"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {t("katalog")}
            </NavLink>

            <NavLink
              to="/about"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {t("about")}
            </NavLink>

            <NavLink
              to="/aloqa"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {t("contactTitle")}
            </NavLink>

            <div className="flex items-center justify-center gap-3 pt-3">

              <button
                onClick={() => {
                  setModal(true);
                  setMenuOpen(false);
                }}
                className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                <FaUserCircle className="text-2xl" />
              </button>

              <button
                onClick={toggleTheme}
                className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-300 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                {darkMode ? (
                  <FaSun className="text-lg" />
                ) : (
                  <FaMoon className="text-lg" />
                )}
              </button>

              <div className="w-px h-7 bg-gray-200 dark:bg-gray-700 mx-1" />

              <button
                onClick={() => i18n.changeLanguage("en")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  i18n.language === "en"
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => i18n.changeLanguage("uz")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  i18n.language === "uz"
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
                }`}
              >
                UZ
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

