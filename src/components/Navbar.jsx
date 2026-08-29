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
    `relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
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
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-20 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full text-black dark:text-white flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
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
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110 hover:-rotate-6 transition-all duration-300"
            >
              <FaShoppingCart />

              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="cart-bounce absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
                >
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
              className="hidden sm:flex w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-300 items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110 hover:rotate-90 transition-all duration-500"
            >
              <span key={darkMode ? "sun" : "moon"} className="theme-icon-in">
                {darkMode ? (
                  <FaSun className="text-lg" />
                ) : (
                  <FaMoon className="text-lg" />
                )}
              </span>
            </button>

            <div className="hidden sm:block w-px h-7 bg-gray-200 dark:bg-gray-700 mx-1" />

            <button
              onClick={() => i18n.changeLanguage("en")}
              className={`hidden sm:block px-3 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                i18n.language === "en"
                  ? "bg-black dark:bg-white text-white dark:text-black scale-105"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => i18n.changeLanguage("uz")}
              className={`hidden sm:block px-3 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                i18n.language === "uz"
                  ? "bg-black dark:bg-white text-white dark:text-black scale-105"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              UZ
            </button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
            >
              <span className="menu-icon-in" key={menuOpen ? "close" : "open"}>
                {menuOpen ? <FaTimes /> : <FaBars />}
              </span>
            </button>

          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden pb-6 pt-2 space-y-2 border-t border-gray-100 dark:border-gray-800 mobile-menu-in">

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

      <style>{`
        @keyframes cartBounce {
          0% { transform: scale(0); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        .cart-bounce {
          animation: cartBounce 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        @keyframes themeIconIn {
          from {
            opacity: 0;
            transform: rotate(-90deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }

        .theme-icon-in {
          display: inline-flex;
          animation: themeIconIn 0.4s ease-out both;
        }

        @keyframes menuIconIn {
          from {
            opacity: 0;
            transform: scale(0.6) rotate(-45deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        .menu-icon-in {
          display: inline-flex;
          animation: menuIconIn 0.25s ease-out both;
        }

        @keyframes mobileMenuIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu-in {
          animation: mobileMenuIn 0.3s ease-out both;
        }
      `}</style>
    </nav>
  );
}