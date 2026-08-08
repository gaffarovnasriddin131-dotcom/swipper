import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaBox,
  FaShoppingCart,
  FaEye,
  FaDollarSign,
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

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [productsRes, ordersRes, visitsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/products`).then((r) => r.json()),
        fetch(`${BACKEND_URL}/api/orders`).then((r) => r.json()),
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
      }

      if (visitsRes.success) {
        setVisitsCount(visitsRes.count);
      }
    } catch (error) {
      console.error("DASHBOARD MALUMOT XATOSI:", error);
    }
  }

  return (
    <div>
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold">
          👋 {t("welcomeAdmin")}
        </h1>

        <p className="mt-2 text-lg">
          {t("manageStore")}
        </p>
      </div>

     
      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <FaBox className="text-blue-600 text-4xl mb-3" />
          <h2 className="text-gray-500">{t("productsLabel")}</h2>
          <p className="text-3xl font-bold">{productsCount}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <FaShoppingCart className="text-green-600 text-4xl mb-3" />
          <h2 className="text-gray-500">{t("orders")}</h2>
          <p className="text-3xl font-bold">{ordersCount}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <FaEye className="text-yellow-500 text-4xl mb-3" />
          <h2 className="text-gray-500">{t("visits")}</h2>
          <p className="text-3xl font-bold">{visitsCount}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <FaDollarSign className="text-purple-600 text-4xl mb-3" />
          <h2 className="text-gray-500">{t("revenue")}</h2>
          <p className="text-2xl font-bold">
            {revenue.toLocaleString("uz-UZ")}
          </p>
        </div>

      </div>

    
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          📋 {t("recentOrders")}
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">{t("emptyCart")}</p>
        ) : (
          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-3">{t("customer")}</th>
                <th className="text-left p-3">{t("product")}</th>
                <th className="text-left p-3">{t("price")}</th>
                <th className="text-left p-3">{t("status")}</th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">
                    {order.products
                      ?.map((p) => p.name)
                      .join(", ")}
                  </td>
                  <td className="p-3">{order.total}</td>
                  <td
                    className={`p-3 font-bold ${
                      order.status === "delivered"
                        ? "text-green-600"
                        : order.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {t(order.status)}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

     
      <div className="grid grid-cols-3 gap-5">

        <button
          onClick={() => navigate("/admin/products")}
          className="bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition"
        >
          ➕ {t("addProduct")}
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition"
        >
          🛒 {t("viewOrders")}
        </button>

        <button
          onClick={() => navigate("/admin/settings")}
          className="bg-gray-800 text-white py-4 rounded-xl hover:bg-black transition"
        >
          ⚙️ {t("settings")}
        </button>

      </div>
    </div>
  );
}