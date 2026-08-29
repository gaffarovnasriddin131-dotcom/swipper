import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaStar,
  FaCheck,
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
  const [hoveredStar, setHoveredStar] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [priceKey, setPriceKey] = useState(0);

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
              malumot: {
                uz: found.descriptionUz || "",
                en: found.descriptionEn || found.descriptionUz || "",
              },
              xotiralar: found.xotiralar || [],
            };

            setProduct(formatted);

            setStorage(
              formatted.xotiralar?.[0]?.nomi || ""
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="loader-ring" />
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {t("sending")}
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/katalog")}
          className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl hover:scale-105 transition"
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
    if (product.xotiralar && product.xotiralar.length > 0) {
      const selectedStorage = product.xotiralar.find(
        (item) => item.nomi === storage
      );

      return selectedStorage
        ? selectedStorage.narx
        : product.xotiralar[0].narx;
    }

    return product.narx;
  }

  function handleStorageSelect(nomi) {
    setStorage(nomi);
    setPriceKey((prev) => prev + 1);
  }

  function handleAddToCart() {
    const currentPrice = getCurrentPrice();

    addToCart({
      ...product,
      narx: currentPrice,
      malumot: getDescription(),
      storage: storage,
    });

    setJustAdded(true);

    setTimeout(() => {
      navigate("/cart");
    }, 500);
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-6 transition-colors duration-300 overflow-hidden">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="floating-blob absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gray-200/30 dark:bg-gray-800/20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/katalog")}
          className="fade-up flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold group transition"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          {t("productBack")}
        </button>

        <div className="fade-up-delay bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

          <div className="min-h-[400px] md:min-h-[550px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-10 relative overflow-hidden">

            <div className="image-glow absolute w-72 h-72 rounded-full bg-white/40 dark:bg-white/5 blur-3xl" />

            <img
              src={product.rasm}
              alt={product.nomi}
              className="relative max-w-full max-h-[500px] object-contain hover:scale-105 transition duration-500 product-image-in"
            />

          </div>

          <div className="p-8 md:p-12">

            <span className="text-gray-500 dark:text-gray-400 font-bold tracking-[4px] text-sm">
              APPLE STORE
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-4">
              {product.nomi}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-lg mt-5 leading-8">
              {getDescription()}
            </p>

            {product.xotiralar && product.xotiralar.length > 0 && (
              <div className="mt-8">

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {t("selectStorage")}
                </h3>

                <div className="flex flex-wrap gap-3">

                  {product.xotiralar.map((item) => (
                    <button
                      key={item.nomi}
                      onClick={() => handleStorageSelect(item.nomi)}
                      className={`px-5 py-3 rounded-xl border-2 font-semibold transition-all duration-300 ${
                        storage === item.nomi
                          ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900 scale-105 shadow-lg"
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-500 dark:hover:border-gray-400 hover:-translate-y-0.5"
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
                    className={`transition-all duration-200 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}

                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                  {averageRating.toFixed(1)} ({ratingCount})
                </span>

              </div>

              {hasRated ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <FaCheck className="text-green-500" />
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
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="hover:scale-125 transition-transform duration-200"
                    >
                      <FaStar
                        size={20}
                        className={
                          star <= hoveredStar
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }
                      />
                    </button>
                  ))}

                </div>
              )}

            </div>

            <div className="mt-8">

              <p
                key={priceKey}
                className="text-4xl font-extrabold text-gray-900 dark:text-white price-pop"
              >
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
              disabled={justAdded}
              className={`w-full mt-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${
                justAdded
                  ? "bg-green-600 text-white scale-[1.02]"
                  : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {justAdded ? (
                <>
                  <FaCheck /> {t("addToCart")}
                </>
              ) : (
                <>
                  <FaShoppingCart />
                  {t("addToCart")}
                </>
              )}
            </button>

          </div>

        </div>

      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up {
          animation: fadeUp 0.6s ease-out both;
        }

        .fade-up-delay {
          animation: fadeUp 0.7s ease-out 0.1s both;
        }

        @keyframes productImageIn {
          from {
            opacity: 0;
            transform: scale(0.85) rotate(-3deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .product-image-in {
          animation: productImageIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes imageGlowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .image-glow {
          animation: imageGlowPulse 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }

        .floating-blob {
          animation: float 13s ease-in-out infinite;
        }

        @keyframes pricePop {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(-6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .price-pop {
          animation: pricePop 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .loader-ring {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0,0,0,0.1);
          border-top-color: currentColor;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          color: #111;
        }

        .dark .loader-ring {
          color: #fff;
          border-color: rgba(255,255,255,0.1);
          border-top-color: #fff;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}