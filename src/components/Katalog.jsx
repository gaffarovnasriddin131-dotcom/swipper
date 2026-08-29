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
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addedId, setAddedId] = useState(null);

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
            malumot: {
              uz: item.descriptionUz || "",
              en: item.descriptionEn || item.descriptionUz || "",
            },
            xotiralar: item.xotiralar || [],
          }));

          setAdminProducts(formatted);
        }
      })
      .catch((error) =>
        console.error("MAHSULOTLARNI OLISHDA XATOLIK:", error)
      )
      .finally(() => setLoadingProducts(false));
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
    if (item.xotiralar && item.xotiralar.length > 0) {
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
      storage:
        item.xotiralar && item.xotiralar.length > 0
          ? item.xotiralar[0].nomi
          : "",
    });

    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  const allProducts = [...mahsulotlar, ...adminProducts];

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter(
          (item) => item.kategoriya === activeCategory
        );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-6 transition-colors duration-300 overflow-hidden">

      {/* ===== HARAKATLANUVCHI FON ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="floating-blob absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-gray-200/30 dark:bg-gray-800/20 blur-3xl" />
        <div className="floating-blob-delayed absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gray-100/40 dark:bg-gray-900/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        <div className="text-center mb-14 fade-up">

          <span className="inline-block text-gray-500 dark:text-gray-400 font-bold tracking-[5px] text-sm animate-pulse">
            APPLE STORE
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-4 gradient-text">
            {t("katalog")}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg mt-4">
            {t("catalogText")}
          </p>

        </div>

        <div className="mb-14 fade-up" style={{ animationDelay: "150ms" }}>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">

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
                  px-5 sm:px-6
                  py-3.5 sm:py-4
                  rounded-2xl
                  font-bold
                  transition-all
                  duration-300
                  hover:-translate-y-0.5

                  ${
                    activeCategory === category.nomi
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg shadow-gray-900/20 dark:shadow-white/10 scale-105"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:shadow-md"
                  }
                `}
              >

                <span
                  className={`text-xl transition-transform duration-300 ${
                    activeCategory === category.nomi
                      ? "scale-110"
                      : "group-hover:scale-110"
                  }`}
                >
                  {category.icon}
                </span>

                <span>
                  {t(category.label)}
                </span>

              </button>

            ))}

          </div>

        </div>

        {loadingProducts && adminProducts.length === 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="skeleton-card bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="h-64 skeleton-shimmer" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-3/4 rounded-lg skeleton-shimmer" />
                  <div className="h-4 w-full rounded-lg skeleton-shimmer" />
                  <div className="h-8 w-1/2 rounded-lg skeleton-shimmer mt-4" />
                </div>
              </div>
            ))}
          </div>

        ) : (

          <div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >

            {filteredProducts.map((item, index) => (

              <div
                key={item.id}
                className="product-card-in bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
                style={{
                  animationDelay: `${Math.min(index, 12) * 60}ms`,
                }}
              >

                <Link
                  to={`/product/${item.id}`}
                  state={item}
                >

                  <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-6 cursor-pointer overflow-hidden relative">

                    <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/5 dark:group-hover:from-white/5 transition-all duration-500" />

                    <img
                      src={item.rasm}
                      alt={item.nomi}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
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

                    <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                      {formatPrice(
                        getProductPrice(item)
                      )}
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      handleAddToCart(item)
                    }
                    className={`w-full mt-5 flex items-center justify-center gap-3 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg ${
                      addedId === item.id
                        ? "bg-green-600 text-white scale-105"
                        : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 hover:scale-105 active:scale-95"
                    }`}
                  >

                    {addedId === item.id ? (
                      <>✓ {t("addToCart")}</>
                    ) : (
                      <>
                        <FaShoppingCart />
                        {t("addToCart")}
                      </>
                    )}

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        {!loadingProducts && filteredProducts.length === 0 && (
          <div className="text-center py-20 fade-up">
            <FaBox className="text-6xl text-gray-200 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 dark:text-gray-500 text-lg">
              {t("emptyCart")}
            </p>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fadeUp 0.7s ease-out both;
        }

        @keyframes productCardIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .product-card-in {
          animation: productCardIn 0.5s ease-out both;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(25px, -25px) scale(1.05);
          }
        }

        .floating-blob {
          animation: float 14s ease-in-out infinite;
        }

        .floating-blob-delayed {
          animation: float 17s ease-in-out infinite;
          animation-delay: -6s;
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

        .skeleton-card {
          animation: fadeUp 0.4s ease-out both;
        }

        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.06) 25%,
            rgba(0, 0, 0, 0.1) 37%,
            rgba(0, 0, 0, 0.06) 63%
          );
          background-size: 400% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }

        .dark .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.06) 25%,
            rgba(255, 255, 255, 0.12) 37%,
            rgba(255, 255, 255, 0.06) 63%
          );
          background-size: 400% 100%;
        }

        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
      `}</style>

    </div>
  );
}