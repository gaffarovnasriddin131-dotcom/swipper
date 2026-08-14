import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { mahsulotlar } from "../data/products";

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

  const [activeCategory, setActiveCategory] = useState("all");
  const [adminProducts, setAdminProducts] = useState([]);

  useEffect(() => {
    fetch("https://swipper-server.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const formatted = data.products.map((item) => ({
            id: item._id,
            kategoriya: item.category,
            rasm: item.image,
            nomi: item.name,
            malumot: item.description || "",
            narx: Number(String(item.price).replace(/\D/g, "")) || 0,
          }));

          setAdminProducts(formatted);
        }
      })
      .catch((error) =>
        console.error("MAHSULOTLARNI OLISHDA XATOLIK:", error)
      );
  }, []);

  const kategoriyalar = [
    {
      nomi: "all",
      icon: <FaApple />,
      label: "all",
    },
    {
      nomi: "iPhone",
      icon: <FaMobileAlt />,
      label: "iphone",
    },
    {
      nomi: "Mac",
      icon: <FaLaptop />,
      label: "mac",
    },
    {
      nomi: "iPad",
      icon: <FaTabletAlt />,
      label: "ipad",
    },
    {
      nomi: "AirPods",
      icon: <FaHeadphones />,
      label: "airpods",
    },
    {
      nomi: "Apple Watch",
      icon: <FaClock />,
      label: "appleWatch",
    },
    {
      nomi: "Aksessuarlar",
      icon: <FaBox />,
      label: "accessories",
    },
  ];

  function formatPrice(narx) {
    if (i18n.language === "uz") {
      return `${(narx * 12000).toLocaleString("uz-UZ")} UZS`;
    }

    return `$${narx.toLocaleString("en-US")}`;
  }

  function getProductPrice(item) {
    if (item.xotiralar) {
      return item.xotiralar[0].narx;
    }

    return item.narx;
  }

  function getDescription(item) {
    if (item.malumot && typeof item.malumot === "object") {
      return item.malumot[i18n.language] || item.malumot.uz;
    }

    return item.malumot;
  }

  function handleAddToCart(item) {
    const narx = getProductPrice(item);

    addToCart({
      ...item,
      narx: narx,
      malumot: getDescription(item),
      storage: item.xotiralar
        ? item.xotiralar[0].nomi
        : "",
    });
  }

  const allProducts = [...mahsulotlar, ...adminProducts];

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter(
          (item) => item.kategoriya === activeCategory
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-6 transition-colors duration-300">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <span className="inline-block text-blue-600 font-bold tracking-[5px] text-sm animate-pulse">
            APPLE STORE
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-4">
            {t("katalog")}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg mt-4">
            {t("catalogText")}
          </p>

        </div>

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
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }
                `}
              >

                <span className="text-xl">
                  {category.icon}
                </span>

                <span>
                  {t(category.label)}
                </span>

              </button>

            ))}

          </div>

        </div>

        <div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >

          {filteredProducts.map((item, index) => (

            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >

              <Link
                to={`/product/${item.id}`}
                state={item}
              >

                <div className="h-64 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-6 cursor-pointer overflow-hidden">

                  <img
                    src={item.rasm}
                    alt={item.nomi}
                    className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
                  />

                </div>

              </Link>

              <div className="p-6">

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.nomi}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 min-h-[48px]">
                  {getDescription(item)}
                </p>

                <div className="mt-6">

                  <span className="text-2xl font-extrabold text-blue-600">
                    {formatPrice(
                      getProductPrice(item)
                    )}
                  </span>

                </div>

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