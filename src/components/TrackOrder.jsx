import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch, FaBoxOpen, FaPhone } from "react-icons/fa";

const BACKEND_URL = "https://swipper-server.onrender.com";

export default function TrackOrder() {
  const { i18n } = useTranslation();
  const uz = i18n.language === "uz";

  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const text = {
    title: uz ? "Buyurtmani kuzatish" : "Track Your Order",
    subtitle: uz
      ? "Buyurtma berganda kiritgan telefon raqamingizni kiriting"
      : "Enter the phone number you used when placing the order",
    placeholder: "90 123 45 67",
    button: uz ? "Qidirish" : "Search",
    searching: uz ? "Qidirilmoqda..." : "Searching...",
    notFound: uz
      ? "Bu raqam bo'yicha buyurtma topilmadi"
      : "No orders found for this number",
    invalidPhone: uz
      ? "Telefon raqamini to'liq kiriting"
      : "Enter a complete phone number",
    orderFrom: uz ? "Buyurtma sanasi" : "Order date",
    products: uz ? "Mahsulotlar" : "Products",
    total: uz ? "Jami" : "Total",
    status: uz ? "Holat" : "Status",
    statusLabels: {
      pending: uz ? "Kutilmoqda" : "Pending",
      completed: uz ? "Bajarildi" : "Completed",
      delivered: uz ? "Yetkazildi" : "Delivered",
      cancelled: uz ? "Bekor qilindi" : "Cancelled",
    },
  };

  function handlePhoneChange(e) {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setPhone(onlyDigits.slice(0, 9));
  }

  function statusBadgeClass(status) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
      case "delivered":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";
    }
  }

  async function handleSearch(e) {
    e.preventDefault();

    if (phone.length !== 9) {
      setError(text.invalidPhone);
      return;
    }

    setError("");
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/orders/track/${phone}`
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("TRACK XATOSI:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(uz ? "uz-UZ" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-4 sm:px-6 transition-colors duration-300 overflow-hidden">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="floating-blob absolute -top-20 -left-20 w-[350px] h-[350px] rounded-full bg-gray-200/30 dark:bg-gray-800/20 blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto">

        <div className="text-center mb-10 fade-up">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-xl mx-auto mb-6">
            <FaBoxOpen className="text-2xl" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            {text.title}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            {text.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="fade-up bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 mb-8"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-stretch border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden focus-within:border-gray-900 dark:focus-within:border-white focus-within:ring-4 focus-within:ring-gray-900/5 dark:focus-within:ring-white/10 transition-all duration-300 bg-gray-50 dark:bg-gray-700 mb-4">

            <span className="flex items-center gap-2 px-4 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white font-semibold border-r border-gray-200 dark:border-gray-600">
              <FaPhone className="text-xs text-gray-400" />
              +998
            </span>

            <input
              type="tel"
              inputMode="numeric"
              placeholder={text.placeholder}
              value={phone}
              onChange={handlePhoneChange}
              maxLength={9}
              className="flex-1 min-w-0 p-3.5 outline-none bg-transparent dark:text-white"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center shake">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-2xl font-bold hover:bg-black dark:hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <>
                <span className="spinner" />
                {text.searching}
              </>
            ) : (
              <>
                <FaSearch />
                {text.button}
              </>
            )}
          </button>
        </form>

        {searched && !loading && orders && orders.length === 0 && (
          <div className="fade-up bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 text-center">
            <FaBoxOpen className="text-5xl text-gray-200 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 dark:text-gray-500">
              {text.notFound}
            </p>
          </div>
        )}

        {orders && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="order-card-in bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                      {text.orderFrom}
                    </p>
                    <p className="text-gray-900 dark:text-white font-semibold mt-1">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-2 rounded-full ${statusBadgeClass(
                      order.status
                    )}`}
                  >
                    {text.statusLabels[order.status] ||
                      text.statusLabels.pending}
                  </span>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">
                    {text.products}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {order.products
                      ?.map(
                        (p) =>
                          `${p.name}${
                            p.storage ? ` (${p.storage})` : ""
                          }`
                      )
                      .join(", ")}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {text.total}
                  </span>
                  <span className="font-black text-lg text-gray-900 dark:text-white">
                    {order.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up {
          animation: fadeUp 0.6s ease-out both;
        }

        @keyframes orderCardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .order-card-in {
          animation: orderCardIn 0.5s ease-out both;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }

        .floating-blob {
          animation: float 13s ease-in-out infinite;
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
