import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaBox,
  FaShoppingCart,
  FaEye,
  FaDollarSign,
  FaPlus,
} from "react-icons/fa";

const BACKEND_URL = "https://swipper-server.onrender.com";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [visitsCount, setVisitsCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // ✅ TUZATILDI: orders so'roviga token qo'shildi
      const token = localStorage.getItem("adminToken");

      const [productsRes, ordersRes, visitsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/products`).then((r) => r.json()),
        fetch(`${BACKEND_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((r) => r.json()),
        fetch(`${BACKEND_URL}/api/visits`).then((r) => r.json()),
      ]);

      if (productsRes.success) {
        setProductsCount(productsRes.products.length);
      }

      if (ordersRes.success) {
        setOrdersCount(ordersRes.orders.length);
        setRecentOrders(ordersRes.orders.slice(0, 3));

        const totalRevenue = ordersRes.orders.reduce(
          (sum, order) => {
            const numericValue = Number(
              String(order.total || "").replace(/\D/g, "")
            );

            return sum + (isNaN(numericValue) ? 0 : numericValue);
          },
          0
        );

        setRevenue(totalRevenue);
      } else {
        console.error("ORDERS XATOSI:", ordersRes.message);
      }

      if (visitsRes.success) {
        setVisitsCount(visitsRes.count);
      }
    } catch (error) {
      console.error("DASHBOARD MALUMOT XATOSI:", error);
    } finally {
      setLoaded(true);
    }
  }

  const stats = [
    {
      icon: <FaBox />,
      label: t("productsLabel"),
      value: productsCount,
      accent: "from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white",
    },
    {
      icon: <FaShoppingCart />,
      label: t("orders"),
      value: ordersCount,
      accent: "from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white",
    },
    {
      icon: <FaEye />,
      label: t("visits"),
      value: visitsCount,
      accent: "from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white",
    },
    {
      icon: <FaDollarSign />,
      label: t("revenue"),
      value: revenue.toLocaleString("uz-UZ"),
      accent: "from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white",
    },
  ];

  return (
    <div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="stat-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
              animationDelay: `${index * 80}ms`,
            }}
          >
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.accent} text-white dark:text-gray-900 flex items-center justify-center text-lg sm:text-xl mb-4 shadow-md`}
            >
              {stat.icon}
            </div>

            <h2 className="text-gray-400 dark:text-gray-500 text-sm">
              {stat.label}
            </h2>

            <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
              {loaded ? stat.value : "..."}
            </p>
          </div>
        ))}

      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 sm:p-6 mb-8 stat-card" style={{ animationDelay: "320ms" }}>

        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
          📋 {t("recentOrders")}
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500">{t("emptyCart")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-100 dark:border-gray-700">

                  <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">{t("customer")}</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">{t("product")}</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">{t("price")}</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">{t("status")}</th>

                </tr>

              </thead>

              <tbody>

                {recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="p-3 font-medium text-gray-900 dark:text-white">{order.name}</td>
                    <td className="p-3 text-gray-500 dark:text-gray-400">
                      {order.products
                        ?.map((p) => p.name)
                        .join(", ")}
                    </td>
                    <td className="p-3 font-semibold text-gray-900 dark:text-white">{order.total}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === "delivered"
                            ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400"
                            : order.status === "pending"
                            ? "bg-yellow-50 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400"
                            : "bg-red-50 dark:bg-red-950 text-red-500 dark:text-red-400"
                        }`}
                      >
                        {t(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        )}

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stat-card" style={{ animationDelay: "400ms" }}>

        <button
          onClick={() => navigate("/admin/products")}
          className="group flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
          {t("addProduct")}
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="group flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <FaShoppingCart className="group-hover:scale-110 transition-transform duration-300" />
          {t("viewOrders")}
        </button>

      </div>

      <style>{`

        .stat-card {
          animation: cardIn 0.5s ease-out both;
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}</style>

    </div>
  );
}