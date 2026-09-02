import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaCheck,
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCommentDots,
} from "react-icons/fa";

const BACKEND_URL = "https://swipper-server.onrender.com";

export default function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}) {
  const { t, i18n } = useTranslation();

  const [showOrder, setShowOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [successNotification, setSuccessNotification] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const jami = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.narx || 0) * Number(item.quantity || 0),
    0
  );

  function narx(price) {
    const numberPrice = Number(price) || 0;

    if (i18n.language === "uz") {
      return `${(numberPrice * 12000).toLocaleString("uz-UZ")} UZS`;
    }

    return `$${numberPrice.toLocaleString("en-US")}`;
  }

  function handlePhoneChange(e) {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setPhone(onlyDigits.slice(0, 9));
  }

  async function handleOrder(e) {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !address.trim()
    ) {
      setMessage("❌ Barcha ma'lumotlarni to'ldiring");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      setMessage("❌ Email manzilini to'g'ri kiriting");
      return;
    }

    if (phone.trim().length !== 9) {
      setMessage("❌ Telefon raqamini to'liq kiriting");
      return;
    }

    if (!cart || cart.length === 0) {
      setMessage("❌ Savat bo'sh");
      return;
    }

    setLoading(true);
    setMessage("");

    const products = cart.map((item) => ({
      name: item.nomi || "Noma'lum mahsulot",
      storage: item.storage || "",
      quantity: Number(item.quantity) || 1,
      price: narx(item.narx),
    }));

    const orderData = {
      name: name.trim(),
      phone: `+998${phone.trim()}`,
      email: email.trim(),
      address: address.trim(),
      comment: comment.trim(),
      products,
      total: narx(jami),
    };

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Buyurtma yuborishda xatolik"
        );
      }

      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setComment("");
      setMessage("");

      clearCart();
      setShowOrder(false);

      setSuccessNotification(true);

      setTimeout(() => {
        setSuccessNotification(false);
      }, 4000);
    } catch (error) {
      console.error("ORDER XATOSI:", error);

      setMessage(
        `❌ ${
          error.message ||
          "Buyurtma yuborilmadi"
        }`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-8 sm:py-12 px-4 sm:px-6 transition-colors duration-300">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-8 sm:mb-10">

          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
              <FaShoppingCart size={26} />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            {t("cart")}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2 sm:mt-3">
            {cart.length} {t("products")}
          </p>

        </div>

        {cart.length === 0 ? (

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 sm:p-12 text-center">

            <FaShoppingCart
              size={60}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-6"
            />

            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-300">
              {t("emptyCart")}
            </h2>

          </div>

        ) : (

          <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">

            <div className="space-y-5">

              {cart.map((item) => (

                <div
                  key={`${item.id}-${item.storage || "default"}`}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-center gap-5 sm:gap-6"
                >

                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center p-4 shadow-sm flex-shrink-0">

                    <img
                      src={item.rasm}
                      alt={item.nomi}
                      className="max-w-full max-h-full object-contain"
                    />

                  </div>

                  <div className="flex-1 text-center lg:text-left min-w-0">

                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {item.nomi}
                    </h2>

                    {item.storage && (
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {item.storage}
                      </p>
                    )}

                    <p className="text-gray-900 dark:text-white font-bold text-lg mt-3">
                      {narx(item.narx)}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                    >
                      <FaMinus />
                    </button>

                    <span className="font-bold text-lg sm:text-xl w-7 sm:w-8 text-center text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg flex items-center justify-center hover:bg-black dark:hover:bg-gray-100 transition"
                    >
                      <FaPlus />
                    </button>

                  </div>

                  <div className="text-center min-w-0 lg:min-w-[150px]">

                    <p className="text-gray-500 dark:text-gray-400">
                      {t("total")}
                    </p>

                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-1">
                      {narx(
                        Number(item.narx || 0) *
                        Number(item.quantity || 0)
                      )}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                  >
                    <FaTrash />
                  </button>

                </div>

              ))}

            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

              <div className="text-center md:text-left">

                <p className="text-gray-500 dark:text-gray-400">
                  {t("total")}
                </p>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                  {narx(jami)}
                </h2>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowOrder(true);
                  setMessage("");
                }}
                className="w-full md:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-100 hover:scale-105 transition"
              >
                {t("checkout")}
              </button>

            </div>

          </div>

        )}

      </div>

   
      {showOrder && (

        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto modal-fade-in"
          onClick={() => {
            setShowOrder(false);
            setMessage("");
          }}
        >

          <div
            className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden my-4 modal-pop-in"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="h-1.5 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-gray-600 dark:via-white dark:to-gray-600" />

            <div className="p-6 sm:p-8">

              <div className="flex items-start justify-between mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-lg">
                  <FaShoppingCart className="text-lg" />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowOrder(false);
                    setMessage("");
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <FaTimes />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2 mt-2">
                {t("orderTitle")}
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                {t("orderDescription")}
              </p>

              <form
                onSubmit={handleOrder}
                className="space-y-4"
              >

                <div className="input-group relative">
                  <FaUser className="input-icon absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    placeholder={t("fullName")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gray-900 dark:focus:border-white focus:ring-4 focus:ring-gray-900/5 dark:focus:ring-white/10 transition-all duration-300"
                  />
                </div>

                <div className="input-group flex items-stretch border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden focus-within:border-gray-900 dark:focus-within:border-white focus-within:ring-4 focus-within:ring-gray-900/5 dark:focus-within:ring-white/10 transition-all duration-300 bg-gray-50 dark:bg-gray-700">

                  <span className="flex items-center gap-2 px-4 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white font-semibold border-r border-gray-200 dark:border-gray-600">
                    <FaPhone className="text-xs text-gray-400" />
                    +998
                  </span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="90 123 45 67"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={9}
                    className="flex-1 min-w-0 p-3.5 outline-none bg-transparent dark:text-white"
                  />

                </div>

                <div className="input-group relative">
                  <FaEnvelope className="input-icon absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gray-900 dark:focus:border-white focus:ring-4 focus:ring-gray-900/5 dark:focus:ring-white/10 transition-all duration-300"
                  />
                </div>

                <div className="input-group relative">
                  <FaMapMarkerAlt className="input-icon absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    placeholder={t("deliveryAddress")}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gray-900 dark:focus:border-white focus:ring-4 focus:ring-gray-900/5 dark:focus:ring-white/10 transition-all duration-300"
                  />
                </div>

                <div className="input-group relative">
                  <FaCommentDots className="input-icon absolute left-4 top-4 text-gray-400" />

                  <textarea
                    placeholder={t("orderComment")}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gray-900 dark:focus:border-white focus:ring-4 focus:ring-gray-900/5 dark:focus:ring-white/10 transition-all duration-300 resize-none"
                  />
                </div>

                {message && (
                  <div className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-2xl p-3 text-center font-semibold text-sm shake">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-2xl font-bold hover:bg-black dark:hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      {t("sending")}
                    </>
                  ) : (
                    t("placeOrder")
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowOrder(false);
                    setMessage("");
                  }}
                  className="w-full border border-gray-200 dark:border-gray-600 dark:text-white py-3.5 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {t("cancel")}
                </button>

              </form>

            </div>

          </div>

        </div>

      )}

      {successNotification && (

        <div className="fixed top-6 right-6 z-[200] w-[calc(100%-32px)] sm:w-[400px] animate-[slideIn_0.4s_ease-out]">

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-5 flex items-start gap-4">

            <div className="w-11 h-11 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0">
              <FaCheck />
            </div>

            <div className="flex-1">

              <h3 className="font-black text-gray-900 dark:text-white text-lg">
                Buyurtmangiz qabul qilindi
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Tez orada siz bilan bog‘lanamiz.
              </p>

            </div>

            <button
              onClick={() => setSuccessNotification(false)}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
            >
              <FaTimes />
            </button>

          </div>

        </div>

      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(40px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-fade-in {
          animation: modalFadeIn 0.25s ease-out both;
        }

        @keyframes modalPopIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-pop-in {
          animation: modalPopIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .input-group:focus-within .input-icon {
          color: currentColor;
          transform: translateY(-50%) scale(1.1);
        }

        .input-icon {
          transition: all 0.3s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .shake {
          animation: shake 0.35s ease-in-out;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid currentColor;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}