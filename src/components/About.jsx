import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaApple,
  FaCheckCircle,
  FaShoppingBag,
  FaPhoneAlt,
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa";

export default function About() {
  const { i18n } = useTranslation();

  const uz = i18n.language === "uz";

  const text = {
    title: uz ? "Biz haqimizda" : "About Us",

    description: uz
      ? "Apple mahsulotlarini zamonaviy, qulay va tushunarli tarzda tanlash va buyurtma qilish imkonini beruvchi onlayn platforma."
      : "An online platform that allows you to choose and order Apple products in a modern, convenient and simple way.",

    storeTitle: uz
      ? "Apple Store nima?"
      : "What is Apple Store?",

    storeText: uz
      ? "Apple Store — Apple mahsulotlarini bir joyda ko‘rish, mahsulotlar haqida ma’lumot olish va kerakli mahsulotga buyurtma berish uchun yaratilgan zamonaviy onlayn do‘kon."
      : "Apple Store is a modern online store created to view Apple products in one place, learn more about them and order the product you need.",

    whyTitle: uz
      ? "Nima uchun yaratilgan?"
      : "Why was it created?",

    whyText: uz
      ? "Saytning asosiy maqsadi Apple mahsulotlarini izlash va buyurtma qilish jarayonini foydalanuvchi uchun imkon qadar sodda va qulay qilishdir. Barcha kerakli ma’lumotlar bir joyda jamlangan."
      : "The main goal of the website is to make searching for and ordering Apple products as simple and convenient as possible. All the necessary information is collected in one place.",

    whatTitle: uz
      ? "Saytda nimalar qilish mumkin?"
      : "What can you do on the website?",

    whatText: uz
      ? "Saytimizda xarid jarayoni bir nechta oddiy qadamga bo‘lingan."
      : "The shopping process on our website is divided into several simple steps.",

    viewTitle: uz
      ? "Mahsulotlarni ko‘rish"
      : "View Products",

    viewText: uz
      ? "Katalog orqali mavjud Apple mahsulotlarini ko‘rib chiqishingiz mumkin."
      : "You can browse available Apple products through the catalog.",

    chooseTitle: uz
      ? "Mahsulot tanlash"
      : "Choose a Product",

    chooseText: uz
      ? "O‘zingizga kerakli mahsulotni tanlab, uning variantlari bilan tanishishingiz mumkin."
      : "Choose the product you need and explore its available options.",

    orderTitle: uz
      ? "Buyurtma berish"
      : "Place an Order",

    orderText: uz
      ? "Tanlagan mahsulotingiz uchun kerakli ma’lumotlarni kiritib, buyurtma yuborishingiz mumkin."
      : "Enter the required information for your selected product and submit your order.",

    processTitle: uz
      ? "Buyurtma jarayoni"
      : "Order Process",

    afterTitle: uz
      ? "Buyurtma bergandan keyin nima bo‘ladi?"
      : "What happens after placing an order?",

    afterText: uz
      ? "Buyurtma yuborganingizdan so‘ng ma’lumotlaringiz tizimimizga kelib tushadi. Buyurtma ko‘rib chiqiladi va uni tasdiqlash hamda yetkazib berish tafsilotlarini aniqlashtirish uchun siz bilan bog‘laniladi."
      : "After you submit your order, your information is received by our system. The order is reviewed and you will be contacted to confirm the order and clarify delivery details.",

    step1: uz
      ? "Buyurtmangiz qabul qilinadi."
      : "Your order is received.",

    step2: uz
      ? "Buyurtma ma’lumotlari tekshiriladi."
      : "Your order information is checked.",

    step3: uz
      ? "Buyurtmani tasdiqlash uchun siz bilan bog‘laniladi."
      : "We contact you to confirm your order.",

    step4: uz
      ? "Yetkazib berish tafsilotlari aniqlashtiriladi."
      : "Delivery details are clarified.",

    trackTitle: uz
      ? "Buyurtmangiz qayerda ekanini bilmoqchimisiz?"
      : "Want to know where your order is?",

    trackText: uz
      ? "Buyurtma berganda kiritgan telefon raqamingiz orqali, buyurtmangiz qaysi bosqichda ekanini (qabul qilindi, tayyorlanmoqda, yetkazildi) istalgan vaqtda tekshirishingiz mumkin — hech kimga qo‘ng‘iroq qilishning hojati yo‘q."
      : "Using the phone number you entered when ordering, you can check your order status (received, being prepared, delivered) at any time — no need to call anyone.",

    trackButton: uz
      ? "Buyurtmamni kuzatish"
      : "Track My Order",
  };

  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">

      {/* ===== HARAKATLANUVCHI FON ELEMENTLARI ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="floating-blob absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gray-200/40 dark:bg-gray-800/40 blur-3xl" />
        <div className="floating-blob-delayed absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gray-100/50 dark:bg-gray-900/50 blur-3xl" />
        <div className="floating-blob absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full bg-gray-200/30 dark:bg-gray-800/30 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20">

        <div className="text-center max-w-3xl mx-auto mb-20 fade-up">
          <div className="flex justify-center mb-6">
            <div className="apple-spin w-20 h-20 rounded-3xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-2xl">
              <FaApple className="text-4xl" />
            </div>
          </div>

          <p className="text-sm font-bold tracking-[4px] text-gray-400 uppercase mb-4">
            Apple Store
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-7 gradient-text">
            {text.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-8">
            {text.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div className="fade-up-delay-1 group relative p-8 md:p-10 rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 overflow-hidden">

            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-black/5 dark:bg-white/5 group-hover:scale-150 transition-transform duration-700" />

            <div className="relative w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
              <FaApple className="text-2xl" />
            </div>

            <h2 className="relative text-3xl font-black mb-5">
              {text.storeTitle}
            </h2>

            <p className="relative text-gray-500 dark:text-gray-400 text-lg leading-8">
              {text.storeText}
            </p>

          </div>

          <div className="fade-up-delay-2 group relative p-8 md:p-10 rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 overflow-hidden">

            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-black/5 dark:bg-white/5 group-hover:scale-150 transition-transform duration-700" />

            <div className="relative w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
              <FaShoppingBag className="text-xl" />
            </div>

            <h2 className="relative text-3xl font-black mb-5">
              {text.whyTitle}
            </h2>

            <p className="relative text-gray-500 dark:text-gray-400 text-lg leading-8">
              {text.whyText}
            </p>

          </div>

        </div>

        <div className="mb-16">

          <div className="text-center max-w-2xl mx-auto mb-10 fade-up">

            <p className="text-sm font-bold tracking-[3px] text-gray-400 uppercase mb-4">
              Apple Store
            </p>

            <h2 className="text-4xl md:text-5xl font-black mb-5">
              {text.whatTitle}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-8">
              {text.whatText}
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              { title: text.viewTitle, desc: text.viewText, delay: "0ms" },
              { title: text.chooseTitle, desc: text.chooseText, delay: "150ms" },
              { title: text.orderTitle, desc: text.orderText, delay: "300ms" },
            ].map((item, i) => (
              <div
                key={i}
                className="fade-up group p-7 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-2 hover:border-gray-900 dark:hover:border-white hover:shadow-xl transition-all duration-500"
                style={{ animationDelay: item.delay }}
              >
                <FaCheckCircle className="text-2xl mb-5 text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white group-hover:scale-125 transition-all duration-500" />

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

        <div className="fade-up relative rounded-[40px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 md:p-14 overflow-hidden">

          <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 dark:bg-white/5 rounded-full blur-3xl" />

          <div className="relative max-w-3xl">

            <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-7 shadow-lg pulse-ring">
              <FaPhoneAlt className="text-xl" />
            </div>

            <p className="text-sm font-bold tracking-[3px] text-gray-400 uppercase mb-4">
              {text.processTitle}
            </p>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {text.afterTitle}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-8 mb-8">
              {text.afterText}
            </p>

            <div className="space-y-4">

              {[text.step1, text.step2, text.step3, text.step4].map(
                (step, i) => (
                  <div
                    key={i}
                    className="step-slide flex items-start gap-4"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-black dark:bg-white text-white dark:text-black font-black text-sm flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <p className="text-gray-600 dark:text-gray-300 pt-1.5">
                      {step}
                    </p>
                  </div>
                )
              )}

            </div>

          </div>

        </div>

        {/* ===== BUYURTMANI KUZATISH BLOKI ===== */}
        <div className="fade-up group relative mt-8 rounded-[40px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 md:p-14 overflow-hidden" style={{ animationDelay: "150ms" }}>

          <div className="absolute -top-16 -right-16 w-64 h-64 bg-black/5 dark:bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

            <div className="max-w-xl">

              <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6 shadow-lg pulse-ring">
                <FaBoxOpen className="text-xl" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
                {text.trackTitle}
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-lg leading-8">
                {text.trackText}
              </p>

            </div>

            <Link
              to="/buyurtmani-kuzatish"
              className="flex-shrink-0 flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-7 py-4 rounded-2xl font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300 group/btn"
            >
              {text.trackButton}
              <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>

          </div>

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
          animation: fadeUp 0.8s ease-out 0.1s both;
        }

        .fade-up-delay-2 {
          animation: fadeUp 0.8s ease-out 0.25s both;
        }

        @keyframes stepSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .step-slide {
          animation: stepSlide 0.6s ease-out both;
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

        @keyframes appleSpin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(8deg) scale(1.05);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }

        .apple-spin {
          animation: appleSpin 4s ease-in-out infinite;
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