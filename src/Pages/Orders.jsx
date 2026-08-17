import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const BACKEND_URL = "https://swipper-server.onrender.com";

export default function Orders() {
  const { t } = useTranslation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/orders`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("BUYURTMALARNI OLISHDA XATOLIK:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {t("orders")}
      </h1>

      {loading ? (
        <p className="text-gray-500">
          {t("sending")}
        </p>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          {t("emptyCart")}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  {t("customer")}
                </th>

                <th className="p-4 text-left">
                  {t("product")}
                </th>

                <th className="p-4 text-left">
                  {t("price")}
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item) => (
                <tr
                  key={item._id}
                  className="border-t"
                >
                  <td className="p-4">
                    <div className="font-semibold">
                      {item.name}
                    </div>

                    <div className="text-sm text-gray-400">
                      {item.phone}
                    </div>
                  </td>

                  <td className="p-4">
                    {item.products
                      ?.map((p) => p.name)
                      .join(", ")}
                  </td>

                  <td className="p-4">
                    {item.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}