import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaStar,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";

import { mahsulotlar } from "../data/products";

const BACKEND_URL = "https://swipper-server.onrender.com";

export default function ProductDetail({ addToCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const [product, setProduct] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [notFound, setNotFound] = useState(false);

  const [storage, setStorage] = useState(
    location.state?.xotiralar?.[0]?.nomi || ""
  );

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (location.state) {
      setProduct(location.state);

      setStorage(
        location.state.xotiralar?.[0]?.nomi || ""
      );

      const savedRating = localStorage.getItem(
        `rating-${location.state.id}`
      );

      setRating(savedRating ? Number(savedRating) : 0);

      setLoading(false);

      return;
    }

    const staticProduct = mahsulotlar.find(
      (item) => String(item.id) === String(id)
    );

    if (staticProduct) {
      setProduct(staticProduct);

      setStorage(
        staticProduct.xotiralar?.[0]?.nomi || ""
      );

      const savedRating = localStorage.getItem(
        `rating-${staticProduct.id}`
      );

      setRating(savedRating ? Number(savedRating) : 0);

      setLoading(false);

      return;
    }

    fetch(`${BACKEND_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const found = data.products.find(
            (item) => item._id === id
          );

          if (found) {
            const formatted = {
              id: found._id,
              kategoriya: found.category,
              rasm: found.image,
              nomi: found.name,
              malumot: found.description || "",
              narx:
                Number(
                  String(found.price).replace(/\D/g, "")
                ) || 0,
            };

            setProduct(formatted);

            const savedRating = localStorage.getItem(
              `rating-${formatted.id}`
            );

            setRating(
              savedRating ? Number(savedRating) : 0
            );
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{t("sending")}</p>
      </div>
    );
  }

  if (notFound || !product) {
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