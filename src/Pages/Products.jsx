import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaBoxOpen,
  FaSpinner,
  FaPen,
  FaTimes,
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

const BOSH_FORMA = {
  name: "",
  category: KATEGORIYALAR[0],
  image: "",
  descriptionUz: "",
  descriptionEn: "",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const [editingId, setEditingId] = useState(null); // null = yangi qo'shish rejimi

  const [form, setForm] = useState(BOSH_FORMA);

  // Xotira variantlari: [{ nomi: "128 GB", narx: "999" }, ...]
  const [xotiralar, setXotiralar] = useState([
    { nomi: "", narx: "" },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  function getToken() {
    return localStorage.getItem("adminToken");
  }

  function fetchProducts() {
    setLoadingList(true);

    fetch(`${BACKEND_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch((error) =>
        console.error("MAHSULOTLARNI OLISHDA XATOLIK:", error)
      )
      .finally(() => setLoadingList(false));
  }

  function addXotiraRow() {
    setXotiralar((prev) => [...prev, { nomi: "", narx: "" }]);
  }

  function removeXotiraRow(index) {
    setXotiralar((prev) => prev.filter((_, i) => i !== index));
  }

  function updateXotiraRow(index, field, value) {
    setXotiralar((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  }

  function resetForm() {
    setForm(BOSH_FORMA);
    setXotiralar([{ nomi: "", narx: "" }]);
    setEditingId(null);
  }

  function startEdit(item) {
    setEditingId(item._id);

    setForm({
      name: item.name || "",
      category: item.category || KATEGORIYALAR[0],
      image: item.image || "",
      descriptionUz: item.descriptionUz || "",
      descriptionEn: item.descriptionEn || "",
    });

    setXotiralar(
      item.xotiralar && item.xotiralar.length > 0
        ? item.xotiralar.map((v) => ({
            nomi: v.nomi,
            narx: String(v.narx),
          }))
        : [{ nomi: "", narx: "" }]
    );

    setMessage("");

    // Forma tepasiga o'tish, tahrirlash qulay bo'lishi uchun
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    setMessage("");

    const cleanedXotiralar = xotiralar
      .filter((row) => row.nomi.trim() && row.narx !== "")
      .map((row) => ({
        nomi: row.nomi.trim(),
        narx: Number(row.narx),
      }));

    if (!form.name.trim() || !form.category) {
      setMessage("❌ Nomi va kategoriyani to'ldiring");
      return;
    }

    if (cleanedXotiralar.length === 0) {
      setMessage("❌ Kamida bitta xotira/narx qo'shing");
      return;
    }

    const token = getToken();

    if (!token) {
      setMessage("❌ Sessiya tugagan, qaytadan kiring");
      return;
    }

    setSubmitting(true);

    const isEditing = Boolean(editingId);

    const url = isEditing
      ? `${BACKEND_URL}/api/products/${editingId}`
      : `${BACKEND_URL}/api/products`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category,
          image: form.image.trim(),
          descriptionUz: form.descriptionUz.trim(),
          descriptionEn: form.descriptionEn.trim(),
          xotiralar: cleanedXotiralar,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Xatolik yuz berdi");
      }

      setMessage(
        isEditing ? "✅ Mahsulot yangilandi" : "✅ Mahsulot qo'shildi"
      );

      resetForm();
      fetchProducts();

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("PRODUCT SAVE XATOSI:", error);
      setMessage(`❌ ${error.message || "Saqlab bo'lmadi"}`);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Mahsulotni o'chirmoqchimisiz?")) return;

    const token = getToken();

    if (!token) {
      setMessage("❌ Sessiya tugagan, qaytadan kiring");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));

        if (editingId === id) {
          resetForm();
        }
      }
    } catch (error) {
      console.error("PRODUCT DELETE XATOSI:", error);
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <FaBoxOpen /> Mahsulotlar
      </h1>

      {/* ================= FORMA ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 mb-10 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {editingId ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}
          </h2>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
            >
              <FaTimes /> Bekor qilish
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Mahsulot nomi (masalan: iPhone 17 Pro)"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white"
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white"
          >
            {KATEGORIYALAR.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Rasm URL manzili (masalan: /iphone.webp yoki https://...)"
          value={form.image}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, image: e.target.value }))
          }
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <textarea
            placeholder="Tavsif (o'zbekcha)"
            value={form.descriptionUz}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                descriptionUz: e.target.value,
              }))
            }
            rows={3}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white resize-none"
          />

          <textarea
            placeholder="Description (English)"
            value={form.descriptionEn}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                descriptionEn: e.target.value,
              }))
            }
            rows={3}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white resize-none"
          />
        </div>

        {/* ===== XOTIRA / NARX QATORLARI ===== */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
            Xotira va narx variantlari
          </label>

          <div className="space-y-3">
            {xotiralar.map((row, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-3 items-stretch"
              >
                <input
                  type="text"
                  placeholder="Xotira (masalan: 128 GB)"
                  value={row.nomi}
                  onChange={(e) =>
                    updateXotiraRow(index, "nomi", e.target.value)
                  }
                  className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white"
                />

                <input
                  type="number"
                  placeholder="Narx (masalan: 999)"
                  value={row.narx}
                  onChange={(e) =>
                    updateXotiraRow(index, "narx", e.target.value)
                  }
                  className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 outline-none focus:border-gray-900 dark:focus:border-white"
                />

                <button
                  type="button"
                  onClick={() => removeXotiraRow(index)}
                  disabled={xotiralar.length === 1}
                  className="w-11 h-11 self-center sm:self-auto rounded-xl bg-red-100 dark:bg-red-950 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addXotiraRow}
            className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            <FaPlus /> Yana xotira qo'shish
          </button>

          <p className="text-xs text-gray-400 mt-2">
            Eslatma: agar mahsulotda xotira varianti bo'lmasa (masalan
            AirPods, Apple Watch), shunchaki bitta qator qoldiring —
            "Xotira" maydoniga "Standart" deb yozing, "Narx" maydoniga esa
            haqiqiy narxni kiriting.
          </p>
        </div>

        {message && (
          <div className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl p-3 text-center font-semibold text-sm">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-100 transition disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {submitting ? (
            <>
              <FaSpinner className="animate-spin" /> Saqlanmoqda...
            </>
          ) : editingId ? (
            <>
              <FaPen /> O'zgarishlarni saqlash
            </>
          ) : (
            <>
              <FaPlus /> Mahsulot qo'shish
            </>
          )}
        </button>
      </form>

      {/* ================= RO'YXAT ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Mavjud mahsulotlar ({products.length})
        </h2>

        {loadingList ? (
          <p className="text-gray-400 text-center py-10">Yuklanmoqda...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            Hozircha mahsulot yo'q
          </p>
        ) : (
          <div className="space-y-4">
            {products.map((item) => (
              <div
                key={item._id}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 border rounded-2xl p-4 transition ${
                  editingId === item._id
                    ? "border-gray-900 dark:border-white"
                    : "border-gray-100 dark:border-gray-700"
                }`}
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-400">{item.category}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {(item.xotiralar || []).map((v, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold bg-gray-100 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-full"
                      >
                        {v.nomi}: ${v.narx}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEdit(item)}
                    className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition"
                  >
                    <FaPen />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}