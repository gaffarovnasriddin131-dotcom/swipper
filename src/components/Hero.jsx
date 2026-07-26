import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaApple,
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-80px)] bg-white overflow-hidden">

      {/* ORQA FON EFFEKT */}

      <div className="
        absolute
        top-20
        right-[-150px]
        w-[500px]
        h-[500px]
        bg-blue-100
        rounded-full
        blur-3xl
        opacity-50
      " />

      <div className="
        absolute
        bottom-[-150px]
        left-[-150px]
        w-[400px]
        h-[400px]
        bg-purple-100
        rounded-full
        blur-3xl
        opacity-40
      " />


      {/* ASOSIY QISM */}

      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
      ">

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-10
          items-center
          min-h-[calc(100vh-80px)]
        ">


          {/* ========================= */}
          {/* CHAP TOMON */}
          {/* ========================= */}

          <div className="py-16">


            {/* APPLE STORE */}

            <div className="
              flex
              items-center
              gap-4
              mb-8
              hero-animation
            ">

              <div className="
                w-14
                h-14
                bg-black
                rounded-2xl
                flex
                items-center
                justify-center
                shadow-xl
                logo-animation
              ">

                <FaApple className="
                  text-white
                  text-3xl
                " />

              </div>


              <div>

                <p className="
                  text-gray-900
                  font-black
                  tracking-[4px]
                  text-lg
                ">
                  APPLE STORE
                </p>

                <p className="
                  text-gray-400
                  text-sm
                  mt-1
                ">
                  Premium Technology
                </p>

              </div>

            </div>


            {/* SARLAVHA */}

            <h1 className="
              text-5xl
              sm:text-6xl
              lg:text-7xl
              font-black
              leading-[1.05]
              text-gray-900
              hero-animation
            ">

              Apple Store'ga

              <br />

              <span className="
                text-blue-600
                title-animation
                inline-block
              ">
                xush kelibsiz
              </span>

            </h1>


            {/* MATN */}

            <p className="
              mt-7
              text-lg
              text-gray-500
              leading-8
              max-w-xl
              hero-animation
            ">

              Eng yangi Apple mahsulotlarini
              bir joydan toping.

              <br />

              Zamonaviy dizayn, kuchli texnologiya
              va ishonchli xizmat — barchasi siz uchun.

            </p>


            {/* KATALOG BUTTON */}

            <div className="
              mt-9
              hero-animation
            ">

              <button
                onClick={() => navigate("/katalog")}
                className="
                  flex
                  items-center
                  gap-3
                  bg-blue-600
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  shadow-xl
                  shadow-blue-200
                  hover:bg-blue-700
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  group
                "
              >

                <FaShoppingBag
                  className="
                    group-hover:scale-110
                    transition
                  "
                />

                Katalogni ko'rish

                <FaArrowRight
                  className="
                    group-hover:translate-x-2
                    transition
                  "
                />

              </button>

            </div>


            {/* STATISTIKA */}

            <div className="
              flex
              flex-wrap
              gap-12
              mt-12
              hero-animation
            ">


              {/* MAHSULOT */}

              <div className="group">

                <p className="
                  text-3xl
                  font-black
                  text-gray-900
                  group-hover:text-blue-600
                  transition
                ">
                  20+
                </p>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Mahsulotlar
                </p>

              </div>


              {/* SIFAT */}

              <div className="group">

                <p className="
                  text-3xl
                  font-black
                  text-gray-900
                  group-hover:text-blue-600
                  transition
                ">
                  Apple
                </p>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Premium sifat
                </p>

              </div>


              {/* SUPPORT */}

              <div className="group">

                <p className="
                  text-3xl
                  font-black
                  text-gray-900
                  group-hover:text-blue-600
                  transition
                ">
                  24/7
                </p>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Qo'llab-quvvatlash
                </p>

              </div>

            </div>

          </div>


          {/* ========================= */}
          {/* O'NG TOMON */}
          {/* FAQAT IPHONE RASMI */}
          {/* ========================= */}

          <div className="
            relative
            flex
            items-center
            justify-center
            min-h-[650px]
          ">


            {/* ORQA GLOW */}

            <div className="
              absolute
              w-[450px]
              h-[450px]
              bg-blue-100
              rounded-full
              blur-3xl
              opacity-60
              glow-animation
            " />


            {/* IPHONE RASMI */}

            <div className="
              relative
              z-10
              w-[330px]
              h-[500px]
              sm:w-[380px]
              sm:h-[560px]
              lg:w-[450px]
              lg:h-[650px]
              phone-animation
            ">

              <img
                src="/iphone.webp"
                alt="iPhone 17 Pro Max Silver"
                className="
                  w-full
                  h-full
                  object-contain
                  drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]
                "
              />

            </div>

          </div>

        </div>

      </div>


      {/* ========================= */}
      {/* ANIMATSIYALAR */}
      {/* ========================= */}

      <style>{`

        /* CHAP TOMON */

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


        /* APPLE LOGO */

        .logo-animation {
          animation: logoShow 1s ease-out both;
          transition: all 0.4s ease;
        }

        .logo-animation:hover {
          transform: scale(1.12) rotate(8deg);
          box-shadow: 0 15px 35px rgba(0,0,0,0.25);
        }

        @keyframes logoShow {

          from {
            opacity: 0;
            transform: scale(0.5) rotate(-30deg);
          }

          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }

        }


        /* SARLAVHA */

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


        /* IPHONE */

        .phone-animation {
          animation: phoneFloat 4s ease-in-out infinite;
        }

        @keyframes phoneFloat {

          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-15px) rotate(1deg);
          }

        }


        /* ORQA GLOW */

        .glow-animation {
          animation: glow 4s ease-in-out infinite;
        }

        @keyframes glow {

          0%,
          100% {
            transform: scale(0.9);
            opacity: 0.3;
          }

          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }

        }

      `}</style>

    </section>
  );
}