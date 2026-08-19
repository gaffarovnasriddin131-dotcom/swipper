import React from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaTelegramPlane, FaArrowRight } from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="aloqa"
      className="relative min-h-screen py-10 sm:py-24 px-4 sm:px-6 overflow-hidden flex items-center bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300"
    >
      <div className="absolute top-[-100px] left-[-100px] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-gray-200/50 dark:bg-gray-800/40 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gray-200/50 dark:bg-gray-800/40 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 contact-animation">
          <span className="text-gray-500 dark:text-gray-400 font-bold tracking-[2px] sm:tracking-[4px] text-xs sm:text-sm uppercase">
            {t("contactUs")}
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2 sm:mt-4">
            {t("contactTitle")}
          </h2>

          <p className="mt-2 sm:mt-4 text-gray-500 dark:text-gray-400 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
            {t("contactText")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto">
          <a
            href="tel:+998930351117"
            className="group relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-[2rem] p-5 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgb(37,99,235,0.15)] hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-gray-500 dark:via-white dark:to-gray-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white text-white dark:text-gray-900 flex items-center justify-center shadow-lg shadow-gray-500/30 group-hover:scale-110 transition-all duration-500 mb-4 sm:mb-6">
              <FaPhoneAlt className="text-lg sm:text-2xl" />
            </div>

            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-1 sm:mb-2">
              {t("phone")}
            </p>

            <h3 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition mb-4 sm:mb-5 break-words">
              +998 93 035 11 17
            </h3>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-900 dark:text-white font-bold bg-gray-100 dark:bg-gray-700/50 px-3.5 py-2 sm:px-4 rounded-full group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-gray-900 transition-all duration-300">
              <span>{t("callUs")}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition text-xs sm:text-sm" />
            </div>
          </a>

          <a
            href="https://t.me/Gaffarov_11"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-[2rem] p-5 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgb(37,99,235,0.15)] hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-gray-500 dark:via-white dark:to-gray-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white text-white dark:text-gray-900 flex items-center justify-center shadow-lg shadow-gray-500/30 group-hover:scale-110 transition-all duration-500 mb-4 sm:mb-6">
              <FaTelegramPlane className="text-lg sm:text-2xl" />
            </div>

            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-1 sm:mb-2">
              {t("telegram")}
            </p>

            <h3 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition mb-4 sm:mb-5 break-words">
              @Gaffarov_11
            </h3>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-900 dark:text-white font-bold bg-gray-100 dark:bg-gray-700/50 px-3.5 py-2 sm:px-4 rounded-full group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-gray-900 transition-all duration-300">
              <span>{t("writeTelegram")}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition text-xs sm:text-sm" />
            </div>
          </a>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            {t("premiumTechnology")}
          </p>
        </div>
      </div>

      <style>{`
        .contact-animation {
          animation: contactShow 0.8s ease-out both;
        }

        @keyframes contactShow {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}