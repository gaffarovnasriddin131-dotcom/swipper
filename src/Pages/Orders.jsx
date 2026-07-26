import React from "react";

export default function Orders() {
  const orders = [
    {
      id: 1,
      customer: "Ali Valiyev",
      product: "iPhone 17 Pro Max",
      price: "$1500",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Hasan Karimov",
      product: "MacBook Pro",
      price: "$2000",
      status: "Delivered",
    },
    {
      id: 3,
      customer: "Olim Toshmatov",
      product: "iPad Pro",
      price: "$1200",
      status: "Cancelled",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
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
                      item.status === "Delivered"
                        ? "bg-green-500"
                        : item.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status}
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