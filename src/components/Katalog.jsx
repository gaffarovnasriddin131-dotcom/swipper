import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaApple,
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaHeadphones,
  FaClock,
  FaBox,
} from "react-icons/fa";

export default function Katalog({ addToCart }) {
  const { t, i18n } = useTranslation();

  const [activeCategory, setActiveCategory] = useState("Barchasi");


  const mahsulotlar = [

    
    {
      id: 1,
      kategoriya: "iPhone",
      rasm: "/iphone.webp",
      nomi: "iPhone 17 Pro Max",
      malumot: "Eng yangi iPhone. Kuchli kamera va yuqori tezlik.",
      xotiralar: [
        { nomi: "256 GB", narx: 1500 },
        { nomi: "512 GB", narx: 1700 },
        { nomi: "1 TB", narx: 2000 },
      ],
    },

    {
      id: 2,
      kategoriya: "iPhone",
      rasm: "/images.jpeg",
      nomi: "iPhone 16 Pro Max",
      malumot: "Pro kamera tizimi va kuchli A18 Pro chip.",
      xotiralar: [
        { nomi: "128 GB", narx: 1100 },
        { nomi: "256 GB", narx: 1200 },
        { nomi: "512 GB", narx: 1400 },
        { nomi: "1 TB", narx: 1600 },
      ],
    },

    {
      id: 3,
      kategoriya: "iPhone",
      rasm: "/1718104906ltlCOhTwXJcL.webp",
      nomi: "iPhone 15 Pro Max",
      malumot: "Titan dizayn va kuchli A17 Pro chip.",
      xotiralar: [
        { nomi: "256 GB", narx: 1000 },
        { nomi: "512 GB", narx: 1200 },
        { nomi: "1 TB", narx: 1400 },
      ],
    },

    {
      id: 4,
      kategoriya: "iPhone",
      rasm: "/HDDqLPJoIvqJiejjUr6fYFBmkCNcDxMd.jpg",
      nomi: "iPhone 17 Pro",
      malumot: "Kuchli kamera, zamonaviy dizayn va yuqori tezlik.",
      xotiralar: [
        { nomi: "256 GB", narx: 1300 },
        { nomi: "512 GB", narx: 1500 },
        { nomi: "1 TB", narx: 1800 },
      ],
    },

    {
      id: 5,
      kategoriya: "iPhone",
      rasm: "/2V8XDMEGTxSQrCJbV2FVWOHZo92DLcjt.jpg",
      nomi: "iPhone 16 Pro",
      malumot: "A18 Pro chip, professional kamera va titan dizayn.",
      xotiralar: [
        { nomi: "128 GB", narx: 999 },
        { nomi: "256 GB", narx: 1099 },
        { nomi: "512 GB", narx: 1299 },
        { nomi: "1 TB", narx: 1499 },
      ],
    },

    {
      id: 6,
      kategoriya: "iPhone",
      rasm: "/P8bxRNXpd1vzWLw5m8lySIq0xCcBj0DX.jpg",
      nomi: "iPhone 15 Pro",
      malumot: "A17 Pro chip, kuchli kamera va titan korpus.",
      xotiralar: [
        { nomi: "128 GB", narx: 799 },
        { nomi: "256 GB", narx: 899 },
        { nomi: "512 GB", narx: 1099 },
        { nomi: "1 TB", narx: 1299 },
      ],
    },

    {
      id: 7,
      kategoriya: "iPhone",
      rasm: "/37tViBJbNfTw7g7gTGig8lQURR73kGg0 copy.jpg",
      nomi: "iPhone Air",
      malumot: "Yupqa va yengil dizayn, zamonaviy ishlash va yuqori tezlik.",
      xotiralar: [
        { nomi: "256 GB", narx: 999 },
        { nomi: "512 GB", narx: 1199 },
        { nomi: "1 TB", narx: 1399 },
      ],
    },

    {
      id: 8,
      kategoriya: "iPhone",
      rasm: "/FVUQRZAP6o0JUYMjotuoMrzoNS8GOQBx copy.jpg",
      nomi: "iPhone 17",
      malumot: "Yangi avlod iPhone. Kuchli ishlash va zamonaviy dizayn.",
      xotiralar: [
        { nomi: "128 GB", narx: 899 },
        { nomi: "256 GB", narx: 999 },
        { nomi: "512 GB", narx: 1199 },
      ],
    },

    {
      id: 9,
      kategoriya: "iPhone",
      rasm: "/JtBMVI1rq5oJfDCHM7IEjoFxVLaJQ6qy.jpg",
      nomi: "iPhone 16",
      malumot: "A18 chip, kuchli kamera va zamonaviy dizayn.",
      xotiralar: [
        { nomi: "128 GB", narx: 799 },
        { nomi: "256 GB", narx: 899 },
        { nomi: "512 GB", narx: 1099 },
      ],
    },

    {
      id: 10,
      kategoriya: "iPhone",
      rasm: "/1726833134Qle5d2RP7rGf.webp",
      nomi: "iPhone 16 Plus",
      malumot: "Katta ekran, kuchli batareya va yuqori tezlik.",
      xotiralar: [
        { nomi: "128 GB", narx: 899 },
        { nomi: "256 GB", narx: 999 },
        { nomi: "512 GB", narx: 1199 },
      ],
    },

    {
      id: 11,
      kategoriya: "iPhone",
      rasm: "/565LWOwYhi08aIwD1g7c.png",
      nomi: "iPhone 15",
      malumot: "Zamonaviy dizayn, kuchli kamera va ajoyib ishlash.",
      xotiralar: [
        { nomi: "128 GB", narx: 699 },
        { nomi: "256 GB", narx: 799 },
        { nomi: "512 GB", narx: 999 },
      ],
    },

    {
      id: 12,
      kategoriya: "iPhone",
      rasm: "/orig.webp",
      nomi: "iPhone 15 Plus",
      malumot: "Katta ekran va uzoq vaqt ishlaydigan kuchli batareya.",
      xotiralar: [
        { nomi: "128 GB", narx: 799 },
        { nomi: "256 GB", narx: 899 },
        { nomi: "512 GB", narx: 1099 },
      ],
    },

   

    {
      id: 13,
      kategoriya: "Mac",
      rasm: "/1782271135253-dmry9v-md.avif",
      nomi: "MacBook Pro",
      malumot: "Professional ishlar uchun kuchli va tezkor noutbuk.",
      xotiralar: [
        { nomi: "1 TB", narx: 2000 },
        { nomi: "2 TB", narx: 2400 },
        { nomi: "4 TB", narx: 2800 },
        { nomi: "8 TB", narx: 3500 },
      ],
    },

    {
      id: 14,
      kategoriya: "Mac",
      rasm: "/noutbuk-apple-macbook-air-13-m3-256gb-space-grey.jpg",
      nomi: "MacBook Air",
      malumot: "Yengil, yupqa va kundalik foydalanish uchun qulay.",
      xotiralar: [
        { nomi: "512 GB", narx: 1200 },
        { nomi: "1 TB", narx: 1400 },
        { nomi: "2 TB", narx: 1700 },
        { nomi: "4 TB", narx: 2100 },
      ],
    },

    {
      id: 15,
      kategoriya: "Mac",
      rasm: "/mac-card-40-imac-202410_FMT_WHH.jpeg",
      nomi: "iMac",
      malumot: "Chiroyli dizayn va kuchli ishlash imkoniyatiga ega kompyuter.",
      xotiralar: [
        { nomi: "256 GB", narx: 1500 },
        { nomi: "512 GB", narx: 1700 },
        { nomi: "1 TB", narx: 2000 },
        { nomi: "2 TB", narx: 2400 },
      ],
    },

    {
      id: 16,
      kategoriya: "Mac",
      rasm: "/macbook-pro-16-inch-silve.webp",
      nomi: "MacBook Pro 16",
      malumot: "Professional ishlar uchun kuchli va yuqori unumdor noutbuk.",
      xotiralar: [
        { nomi: "512 GB", narx: 2499 },
        { nomi: "1 TB", narx: 2699 },
        { nomi: "2 TB", narx: 3099 },
      ],
    },

    {
      id: 17,
      kategoriya: "Mac",
      rasm: "/6dptc8y0i1p8uly6ik9swlpmmm21ki5q.webp",
      nomi: "MacBook Pro 14",
      malumot: "Kuchli protsessor va professional ishlash imkoniyati.",
      xotiralar: [
        { nomi: "512 GB", narx: 1999 },
        { nomi: "1 TB", narx: 2199 },
        { nomi: "2 TB", narx: 2599 },
      ],
    },

    {
      id: 18,
      kategoriya: "Mac",
      rasm: "/214tl1FpzT3AbgDAXhOTOZys33iOZu9U.png",
      nomi: "Mac mini",
      malumot: "Kichik o'lchamdagi kuchli va zamonaviy Mac kompyuter.",
      xotiralar: [
        { nomi: "256 GB", narx: 599 },
        { nomi: "512 GB", narx: 799 },
        { nomi: "1 TB", narx: 999 },
      ],
    },

    {
      id: 19,
      kategoriya: "Mac",
      rasm: "/m4-mac-studio.webp",
      nomi: "Mac Studio",
      malumot: "Professional ijodkorlar va dasturchilar uchun kuchli kompyuter.",
      xotiralar: [
        { nomi: "512 GB", narx: 1999 },
        { nomi: "1 TB", narx: 2199 },
        { nomi: "2 TB", narx: 2599 },
      ],
    },

    

    {
      id: 20,
      kategoriya: "Apple Watch",
      rasm: "/BXbK1EVopSIP0Z7I14lU7ee25iLygAaD.jpg",
      nomi: "Apple Watch Ultra",
      malumot: "Sport va faol hayot uchun kuchli aqlli soat.",
      narx: 799,
    },

    {
      id: 21,
      kategoriya: "Apple Watch",
      rasm: "/y7wGIY0rZ0cpnqF8fcQeDu8Dm5LtVdhz.jpg",
      nomi: "Apple Watch Series",
      malumot: "Sog'liq va kundalik faoliyatni kuzatish uchun aqlli soat.",
      narx: 499,
    },

    {
      id: 22,
      kategoriya: "Apple Watch",
      rasm: "/DpTb3oLUpmoKB3xYXgpM1POj5aKpPFsA (1).png",
      nomi: "Apple Watch Series 10",
      malumot: "Sog'liq, sport va kundalik faoliyatni kuzatish uchun aqlli soat.",
      narx: 429,
    },

    {
      id: 23,
      kategoriya: "iPad",
      rasm: "/w1pCSutmvTvWTIVhaa4CMbbelqzvBI8145AOp94M.jpg",
      nomi: "iPad Pro",
      malumot: "Katta ekran va professional ishlash imkoniyati.",
      xotiralar: [
        { nomi: "256 GB", narx: 1200 },
        { nomi: "512 GB", narx: 1400 },
        { nomi: "1 TB", narx: 1800 },
        { nomi: "2 TB", narx: 2200 },
      ],
    },

    {
      id: 24,
      kategoriya: "iPad",
      rasm: "/0pY4k8UZZ8sYuXbHiPhqhbjHEblsciA2.jpg",
      nomi: "iPad Air",
      malumot: "O'qish, ishlash va ijod uchun ajoyib planshet.",
      xotiralar: [
        { nomi: "128 GB", narx: 800 },
        { nomi: "256 GB", narx: 900 },
        { nomi: "512 GB", narx: 1100 },
      ],
    },

    {
      id: 25,
      kategoriya: "iPad",
      rasm: "/fgA6kqNRQHpBm8setIphiWbgNzxwtrgi.jpg",
      nomi: "iPad mini",
      malumot: "Ixcham o'lcham, kuchli ishlash va qulay foydalanish.",
      xotiralar: [
        { nomi: "128 GB", narx: 499 },
        { nomi: "256 GB", narx: 599 },
        { nomi: "512 GB", narx: 799 },
      ],
    },


    {
      id: 26,
      kategoriya: "AirPods",
      rasm: "/V6p40vksakkUY6c5zgvyh2FmlOChYHvc copy.jpg",
      nomi: "AirPods Pro",
      malumot: "Shovqinni kamaytirish va yuqori sifatli ovoz.",
      narx: 249,
    },

    {
      id: 27,
      kategoriya: "AirPods",
      rasm: "/49tIzNixJ2fKni6cxs52wVpKbowZeUDe.jpg",
      nomi: "AirPods Max",
      malumot: "Premium dizayn va yuqori sifatli ovoz.",
      narx: 549,
    },

    {
      id: 28,
      kategoriya: "AirPods",
      rasm: "/tQpYeVc1hRJZQTm0cAkTxcP0AzPV0yZPHMmcbrrb.jpg",
      nomi: "AirPods 4",
      malumot: "Yuqori sifatli ovoz va qulay simsiz foydalanish.",
      narx: 129,
    },

   

    {
      id: 29,
      kategoriya: "Aksessuarlar",
      rasm: "/MXCL3.jpeg",
      nomi: "Magic Keyboard",
      malumot: "Mac uchun qulay, zamonaviy va simsiz klaviatura.",
      narx: 99,
    },

    {
      id: 30,
      kategoriya: "Aksessuarlar",
      rasm: "/1778223866-1755589563-501eeb2e97c06f07449cd1b4f74855ff2025072917410937166MuSwMdQdzw.png",
      nomi: "Magic Mouse",
      malumot: "Mac uchun zamonaviy va qulay simsiz sichqoncha.",
      narx: 79,
    },

    {
      id: 31,
      kategoriya: "Aksessuarlar",
      rasm: "/apple-tv-4k-hero-select-202210_FMT_WHH.jpeg",
      nomi: "Apple TV 4K",
      malumot: "Yuqori sifatli video va ko'ngilochar kontent uchun qurilma.",
      narx: 129,
    },

    {
      id: 32,
      kategoriya: "Aksessuarlar",
      rasm: "/3132bc684fec4d36ab8a237bfc38b1df.webp",
      nomi: "Apple 20W USB-C Power Adapter",
      malumot: "iPhone va boshqa Apple qurilmalarini tez zaryadlash uchun adapter.",
      narx: 19,
    },

    {
      id: 33,
      kategoriya: "Aksessuarlar",
      rasm: "/qwwLmPrSeplLrJ2BAWPY.jpg",
      nomi: "USB-C to Lightning Cable",
      malumot: "Apple qurilmalarini zaryadlash va ulash uchun kabel.",
      narx: 19,
    },

    {
      id: 34,
      kategoriya: "Aksessuarlar",
      rasm: "/MU2G3.jpeg",
      nomi: "USB-C Charge Cable",
      malumot: "Qurilmalarni tez va qulay zaryadlash uchun USB-C kabel.",
      narx: 19,
    },

    {
      id: 35,
      kategoriya: "Aksessuarlar",
      rasm: "/images copy.jpeg",
      nomi: "MagSafe Charger",
      malumot: "iPhone uchun qulay simsiz MagSafe zaryadlagich.",
      narx: 39,
    },

    {
      id: 36,
      kategoriya: "Aksessuarlar",
      rasm: "/listings_0-8593baf9-b2af-4bd5-80e1-44b84b712b03-b682040c-53e8-46c3-9e51-2326d471870f.webp",
      nomi: "MagSafe Battery Pack",
      malumot: "iPhone uchun qulay va portativ qo'shimcha batareya.",
      narx: 99,
    },
     
  ];

  
  const kategoriyalar = [
    {
      nomi: "Barchasi",
      icon: <FaApple />,
    },
    {
      nomi: "iPhone",
      icon: <FaMobileAlt />,
    },
    {
      nomi: "Mac",
      icon: <FaLaptop />,
    },
    {
      nomi: "iPad",
      icon: <FaTabletAlt />,
    },
    {
      nomi: "AirPods",
      icon: <FaHeadphones />,
    },
    {
      nomi: "Apple Watch",
      icon: <FaClock />,
    },
    {
      nomi: "Aksessuarlar",
      icon: <FaBox />,
    },
  ];

  // =========================
  // NARX
  // =========================

  function formatPrice(narx) {
    if (i18n.language === "uz") {
      return `${(narx * 12000).toLocaleString("uz-UZ")} UZS`;
    }

    return `$${narx.toLocaleString("en-US")}`;
  }

  // =========================
  // MAHSULOT NARXI
  // =========================

  function getProductPrice(item) {
    if (item.xotiralar) {
      return item.xotiralar[0].narx;
    }

    return item.narx;
  }

  // =========================
  // SAVATGA QO'SHISH
  // =========================

  function handleAddToCart(item) {
    const narx = getProductPrice(item);

    addToCart({
      ...item,
      narx: narx,
      storage: item.xotiralar
        ? item.xotiralar[0].nomi
        : "",
    });
  }

  // =========================
  // FILTER
  // =========================

  const filteredProducts =
    activeCategory === "Barchasi"
      ? mahsulotlar
      : mahsulotlar.filter(
          (item) => item.kategoriya === activeCategory
        );

  // =========================
  // RETURN
  // =========================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-100 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* SARLAVHA */}

        <div className="text-center mb-14">

          <span className="inline-block text-blue-600 font-bold tracking-[5px] text-sm animate-pulse">
            APPLE STORE
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-4">
            {t("katalog")}
          </h1>

          <p className="text-gray-500 text-lg mt-4">
            {t("catalogText")}
          </p>

        </div>

        {/* KATEGORIYALAR */}

        <div className="mb-14">

          <div className="flex flex-wrap justify-center gap-4">

            {kategoriyalar.map((category) => (

              <button
                key={category.nomi}
                onClick={() =>
                  setActiveCategory(category.nomi)
                }
                className={`
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  px-6
                  py-4
                  rounded-2xl
                  font-bold
                  transition-all
                  duration-300

                  ${
                    activeCategory === category.nomi
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-300 scale-105"
                      : "bg-white text-gray-600 shadow-md hover:-translate-y-2 hover:shadow-xl hover:text-blue-600"
                  }
                `}
              >

                <span
                  className={`
                    text-xl
                    transition-transform
                    duration-300

                    ${
                      activeCategory === category.nomi
                        ? "scale-125 rotate-12"
                        : "group-hover:scale-125"
                    }
                  `}
                >
                  {category.icon}
                </span>

                <span>
                  {category.nomi}
                </span>

                {activeCategory === category.nomi && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-blue-600 rounded-full" />
                )}

              </button>

            ))}

          </div>

        </div>

        {/* MAHSULOTLAR */}

        <div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >

          {filteredProducts.map((item, index) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >

              {/* RASM */}

              <Link
                to={`/product/${item.id}`}
                state={item}
              >

                <div className="h-64 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6 cursor-pointer overflow-hidden">

                  <img
                    src={item.rasm}
                    alt={item.nomi}
                    className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
                  />

                </div>

              </Link>

              {/* MAHSULOT */}

              <div className="p-6">

                <h2 className="text-xl font-bold text-gray-900">
                  {item.nomi}
                </h2>

                <p className="text-gray-500 text-sm mt-3 min-h-[48px]">
                  {item.malumot}
                </p>

                {/* NARX */}

                <div className="mt-6">

                  <span className="text-2xl font-extrabold text-blue-600">
                    {formatPrice(
                      getProductPrice(item)
                    )}
                  </span>

                </div>

                {/* SAVAT */}

                <button
                  onClick={() =>
                    handleAddToCart(item)
                  }
                  className="w-full mt-5 flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
                >

                  <FaShoppingCart />

                  {t("addToCart")}

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}