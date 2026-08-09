import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaStar,
} from "react-icons/fa";

const BACKEND_URL = "https://swipper-server.onrender.com";

export default function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const { t, i18n } = useTranslation();

  const [showOrder, setShowOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const jami = cart.reduce(
    (sum, item) =>
      sum + Number(item.narx || 0) * Number(item.quantity || 0),
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
      setMessage("❌ Email manzilini to'g'ri kiriting (masalan: ism@gmail.com)");
      return;
    }

    if (phone.trim().length !== 9) {
      setMessage("❌ Telefon raqamini to'liq kiriting (9 ta raqam)");
      return;
    }

    if (!cart || cart.length === 0) {
      setMessage("❌ Savat bo'sh");
      return;
    }

    setLoading(true);
    setMessage("⏳ Buyurtma yuborilmoqda...");

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

    console.log("Yuborilayotgan buyurtma:", orderData);

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

      console.log("Server javobi:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Buyurtma yuborishda xatolik"
        );
      }

      setMessage("✅ Buyurtma muvaffaqiyatli yuborildi!");

      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setComment("");

      setTimeout(() => {
        setShowOrder(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("ORDER XATOSI:", error);

      setMessage(
        `❌ ${error.message || "Buyurtma yuborilmadi"}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <FaShoppingCart size={30} />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900">
            {t("cart")}
          </h1>

          <p className="text-gray-500 mt-3">
            {cart.length} {t("products")}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <FaShoppingCart
              size={70}
              className="mx-auto text-gray-300 mb-6"
            />

            <h2 className="text-2xl font-bold text-gray-700">
              {t("emptyCart")}
            </h2>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">

            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.storage || "default"}`}
                  className="bg-gray-50 rounded-2xl p-5 flex flex-col lg:flex-row items-center gap-6"
                >
                  <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center p-4 shadow-sm">
                    <img
                      src={item.rasm}
                      alt={item.nomi}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-xl font-bold text-gray-900">
                      {item.nomi}
                    </h2>

                    {item.storage && (
                      <p className="text-gray-500 mt-2">
                        {item.storage}
                      </p>
                    )}

                    {item.rating > 0 && (
                      <div className="flex items-center justify-center lg:justify-start gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            size={16}
                            className={
                              star <= item.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}

                        <span className="text-sm text-gray-500 ml-2">
                          {item.rating}/5
                        </span>
                      </div>
                    )}

                    <p className="text-blue-600 font-bold text-lg mt-3">
                      {narx(item.narx)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition"
                    >
                      <FaMinus />
                    </button>

                    <span className="font-bold text-xl w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="text-center min-w-[150px]">
                    <p className="text-gray-500">
                      {t("total")}
                    </p>

                    <p className="text-xl font-bold text-blue-600 mt-1">
                      {narx(
                        Number(item.narx || 0) *
                        Number(item.quantity || 0)
                      )}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="w-11 h-11 rounded-xl bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

              <div className="text-center md:text-left">
                <p className="text-gray-500">
                  {t("total")}
                </p>

                <h2 className="text-4xl font-extrabold text-blue-600 mt-2">
                  {narx(jami)}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowOrder(true);
                  setMessage("");
                }}
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 hover:scale-105 transition"
              >
                {t("checkout")}
              </button>
            </div>
          </div>
        )}
      </div>

      {showOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-7">

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t("orderTitle")}
            </h2>

            <p className="text-gray-500 mb-6">
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
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500"
              />

              <div className="flex items-stretch border border-gray-300 rounded-xl overflow-hidden focus-within:border-blue-500">
                <span className="flex items-center px-3 bg-gray-100 text-gray-700 font-semibold border-r border-gray-300">
                  +998
                </span>

                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="90 123 45 67"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={9}
                  className="flex-1 p-3 outline-none"
                />
              </div>

              <input
                type="email"
                placeholder={t("email")}
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                placeholder={t("deliveryAddress")}
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500"
              />

              <textarea
                placeholder={t("orderComment")}
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                rows={3}
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500 resize-none"
              />

              {message && (
                <div className="bg-gray-100 rounded-xl p-3 text-center font-semibold">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50"
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
                className="w-full border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                {t("cancel")}
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}