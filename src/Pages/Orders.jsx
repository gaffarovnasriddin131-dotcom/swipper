import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const BACKEND_URL = "https://swipper-server.onrender.com";

const STATUS_OPTIONS = [
  { value: "pending", label: "pending" },
  { value: "completed", label: "completed" },
  { value: "delivered", label: "delivered" },
  { value: "cancelled", label: "cancelled" },
];

export default function Orders() {
  const { t, i18n } = useTranslation();
  const uz = i18n.language === "uz";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  function getToken() {
    return localStorage.getItem("adminToken");
  }

  async function fetchOrders() {
    setLoading(true);

    try {
      const token = getToken();

      const response = await fetch(`${BACKEND_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        console.error("BUYURTMALARNI OLISHDA XATOLIK:", data.message);
      }
    } catch (error) {
      console.error("BUYURTMALARNI OLISHDA XATOLIK:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(orderId, newStatus) {
    setUpdatingId(orderId);

    try {
      const token = getToken();

      const response = await fetch(
        `${BACKEND_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // ✅ TUZATILDI: "Bekor qilindi" tanlansa, ro'yxatdan olib tashlanadi
        if (newStatus === "cancelled") {
          setOrders((prev) =>
            prev.filter((order) => order._id !== orderId)
          );
        } else {
          setOrders((prev) =>
            prev.map((order) =>
              order._id === orderId
                ? { ...order, status: newStatus }
                : order
            )
          );
        }
      }
    } catch (error) {
      console.error("HOLATNI YANGILASHDA XATOLIK:", error);
    } finally {
      setUpdatingId(null);
    }
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

  // ✅ YANGI: sanani "Bugun / Kecha / to'liq sana" + soat:daqiqa shaklida ko'rsatish
  function formatOrderDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();

    const isSameDay = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const time = date.toLocaleTimeString(uz ? "uz-UZ" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isSameDay(date, now)) {
      return `${uz ? "Bugun" : "Today"}, ${time}`;
    }

    if (isSameDay(date, yesterday)) {
      return `${uz ? "Kecha" : "Yesterday"}, ${time}`;
    }

    const fullDate = date.toLocaleDateString(uz ? "uz-UZ" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return `${fullDate}, ${time}`;
  }

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-8">
        {t("orders")}
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-10">
          {t("sending")}
        </p>
      ) : orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 text-center text-gray-500 dark:text-gray-400">
          {t("emptyCart")}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-4 text-left text-gray-900 dark:text-white">
                    {t("customer")}
                  </th>

                  <th className="p-4 text-left text-gray-900 dark:text-white">
                    {t("product")}
                  </th>

                  <th className="p-4 text-left text-gray-900 dark:text-white">
                    {t("price")}
                  </th>

                  <th className="p-4 text-left text-gray-900 dark:text-white">
                    {uz ? "Sana" : "Date"}
                  </th>

                  <th className="p-4 text-left text-gray-900 dark:text-white">
                    {t("status")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-gray-100 dark:border-gray-700"
                  >
                    <td className="p-4">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </div>

                      <div className="text-sm text-gray-400">
                        {item.phone}
                      </div>
                    </td>

                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {item.products
                        ?.map((p) => p.name)
                        .join(", ")}
                    </td>

                    <td className="p-4 font-semibold text-gray-900 dark:text-white">
                      {item.total}
                    </td>

                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {formatOrderDate(item.createdAt)}
                    </td>

                    <td className="p-4">
                      <select
                        value={item.status || "pending"}
                        disabled={updatingId === item._id}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                        className={`text-xs font-bold px-3 py-2 rounded-full border-0 outline-none cursor-pointer disabled:opacity-50 ${statusBadgeClass(
                          item.status
                        )}`}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {t(opt.label)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}