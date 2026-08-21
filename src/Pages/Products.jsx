import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaPlus,
  FaTrash,
  FaBoxOpen,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const BACKEND_URL = "https://swipper-server.onrender.com";

const KATEGORIYALAR = [
  "iPhone",
  "Mac",
  "iPad",
  "AirPods",
  "Apple Watch",
  "Aksessuarlar",
];

export default function Products() {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(KATEGORIYALAR[0]);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

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
    if (!name || !category || !price || !image) {
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
        body: JSON.stringify({
          name,
          category,
          price,
          image,
          description,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setProducts([data.product, ...products]);

        setName("");
        setPrice("");
        setImage("");
        setDescription("");

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
        <div className="fixed top-6 right-6 z-50 toast-in">
          <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border-l-4 border-red-500 text-gray-900 dark:text-white px-5 py-4 rounded-xl shadow-2xl">
            <FaExclamationCircle className="text-red-500 text-xl mt-0.5 shrink-0" />
            <div>
              <h2 className="font-bold">{t("errorTitle")}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("fillAllCodes")}</p>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 toast-in">
          <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border-l-4 border-green-500 text-gray-900 dark:text-white px-5 py-4 rounded-xl shadow-2xl">
            <FaCheckCircle className="text-green-500 text-xl mt-0.5 shrink-0" />
            <div>
              <h2 className="font-bold">{t("successTitle")}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("productAdded")}</p>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed top-6 right-6 z-50 toast-in">
          <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border-l-4 border-gray-900 dark:border-white text-gray-900 dark:text-white px-5 py-4 rounded-xl shadow-2xl">
            <FaTrash className="text-gray-500 dark:text-gray-400 text-lg mt-0.5 shrink-0" />
            <div>
              <h2 className="font-bold">{t("deletedTitle")}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("productDeleted")}</p>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 fade-up">
        {t("productsLabel")}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 fade-up" style={{ animationDelay: "60ms" }}>
        ℹ️ Bu yerda qo'shilgan mahsulot saytning "Katalog" sahifasida ham ko'rinadi. Rasm uchun internet havolasini kiriting (masalan unsplash.com'dan).
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8 fade-up" style={{ animationDelay: "120ms" }}>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">

          <input
            type="text"
            placeholder={t("productName")}
            className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:border-gray-900 dark:focus:border-white focus:ring-4 focus:ring-gray-900/5 dark:focus:ring-white/10 transition-all duration-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:border-gray-900 dark:focus:border-white transition-all duration-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {KATEGORIYALAR.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder={t("price")}
            className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:border-gray-900 dark:focus:border-white focus:ring-4 focus:ring-gray-900/5 dark:focus:ring-white/10 transition-all duration-300"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Rasm havolasi (URL)"
            className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:border-gray-900 dark:focus:border-white focus:ring-4 focus:ring-gray-900/5 dark:focus:ring-white/10 transition-all duration-300"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

        </div>

        <textarea
          placeholder="Tavsif (ixtiyoriy)"
          className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 rounded-xl w-full mb-4 outline-none focus:border-gray-900 dark:focus:border-white focus:ring-4 focus:ring-gray-900/5 dark:focus:ring-white/10 transition-all duration-300 resize-none"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleAddProduct}
          className="group flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
          {t("addProduct")}
        </button>

      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden fade-up" style={{ animationDelay: "180ms" }}>

        {loading ? (
          <div className="p-10 flex flex-col items-center text-gray-400 dark:text-gray-500">
            <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full animate-spin mb-3" />
            {t("sending")}
          </div>
        ) : products.length === 0 ? (
          <div className="p-14 flex flex-col items-center text-gray-400 dark:text-gray-500">
            <FaBoxOpen className="text-4xl mb-3" />
            {t("emptyCart")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-100 dark:border-gray-700">

                  <th className="p-4 text-left text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Rasm</th>
                  <th className="p-4 text-left text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">{t("productName")}</th>
                  <th className="p-4 text-left text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">{t("category")}</th>
                  <th className="p-4 text-left text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">{t("price")}</th>
                  <th className="p-4 text-center text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">{t("action")}</th>

                </tr>

              </thead>

              <tbody>

                {products.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >

                    <td className="p-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain rounded-lg bg-gray-50 dark:bg-gray-700 p-1"
                        />
                      )}
                    </td>

                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </td>

                    <td className="p-4 text-gray-500 dark:text-gray-400">
                      {item.category}
                    </td>

                    <td className="p-4 font-semibold text-gray-900 dark:text-white">
                      {item.price}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
                      >
                        <FaTrash size={12} />
                        {t("delete")}
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>
        )}

      </div>

      <style>{`

        .fade-up {
          animation: fadeUp 0.5s ease-out both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .toast-in {
          animation: toastIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

      `}</style>

    </div>
  );
}