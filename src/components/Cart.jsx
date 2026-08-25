import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaCheck,
  FaTimes,
  FaMoneyBillWave,
  FaCreditCard,
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

  const [orderNumber, setOrderNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const [lastPaymentMethod, setLastPaymentMethod] = useState("");

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

  function generateOrderNumber() {
    return `#${Math.floor(1000 + Math.random() * 9000)}`;
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

    const newOrderNumber = generateOrderNumber();

    const products = cart.map((item) => ({
      name: item.nomi || "Noma'lum mahsulot",
      storage: item.storage || "",
      quantity: Number(item.quantity) || 1,
      price: narx(item.narx),
    }));

    const orderData = {
      orderNumber: newOrderNumber,
      name: name.trim(),
      phone: `+998${phone.trim()}`,
      email: email.trim(),
      address: address.trim(),
      comment: comment.trim(),
      paymentMethod,
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

      setOrderNumber(newOrderNumber);
      setLastPaymentMethod(paymentMethod);

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
      }, 5000);
    } catch (error) {
      console.error("ORDER XATOSI:", error);

      setMessage(
        `❌ ${
          error.message || "Buyurtma yuborilmadi"
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
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 text-center shadow-lg">
            <FaShoppingCart className="mx-auto text-5xl text-gray-300 dark:text-gray-700 mb-5" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("emptyCart")}
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              {t("emptyCartText")}
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.storage || ""}`}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-800"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={item.rasm}
                      alt={item.nomi}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-2xl bg-gray-100 dark:bg-gray-800"
                    />

                    <div className="flex-1 min-w-0">

                      <h3 className="font-bold text-gray-900 dark:text-white truncate">
                        {item.nomi}
                      </h3>

                      {item.storage && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {t("storage")}: {item.storage}
                        </p>
                      )}

                      <p className="font-bold text-gray-900 dark:text-white mt-2">
                        {narx(item.narx)}
                      </p>

                    </div>

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      >
                        <FaMinus size={11} />
                      </button>

                      <span className="font-bold min-w-6 text-center text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      >
                        <FaPlus size={11} />
                      </button>

                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-9 h-9 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950 flex items-center justify-center transition"
                    >
                      <FaTrash size={14} />
                    </button>

                  </div>

                </div>
              ))}

            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 h-fit">

              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                {t("total")}
              </h2>

              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 dark:text-gray-400">
                  {t("total")}
                </span>

                <span className="text-2xl font-black text-gray-900 dark:text-white">
                  {narx(jami)}
                </span>
              </div>

              <button
                onClick={() => {
                  setShowOrder(true);
                  setMessage("");
                }}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
              >
                {t("orderNow")}
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-3 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {t("remove")}
              </button>

            </div>

          </div>
        )}

        {showOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[150] p-4">

            <div className="bg-white dark:bg-gray-800 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl shadow-2xl">

              <div className="flex items-center justify-between mb-2">

                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                  {t("orderTitle")}
                </h2>

                <button
                  onClick={() => {
                    setShowOrder(false);
                    setMessage("");
                  }}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <FaTimes />
                </button>

              </div>

              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {t("orderDescription")}
              </p>

              <form
                onSubmit={handleOrder}
                className="space-y-4"
              >

                <input
                  type="text"
                  placeholder={t("fullName")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white"
                />

                <div className="flex items-stretch border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden focus-within:border-gray-900 dark:focus-within:border-white">

                  <span className="flex items-center px-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white font-semibold border-r border-gray-300 dark:border-gray-600">
                    +998
                  </span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="90 123 45 67"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={9}
                    className="flex-1 min-w-0 p-3 outline-none dark:bg-gray-700 dark:text-white"
                  />

                </div>

                <input
                  type="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white"
                />

                <input
                  type="text"
                  placeholder={t("deliveryAddress")}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white"
                />

                <textarea
                  placeholder={t("orderComment")}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white resize-none"
                />

                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-3">
                    To‘lov usuli
                  </p>

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${
                        paymentMethod === "cash"
                          ? "border-black dark:border-white bg-gray-100 dark:bg-gray-700"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <FaMoneyBillWave className="text-green-500 text-2xl" />

                      <span className="font-bold text-gray-900 dark:text-white">
                        💵 Naqd
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("click")}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${
                        paymentMethod === "click"
                          ? "border-black dark:border-white bg-gray-100 dark:bg-gray-700"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <FaCreditCard className="text-blue-500 text-2xl" />

                      <span className="font-bold text-gray-900 dark:text-white">
                        💳 Click
                      </span>
                    </button>

                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 flex justify-between items-center">

                  <span className="text-gray-500 dark:text-gray-300">
                    {t("total")}
                  </span>

                  <span className="text-xl font-black text-gray-900 dark:text-white">
                    {narx(jami)}
                  </span>

                </div>

                {paymentMethod === "click" && (
                  <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-2xl p-4 text-sm text-blue-700 dark:text-blue-300">
                    💳 Click orqali to‘lov tanlandi. Buyurtma yuborilgandan keyin Click to‘lov tizimi ulanadi.
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-900 rounded-2xl p-4 text-sm text-green-700 dark:text-green-300">
                    💵 Naqd to‘lov tanlandi. To‘lov buyurtma yetkazilganda amalga oshiriladi.
                  </div>
                )}

                {message && (
                  <div className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl p-3 text-center font-semibold text-sm">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-100 transition disabled:opacity-50"
                >
                  {loading
                    ? t("sending")
                    : t("placeOrder")}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowOrder(false);
                    setMessage("");
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:text-white py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {t("cancel")}
                </button>

              </form>

            </div>

          </div>
        )}

        {successNotification && (
          <div className="fixed top-6 right-6 z-[200] w-[calc(100%-32px)] sm:w-[400px]">

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-5">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-full bg-green-100 dark:bg-green-950 text-green-600 flex items-center justify-center shrink-0">
                  <FaCheck />
                </div>

                <div className="flex-1">

                  <h3 className="font-black text-gray-900 dark:text-white text-lg">
                    ✓ Buyurtmangiz qabul qilindi!
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Buyurtma raqami:{" "}
                    <span className="font-bold text-gray-900 dark:text-white">
                      {orderNumber}
                    </span>
                  </p>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    To‘lov:{" "}
                    <span className="font-bold text-gray-900 dark:text-white">
                      {lastPaymentMethod === "click"
                        ? "💳 Click"
                        : "💵 Naqd"}
                    </span>
                  </p>

                </div>

                <button
                  onClick={() => setSuccessNotification(false)}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  <FaTimes />
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}