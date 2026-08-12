import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaTelegramPlane,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="aloqa"
      className="relative py-24 px-6 bg-gray-50 overflow-hidden"
    >
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-100 rounded-full blur-3xl opacity-60" />

      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-purple-100 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-12 contact-animation">

          <span className="text-blue-600 font-bold tracking-[4px] text-sm">
            {t("contactUs")}
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
            {t("contactTitle")}
          </h2>

          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto leading-7">
            {t("contactText")}
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <a
            href="tel:+998930351117"
            className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >

            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-5">
              <FaPhoneAlt className="text-xl" />
            </div>

            <p className="text-sm text-gray-400 mb-1">
              {t("phone")}
            </p>

            <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition mb-4">
              +998 93 035 11 17
            </h3>

            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <span>{t("callUs")}</span>
              <FaArrowRight className="group-hover:translate-x-2 transition" />
            </div>

          </a>

          <a
            href="https://t.me/Gaffarov_11"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >

            <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-5">
              <FaTelegramPlane className="text-2xl" />
            </div>

            <p className="text-sm text-gray-400 mb-1">
              {t("telegram")}
            </p>

            <h3 className="text-lg font-black text-gray-900 group-hover:text-sky-500 transition mb-4">
              @Gaffarov_11
            </h3>

            <div className="flex items-center gap-2 text-sky-500 font-bold">
              <span>{t("writeTelegram")}</span>
              <FaArrowRight className="group-hover:translate-x-2 transition" />
            </div>

          </a>

          <div className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-5">
              <FaClock className="text-xl" />
            </div>

            <p className="text-sm text-gray-400 mb-1">
              {t("support")}
            </p>

            <h3 className="text-lg font-black text-gray-900 mb-4">
              24/7
            </h3>

            <div className="flex items-center gap-2 text-purple-600 font-bold">
              <span>Online</span>
            </div>

          </div>

        </div>

        <div className="text-center mt-12">

          <p className="text-sm text-gray-400">
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