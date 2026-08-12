import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaTelegramPlane,
  FaClock,
  FaApple,
  FaArrowRight,
} from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="aloqa"
      className="relative py-28 px-6 bg-black overflow-hidden"
    >
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-16 contact-animation">

          <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-black rounded-2xl shadow-2xl mb-6 apple-animation">
            <FaApple className="text-3xl" />
          </div>

          <span className="text-blue-400 font-bold tracking-[4px] text-sm">
            {t("contactUs")}
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            {t("contactTitle")}
          </h2>

          <p className="mt-5 text-white/60 text-lg max-w-xl mx-auto leading-7">
            {t("contactText")}
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">

          <a
            href="tel:+998930351117"
            className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.07] transition-all duration-500"
          >

            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-all duration-300 mb-6">
              <FaPhoneAlt className="text-xl" />
            </div>

            <p className="text-sm text-white/40 mb-1">
              {t("phone")}
            </p>

            <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition mb-4">
              +998 93 035 11 17
            </h3>

            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <span>{t("callUs")}</span>
              <FaArrowRight className="group-hover:translate-x-2 transition text-xs" />
            </div>

          </a>

          <a
            href="https://t.me/Gaffarov_11"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-sky-500/50 hover:bg-white/[0.07] transition-all duration-500"
          >

            <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-110 transition-all duration-300 mb-6">
              <FaTelegramPlane className="text-2xl" />
            </div>

            <p className="text-sm text-white/40 mb-1">
              {t("telegram")}
            </p>

            <h3 className="text-lg font-black text-white group-hover:text-sky-400 transition mb-4">
              @Gaffarov_11
            </h3>

            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <span>{t("writeTelegram")}</span>
              <FaArrowRight className="group-hover:translate-x-2 transition text-xs" />
            </div>

          </a>

          <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.07] transition-all duration-500">

            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-all duration-300 mb-6">
              <FaClock className="text-xl" />
            </div>

            <p className="text-sm text-white/40 mb-1">
              {t("support")}
            </p>

            <h3 className="text-lg font-black text-white mb-4">
              24/7
            </h3>

            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <span>Online</span>
            </div>

          </div>

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