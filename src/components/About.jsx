
import React from "react";
import {
  FaApple,
  FaCheckCircle,
  FaShoppingBag,
  FaPhoneAlt,
} from "react-icons/fa";

export default function About() {
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
            Biz haqimizda
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-8">
            Apple mahsulotlarini zamonaviy, qulay va tushunarli tarzda
            tanlash va buyurtma qilish imkonini beruvchi onlayn platforma.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div className="p-8 md:p-10 rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6">
              <FaApple className="text-2xl" />
            </div>

            <h2 className="text-3xl font-black mb-5">
              Apple Store nima?
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-8">
              Apple Store — Apple mahsulotlarini bir joyda ko‘rish,
              mahsulotlar haqida ma’lumot olish va kerakli mahsulotga
              buyurtma berish uchun yaratilgan zamonaviy onlayn do‘kon.
            </p>

          </div>

          <div className="p-8 md:p-10 rounded-[32px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6">
              <FaShoppingBag className="text-xl" />
            </div>

            <h2 className="text-3xl font-black mb-5">
              Nima uchun yaratilgan?
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-8">
              Saytning asosiy maqsadi Apple mahsulotlarini izlash va
              buyurtma qilish jarayonini foydalanuvchi uchun imkon qadar
              sodda va qulay qilishdir. Barcha kerakli ma’lumotlar
              bir joyda jamlangan.
            </p>

          </div>

        </div>

        <div className="mb-16">

          <div className="text-center max-w-2xl mx-auto mb-10">

            <p className="text-sm font-bold tracking-[3px] text-gray-400 uppercase mb-4">
              Apple Store
            </p>

            <h2 className="text-4xl md:text-5xl font-black mb-5">
              Saytda nimalar qilish mumkin?
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-8">
              Saytimizda xarid jarayoni bir nechta oddiy qadamga
              bo‘lingan.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <div className="p-7 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-2 transition-all duration-300">
              <FaCheckCircle className="text-green-500 text-2xl mb-5" />

              <h3 className="text-xl font-bold mb-3">
                Mahsulotlarni ko‘rish
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-7">
                Katalog orqali mavjud Apple mahsulotlarini ko‘rib
                chiqishingiz mumkin.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-2 transition-all duration-300">
              <FaCheckCircle className="text-green-500 text-2xl mb-5" />

              <h3 className="text-xl font-bold mb-3">
                Mahsulot tanlash
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-7">
                O‘zingizga kerakli mahsulotni tanlab, uning variantlari
                bilan tanishishingiz mumkin.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-2 transition-all duration-300">
              <FaCheckCircle className="text-green-500 text-2xl mb-5" />

              <h3 className="text-xl font-bold mb-3">
                Buyurtma berish
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-7">
                Tanlagan mahsulotingiz uchun kerakli ma’lumotlarni
                kiritib, buyurtma yuborishingiz mumkin.
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
              Buyurtma jarayoni
            </p>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Buyurtma bergandan keyin nima bo‘ladi?
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-8 mb-8">
              Buyurtma yuborganingizdan so‘ng ma’lumotlaringiz tizimimizga
              kelib tushadi. Buyurtma ko‘rib chiqiladi va uni tasdiqlash
              hamda yetkazib berish tafsilotlarini aniqlashtirish uchun
              siz bilan bog‘laniladi.
            </p>

            <div className="space-y-4">

              <div className="flex items-start gap-4">
                <span className="font-black text-lg">01</span>

                <p className="text-gray-600 dark:text-gray-300">
                  Buyurtmangiz qabul qilinadi.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-black text-lg">02</span>

                <p className="text-gray-600 dark:text-gray-300">
                  Buyurtma ma’lumotlari tekshiriladi.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-black text-lg">03</span>

                <p className="text-gray-600 dark:text-gray-300">
                  Buyurtmani tasdiqlash uchun siz bilan bog‘laniladi.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-black text-lg">04</span>

                <p className="text-gray-600 dark:text-gray-300">
                  Yetkazib berish tafsilotlari aniqlashtiriladi.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

