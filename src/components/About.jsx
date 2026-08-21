import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaApple,
  FaPhone,
  FaTelegramPlane,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-black py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-black dark:bg-white text-white dark:text-black shadow-xl mb-6">
            <FaApple className="text-5xl" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white">
            {t("aboutTitle")}
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg leading-8">
            {t("aboutText")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaApple className="text-4xl text-gray-900 dark:text-white mb-5" />

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("aboutQualityTitle")}
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400 leading-7">
              {t("aboutQualityText")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaPhone className="text-3xl text-gray-900 dark:text-white mb-5" />

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("aboutSupportTitle")}
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400 leading-7">
              {t("aboutSupportText")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaTelegramPlane className="text-4xl text-gray-900 dark:text-white mb-5" />

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("aboutContactTitle")}
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400 leading-7">
              {t("aboutContactText")}
            </p>
          </div>

        </div>

        <div className="bg-black dark:bg-white rounded-3xl p-8 md:p-12 text-white dark:text-black shadow-2xl">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>
              <p className="text-white/60 dark:text-black/60 font-bold tracking-[4px] text-sm mb-4">
                {t("contactUs")}
              </p>

              <h2 className="text-3xl md:text-4xl font-black">
                {t("aboutContactHeading")}
              </h2>

              <p className="mt-5 text-white/70 dark:text-black/70 leading-8">
                {t("aboutContactDescription")}
              </p>
            </div>

            <div className="space-y-4">

              <a
                href="tel:+998901234567"
                className="flex items-center gap-4 bg-white/10 dark:bg-black/10 rounded-2xl p-5 hover:bg-white/20 dark:hover:bg-black/20 transition"
              >
                <FaPhone />
                <div>
                  <p className="text-sm opacity-60">{t("phone")}</p>
                  <p className="font-bold">+998 90 123 45 67</p>
                </div>
              </a>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-white/10 dark:bg-black/10 rounded-2xl p-5 hover:bg-white/20 dark:hover:bg-black/20 transition"
              >
                <FaTelegramPlane />
                <div>
                  <p className="text-sm opacity-60">{t("telegram")}</p>
                  <p className="font-bold">{t("writeTelegram")}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white/10 dark:bg-black/10 rounded-2xl p-5">
                <FaMapMarkerAlt />
                <div>
                  <p className="text-sm opacity-60">{t("address")}</p>
                  <p className="font-bold">Uzbekistan</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}