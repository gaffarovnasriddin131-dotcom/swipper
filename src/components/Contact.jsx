import React from "react";
import {
  FaPhoneAlt,
  FaTelegramPlane,
  FaApple,
  FaArrowRight,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="aloqa"
      className="
        relative
        py-24
        px-6
        bg-gray-50
        overflow-hidden
      "
    >

      {/* ORQA FON */}

      <div className="
        absolute
        top-[-100px]
        left-[-100px]
        w-[300px]
        h-[300px]
        bg-blue-100
        rounded-full
        blur-3xl
        opacity-60
      " />

      <div className="
        absolute
        bottom-[-120px]
        right-[-100px]
        w-[350px]
        h-[350px]
        bg-purple-100
        rounded-full
        blur-3xl
        opacity-50
      " />


      {/* ASOSIY QISM */}

      <div className="
        relative
        z-10
        max-w-6xl
        mx-auto
      ">


        {/* SARLAVHA */}

        <div className="
          text-center
          mb-12
          contact-animation
        ">

          <div className="
            inline-flex
            items-center
            justify-center
            w-16
            h-16
            bg-black
            text-white
            rounded-2xl
            shadow-xl
            mb-5
            apple-animation
          ">

            <FaApple className="text-3xl" />

          </div>


          <h2 className="
            text-4xl
            md:text-5xl
            font-black
            text-gray-900
          ">
            Biz bilan bog‘laning
          </h2>


          <p className="
            mt-4
            text-gray-500
            text-lg
            max-w-xl
            mx-auto
            leading-7
          ">
            Savollaringiz bormi?
            Apple mahsulotlari va buyurtmalar
            haqida biz bilan bog‘laning.
          </p>

        </div>


        {/* ALOQA KARTALARI */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          max-w-3xl
          mx-auto
        ">


          {/* TELEFON */}

          <a
            href="tel:+998930351117"
            className="
              group
              bg-white
              rounded-3xl
              p-7
              border
              border-gray-100
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
            "
          >

            <div className="
              flex
              items-center
              gap-5
            ">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                group-hover:scale-110
                group-hover:rotate-6
                transition-all
                duration-300
              ">

                <FaPhoneAlt className="text-xl" />

              </div>


              <div>

                <p className="
                  text-sm
                  text-gray-400
                  mb-1
                ">
                  Telefon
                </p>

                <h3 className="
                  text-lg
                  font-black
                  text-gray-900
                  group-hover:text-blue-600
                  transition
                ">
                  +998 93 035 11 17
                </h3>

              </div>

            </div>


            <div className="
              mt-6
              flex
              items-center
              justify-between
              text-blue-600
              font-bold
            ">

              <span>
                Qo‘ng‘iroq qilish
              </span>

              <FaArrowRight className="
                group-hover:translate-x-2
                transition
              " />

            </div>

          </a>


          {/* TELEGRAM */}

          <a
            href="https://t.me/Gaffarov_11"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              bg-white
              rounded-3xl
              p-7
              border
              border-gray-100
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
            "
          >

            <div className="
              flex
              items-center
              gap-5
            ">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-sky-500
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                group-hover:scale-110
                group-hover:rotate-6
                transition-all
                duration-300
              ">

                <FaTelegramPlane className="text-2xl" />

              </div>


              <div>

                <p className="
                  text-sm
                  text-gray-400
                  mb-1
                ">
                  Telegram
                </p>

                <h3 className="
                  text-lg
                  font-black
                  text-gray-900
                  group-hover:text-sky-500
                  transition
                ">
                  @Gaffarov_11
                </h3>

              </div>

            </div>


            <div className="
              mt-6
              flex
              items-center
              justify-between
              text-sky-500
              font-bold
            ">

              <span>
                Telegram orqali yozish
              </span>

              <FaArrowRight className="
                group-hover:translate-x-2
                transition
              " />

            </div>

          </a>

        </div>


        {/* PASTKI MATN */}

        <div className="
          text-center
          mt-12
        ">

          <p className="
            text-sm
            text-gray-400
          ">
            Apple Store — Premium Technology
          </p>

        </div>

      </div>


      {/* ANIMATSIYA */}

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