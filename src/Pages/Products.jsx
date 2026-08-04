import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const BACKEND_URL = "https://swipper-server.onrender.com";

export default function Products() {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/products`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("MAHSULOTLARNI OLISHDA XATOLIK:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct() {
    if (!name || !category || !price) {
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 2500);

      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category, price }),
      });

      const data = await response.json();

      if (data.success) {
        setProducts([data.product, ...products]);

        setName("");
        setCategory("");
        setPrice("");

        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 2500);
      }
    } catch (error) {
      console.error("MAHSULOT QOSHISHDA XATOLIK:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setProducts(
          products.filter((item) => item._id !== id)
        );

        setShowDelete(true);

        setTimeout(() => {
          setShowDelete(false);
        }, 2500);
      }
    } catch (error) {
      console.error("MAHSULOT OCHIRISHDA XATOLIK:", error);
    }
  }

  return (
    <div>

     
      {showError && (
        <div className="fixed top-6 right-6 animate-bounce z-50">
          <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl">
            <h2 className="font-bold text-lg">
              ⚠ {t("errorTitle")}
            </h2>

            <p>
              {t("fillAllCodes")}
            </p>
          </div>
        </div>
      )}

      
      {showSuccess && (
        <div className="fixed top-6 right-6 animate-bounce z-50">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl">
            <h2 className="font-bold text-lg">
              ✅ {t("successTitle")}
            </h2>

            <p>
              {t("productAdded")}
            </p>
          </div>
        </div>
      )}

    
      {showDelete && (
        <div className="fixed top-6 right-6 animate-bounce z-50">
          <div className="bg-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl">
            <h2 className="font-bold text-lg">
              🗑 {t("deletedTitle")}
            </h2>

            <p>
              {t("productDeleted")}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          {t("productsLabel")}
        </h1>

      </div>

    
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder={t("productName")}
            className="border p-3 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder={t("category")}
            className="border p-3 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder={t("price")}
            className="border p-3 rounded-lg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

        </div>

        <button
          onClick={handleAddProduct}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition hover:scale-105"
        >
          + {t("addProduct")}
        </button>

      </div>

      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        {loading ? (
          <p className="p-6 text-gray-500">{t("sending")}</p>
        ) : products.length === 0 ? (
          <p className="p-6 text-gray-500">{t("emptyCart")}</p>
        ) : (
          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  {t("productName")}
                </th>

                <th className="p-4 text-left">
                  {t("category")}
                </th>

                <th className="p-4 text-left">
                  {t("price")}
                </th>

                <th className="p-4 text-center">
                  {t("action")}
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((item) => (

                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="p-4">
                    {item.name}
                  </td>

                  <td className="p-4">
                    {item.category}
                  </td>

                  <td className="p-4">
                    {item.price}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      {t("delete")}
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}