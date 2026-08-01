import React from "react";
import { useTranslation } from "react-i18next";

export default function Orders() {
  const { t } = useTranslation();

  const orders = [
    {
      id: 1,
      customer: "Ali Valiyev",
      product: "iPhone 17 Pro Max",
      price: "$1500",
      status: "pending",
    },
    {
      id: 2,
      customer: "Hasan Karimov",
      product: "MacBook Pro",
      price: "$2000",
      status: "delivered",
    },
    {
      id: 3,
      customer: "Olim Toshmatov",
      product: "iPad Pro",
      price: "$1200",
      status: "cancelled",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("orders")}</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">{t("customer")}</th>
              <th className="p-4 text-left">{t("product")}</th>
              <th className="p-4 text-left">{t("price")}</th>
              <th className="p-4 text-left">{t("status")}</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.customer}</td>
                <td className="p-4">{item.product}</td>
                <td className="p-4">{item.price}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      item.status === "delivered"
                        ? "bg-green-500"
                        : item.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {t(item.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}