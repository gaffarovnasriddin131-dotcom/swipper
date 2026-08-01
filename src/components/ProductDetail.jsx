import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaStar,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";

export default function ProductDetail({ addToCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const product = location.state;

  const [storage, setStorage] = useState(
    product?.xotiralar?.[0]?.nomi || ""
  );

  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem(
      `rating-${product?.id}`
    );

    return savedRating ? Number(savedRating) : 0;
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/katalog")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          {t("productBack")}
        </button>
      </div>
    );
  }

  function getDescription() {
    if (product.malumot && typeof product.malumot === "object") {
      return product.malumot[i18n.language] || product.malumot.uz;
    }

    return product.malumot;
  }

  function formatPrice(price) {
    if (i18n.language === "uz") {
      return `${(price * 12000).toLocaleString("uz-UZ")} UZS`;
    }

    return `$${price.toLocaleString("en-US")}`;
  }

  function getCurrentPrice() {
    if (product.xotiralar) {
      const selectedStorage = product.xotiralar.find(
        (item) => item.nomi === storage
      );

      return selectedStorage
        ? selectedStorage.narx
        : product.xotiralar[0].narx;
    }

    return product.narx;
  }

  function handleAddToCart() {
    const currentPrice = getCurrentPrice();

    addToCart({
      ...product,
      narx: currentPrice,
      malumot: getDescription(),
      storage: storage,
      rating: rating,
    });

    navigate("/cart");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-100 py-12 px-6">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/katalog")}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-blue-600 font-semibold"
        >
          <FaArrowLeft />
          {t("productBack")}
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

          <div className="min-h-[550px] bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-10">

            <img
              src={product.rasm}
              alt={product.nomi}
              className="max-w-full max-h-[500px] object-contain hover:scale-105 transition duration-500"
            />

          </div>

          <div className="p-8 md:p-12">

            <span className="text-blue-600 font-bold tracking-[4px]">
              APPLE STORE
            </span>

            <h1 className="text-4xl font-extrabold text-gray-900 mt-4">
              {product.nomi}
            </h1>

            <p className="text-gray-500 text-lg mt-5 leading-8">
              {getDescription()}
            </p>

            {product.xotiralar && (
              <div className="mt-8">

                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t("selectStorage")}
                </h3>

                <div className="flex flex-wrap gap-3">

                  {product.xotiralar.map((item) => (
                    <button
                      key={item.nomi}
                      onClick={() => setStorage(item.nomi)}
                      className={`px-5 py-3 rounded-xl border-2 font-semibold transition ${
                        storage === item.nomi
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 text-gray-700 hover:border-blue-500"
                      }`}
                    >
                      {item.nomi}
                    </button>
                  ))}

                </div>

              </div>
            )}

            <div className="mt-8">

              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {t("rateProduct")}
              </h3>

              <div className="flex items-center gap-2">

                {[1, 2, 3, 4, 5].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setRating(item);
                      localStorage.setItem(
                        `rating-${product.id}`,
                        item
                      );
                    }}
                    className="hover:scale-125 transition"
                  >
                    <FaStar
                      size={35}
                      className={
                        item <= rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}

              </div>

              <p className="text-gray-500 mt-3">
                {rating === 0
                  ? t("selectRating")
                  : `${t("yourRating")}: ${rating} / 5`}
              </p>

            </div>

            <div className="mt-8">

              <p className="text-4xl font-extrabold text-blue-600">
                {formatPrice(getCurrentPrice())}
              </p>

              {storage && (
                <p className="text-gray-500 mt-2">
                  {t("selectedStorage")}: {storage}
                </p>
              )}

            </div>

            <button
              onClick={handleAddToCart}
              className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 hover:scale-105 transition"
            >
              <FaShoppingCart />
              {t("addToCart")}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}