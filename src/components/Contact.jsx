import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaTelegramPlane,
  FaArrowRight,
} from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="aloqa"
      className="relative min-h-screen py-24 px-6 overflow-hidden flex items-center bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300"
    >

      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-blue-100/60 dark:bg-blue-900/20 rounded-full blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-blue-100/60 dark:bg-blue-900/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-12 contact-animation">

          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[4px] text-sm">
            {t("contactUs")}
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-4">
            {t("contactTitle")}
          </h2>

          <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto leading-7">
            {t("contactText")}
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

          <a
            href="tel:+998930351117"
            className="group relative bg-white dark:bg-gray-800 rounded-[2rem] p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgb(37,99,235,0.15)] hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >

            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 mb-6">
              <FaPhoneAlt className="text-2xl" />
            </div>

            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-2">
              {t("phone")}
            </p>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-5">
              +998 93 035 11 17
            </h3>

            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950 px-4 py-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <span>{t("callUs")}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition text-sm" />
            </div>

          </a>

          <a
            href="https://t.me/Gaffarov_11"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white dark:bg-gray-800 rounded-[2rem] p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgb(37,99,235,0.15)] hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >

            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 mb-6">
              <FaTelegramPlane className="text-2xl" />
            </div>

            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-2">
              {t("telegram")}
            </p>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-5">
              @Gaffarov_11
            </h3>

            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950 px-4 py-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <span>{t("writeTelegram")}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition text-sm" />
            </div>

          </a>

        </div>

        <div className="text-center mt-12">

          <p className="text-sm text-gray-400 dark:text-gray-500">
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

        .apple-animation {
          animation: appleFloat 3s ease-in-out infinite;
        }

        @keyframes appleFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

      `}</style>

    </section>
  );
}