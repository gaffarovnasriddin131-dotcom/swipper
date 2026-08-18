import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaStar,
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

  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    if (location.state) {
      setProduct(location.state);

      setStorage(
        location.state.xotiralar?.[0]?.nomi || ""
      );

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

  useEffect(() => {
    if (!product) {
      return;
    }

    fetch(`${BACKEND_URL}/api/ratings/${product.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAverageRating(data.average);
          setRatingCount(data.count);
        }
      })
      .catch((error) =>
        console.error("BAHOLARNI OLISHDA XATOLIK:", error)
      );

    const rated = localStorage.getItem(`rated-${product.id}`);

    if (rated) {
      setHasRated(true);
      setMyRating(Number(rated));
    } else {
      setHasRated(false);
      setMyRating(0);
    }
  }, [product]);

  async function handleRate(stars) {
    if (hasRated || !product) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          stars,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAverageRating(data.average);
        setRatingCount(data.count);
        setMyRating(stars);
        setHasRated(true);

        localStorage.setItem(`rated-${product.id}`, stars);
      }
    } catch (error) {
      console.error("BAHO YUBORISHDA XATOLIK:", error);
    }
  }

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
          className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl"
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
    });

    navigate("/cart");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-6 transition-colors duration-300">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/katalog")}
          className="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold"
        >
          <FaArrowLeft />
          {t("productBack")}
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

          <div className="min-h-[550px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-10">

            <img
              src={product.rasm}
              alt={product.nomi}
              className="max-w-full max-h-[500px] object-contain hover:scale-105 transition duration-500"
            />

          </div>

          <div className="p-8 md:p-12">

            <span className="text-gray-500 dark:text-gray-400 font-bold tracking-[4px]">
              APPLE STORE
            </span>

            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-4">
              {product.nomi}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-lg mt-5 leading-8">
              {getDescription()}
            </p>

            {product.xotiralar && (
              <div className="mt-8">

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {t("selectStorage")}
                </h3>

                <div className="flex flex-wrap gap-3">

                  {product.xotiralar.map((item) => (
                    <button
                      key={item.nomi}
                      onClick={() => setStorage(item.nomi)}
                      className={`px-5 py-3 rounded-xl border-2 font-semibold transition ${
                        storage === item.nomi
                          ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-500 dark:hover:border-gray-400"
                      }`}
                    >
                      {item.nomi}
                    </button>
                  ))}

                </div>

              </div>
            )}

            <div className="mt-8">

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {t("rateProduct")}
              </h3>

              <div className="flex items-center gap-2 mb-2">

                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={22}
                    className={
                      star <= Math.round(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}

                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                  {averageRating.toFixed(1)} ({ratingCount})
                </span>

              </div>

              {hasRated ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("yourRating")}: {myRating}/5
                </p>
              ) : (
                <div className="flex items-center gap-2">

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t("selectRating")}:
                  </span>

                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRate(star)}
                      className="hover:scale-125 transition"
                    >
                      <FaStar
                        size={20}
                        className="text-gray-300 hover:text-yellow-400"
                      />
                    </button>
                  ))}

                </div>
              )}

            </div>

            <div className="mt-8">

              <p className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {formatPrice(getCurrentPrice())}
              </p>

              {storage && (
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {t("selectedStorage")}: {storage}
                </p>
              )}

            </div>

            <button
              onClick={handleAddToCart}
              className="w-full mt-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-black dark:hover:bg-gray-100 hover:scale-105 transition"
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