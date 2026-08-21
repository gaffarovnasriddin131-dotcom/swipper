import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaApple,
  FaCheckCircle,
  FaShoppingBag,
  FaPhoneAlt,
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
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex justify-center mb-6">
            <FaApple className="text-5xl text-black dark:text-white" />
          </div>

          <p className="text-sm font-bold tracking-[4px] text-gray-400 uppercase mb-4">
            Apple Store
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-7">
            {text.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-8">
            {text.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div className="p-8 md:p-10 rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6">
              <FaApple className="text-2xl" />
            </div>

            <h2 className="text-3xl font-black mb-5">
              {text.storeTitle}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-8">
              {text.storeText}
            </p>

          </div>

          <div className="p-8 md:p-10 rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6">
              <FaShoppingBag className="text-xl" />
            </div>

            <h2 className="text-3xl font-black mb-5">
              {text.whyTitle}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-8">
              {text.whyText}
            </p>

          </div>

        </div>

        <div className="mb-16">

          <div className="text-center max-w-2xl mx-auto mb-10">

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

            <div className="p-7 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-2 transition-all duration-300">
              <FaCheckCircle className="text-green-500 text-2xl mb-5" />

              <h3 className="text-xl font-bold mb-3">
                {text.viewTitle}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-7">
                {text.viewText}
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-2 transition-all duration-300">
              <FaCheckCircle className="text-green-500 text-2xl mb-5" />

              <h3 className="text-xl font-bold mb-3">
                {text.chooseTitle}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-7">
                {text.chooseText}
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-2 transition-all duration-300">
              <FaCheckCircle className="text-green-500 text-2xl mb-5" />

              <h3 className="text-xl font-bold mb-3">
                {text.orderTitle}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-7">
                {text.orderText}
              </p>
            </div>

          </div>

        </div>

        <div className="rounded-[40px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 md:p-14">

          <div className="max-w-3xl">

            <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-7">
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

              <div className="flex items-start gap-4">
                <span className="font-black text-lg">01</span>

                <p className="text-gray-600 dark:text-gray-300">
                  {text.step1}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-black text-lg">02</span>

                <p className="text-gray-600 dark:text-gray-300">
                  {text.step2}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-black text-lg">03</span>

                <p className="text-gray-600 dark:text-gray-300">
                  {text.step3}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-black text-lg">04</span>

                <p className="text-gray-600 dark:text-gray-300">
                  {text.step4}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}