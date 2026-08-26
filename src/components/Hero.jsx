import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section
      className="hero-section relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.78) 35%, rgba(255,255,255,0.35) 65%, rgba(255,255,255,0.08) 100%)",
        }}
      />

      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">

          <p className="text-gray-700 dark:text-white/70 font-black tracking-[4px] text-sm mb-6 hero-animation transition-colors duration-500">
            {t("premiumTechnology")}
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-gray-900 dark:text-white hero-animation transition-colors duration-500">
            {t("welcomeFirst")}

            <br />

            <span className="title-animation inline-block relative">
              {t("welcomeSecond")}

              <span className="absolute left-0 -bottom-2 w-full h-1 bg-gray-900/30 dark:bg-white/40 transition-colors duration-500" />
            </span>
          </h1>

          <p className="mt-7 text-lg text-gray-700 dark:text-white/80 leading-8 max-w-xl hero-animation transition-colors duration-500">
            {t("heroDescription")}
          </p>

          <div className="mt-9 hero-animation">
            <button
              onClick={() => navigate("/katalog")}
              className="flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-black dark:hover:bg-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
            >
              <FaShoppingBag className="group-hover:scale-110 transition" />

              {t("viewCatalog")}

              <FaArrowRight className="group-hover:translate-x-2 transition" />
            </button>
          </div>

          <div className="flex flex-wrap gap-12 mt-14 hero-animation">

            <div className="group">
              <p className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-white/70 transition-colors duration-300">
                20+
              </p>

              <p className="text-sm text-gray-600 dark:text-white/60 mt-1 transition-colors duration-500">
                {t("productsCount")}
              </p>
            </div>

            <div className="group">
              <p className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-white/70 transition-colors duration-300">
                Apple
              </p>

              <p className="text-sm text-gray-600 dark:text-white/60 mt-1 transition-colors duration-500">
                {t("premiumQuality")}
              </p>
            </div>

            <div className="group">
              <p className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-white/70 transition-colors duration-300">
                24/7
              </p>

              <p className="text-sm text-gray-600 dark:text-white/60 mt-1 transition-colors duration-500">
                {t("support")}
              </p>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          background-image: url('/ubeyonroad-szNWSe97Mq0-unsplash.jpg');
          background-size: cover;
          background-position: center 20%;
        }

        @media (min-width: 768px) {
          .hero-section {
            background-position: 75% 20%;
          }
        }

        .hero-animation {
          animation: heroShow 0.8s ease-out both;
        }

        @keyframes heroShow {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .title-animation {
          animation: titleFloat 3s ease-in-out infinite;
        }

        @keyframes titleFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </section>
  );
}