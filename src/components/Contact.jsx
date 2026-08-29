import React from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaTelegramPlane, FaArrowRight } from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="aloqa"
      className="relative min-h-screen py-10 sm:py-24 px-4 sm:px-6 overflow-hidden flex items-center bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      {/* ===== HARAKATLANUVCHI FON ELEMENTLARI ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="floating-blob absolute -top-32 -left-32 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full bg-gray-200/50 dark:bg-gray-800/40 blur-3xl" />
        <div className="floating-blob-delayed absolute bottom-[-120px] right-[-100px] w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full bg-gray-100/60 dark:bg-gray-900/50 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 fade-up">
          <span className="text-gray-500 dark:text-gray-400 font-bold tracking-[2px] sm:tracking-[4px] text-xs sm:text-sm uppercase">
            {t("contactUs")}
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2 sm:mt-4 gradient-text">
            {t("contactTitle")}
          </h2>

          <p className="mt-2 sm:mt-4 text-gray-500 dark:text-gray-400 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
            {t("contactText")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto">
          <a
            href="tel:+998930351117"
            className="fade-up-delay-1 group relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-[2rem] p-5 sm:p-9 border border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_25px_60px_rgba(255,255,255,0.06)] hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-black/5 dark:bg-white/5 group-hover:scale-150 transition-transform duration-700" />

            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-gray-500 dark:via-white dark:to-gray-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-black dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-lg pulse-ring group-hover:rotate-12 transition-all duration-500 mb-4 sm:mb-6">
              <FaPhoneAlt className="text-lg sm:text-2xl" />
            </div>

            <p className="relative text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-1 sm:mb-2">
              {t("phone")}
            </p>

            <h3 className="relative text-lg sm:text-2xl font-black text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition mb-4 sm:mb-5 break-words">
              +998 93 035 11 17
            </h3>

            <div className="relative inline-flex items-center gap-2 text-xs sm:text-sm text-gray-900 dark:text-white font-bold bg-gray-100 dark:bg-gray-800 px-3.5 py-2 sm:px-4 rounded-full group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-gray-900 transition-all duration-300">
              <span>{t("callUs")}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition text-xs sm:text-sm" />
            </div>
          </a>

          <a
            href="https://t.me/Gaffarov_11"
            target="_blank"
            rel="noopener noreferrer"
            className="fade-up-delay-2 group relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-[2rem] p-5 sm:p-9 border border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_25px_60px_rgba(255,255,255,0.06)] hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-black/5 dark:bg-white/5 group-hover:scale-150 transition-transform duration-700" />

            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-gray-500 dark:via-white dark:to-gray-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-black dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-lg pulse-ring group-hover:rotate-12 transition-all duration-500 mb-4 sm:mb-6">
              <FaTelegramPlane className="text-lg sm:text-2xl" />
            </div>

            <p className="relative text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-1 sm:mb-2">
              {t("telegram")}
            </p>

            <h3 className="relative text-lg sm:text-2xl font-black text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition mb-4 sm:mb-5 break-words">
              @Gaffarov_11
            </h3>

            <div className="relative inline-flex items-center gap-2 text-xs sm:text-sm text-gray-900 dark:text-white font-bold bg-gray-100 dark:bg-gray-800 px-3.5 py-2 sm:px-4 rounded-full group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-gray-900 transition-all duration-300">
              <span>{t("writeTelegram")}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition text-xs sm:text-sm" />
            </div>
          </a>
        </div>

        <div className="fade-up text-center mt-8 sm:mt-12" style={{ animationDelay: "400ms" }}>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            {t("premiumTechnology")}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fadeUp 0.8s ease-out both;
        }

        .fade-up-delay-1 {
          animation: fadeUp 0.8s ease-out 0.15s both;
        }

        .fade-up-delay-2 {
          animation: fadeUp 0.8s ease-out 0.3s both;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.05);
          }
        }

        .floating-blob {
          animation: float 12s ease-in-out infinite;
        }

        .floating-blob-delayed {
          animation: float 15s ease-in-out infinite;
          animation-delay: -5s;
        }

        @keyframes pulseRing {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(0, 0, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          }
        }

        .dark .pulse-ring {
          animation: pulseRingDark 2.5s ease-out infinite;
        }

        .pulse-ring {
          animation: pulseRing 2.5s ease-out infinite;
        }

        @keyframes pulseRingDark {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.15);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        .gradient-text {
          background: linear-gradient(90deg, currentColor, currentColor 40%, #888, currentColor 60%, currentColor);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 6s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: -200% center;
          }
        }
      `}</style>
    </section>
  );
}