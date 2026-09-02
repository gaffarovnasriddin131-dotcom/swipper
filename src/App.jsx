import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FaApple, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Katalog from "./components/Katalog";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Contact from "./components/Contact";
import About from "./components/About";
import TrackOrder from "./components/TrackOrder";

import AdminPanel from "./Pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";

export default function App() {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  // ✅ YANGI: /login manzilига o'zingiz kirganingizda login oynasi avtomatik ochiladi
  useEffect(() => {
    if (location.pathname === "/login") {
      setModal(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetch("https://swipper-server.onrender.com/api/visit", {
      method: "POST",
    }).catch((error) =>
      console.error("VISIT XATOSI:", error)
    );
  }, []);

  async function handleLogin() {
    try {
      const response = await fetch(
        "https://swipper-server.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // ✅ TUZATILDI: endi haqiqiy token saqlanadi (oddiy "true" emas)
        localStorage.setItem("adminToken", data.token);

        setModal(false);
        setSuccess(true);
        setLogin("");
        setPassword("");
        setShowPassword(false);

        navigate("/admin");

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        alert("Login yoki parol xato!");
      }
    } catch (error) {
      console.error("LOGIN XATOSI:", error);
      alert("Serverga ulanishda xatolik yuz berdi");
    }
  }

  function addToCart(product) {
    setCart((oldCart) => {
      const existingProduct = oldCart.find(
        (item) =>
          item.id === product.id &&
          item.storage === product.storage
      );

      if (existingProduct) {
        return oldCart.map((item) =>
          item.id === product.id &&
          item.storage === product.storage
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...oldCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(id) {
    setCart((oldCart) =>
      oldCart.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  function increaseQuantity(id) {
    setCart((oldCart) =>
      oldCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="min-h-screen">

      {!isAdminPage && (
        <Navbar
          setModal={setModal}
          cart={cart}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
      )}

      <Routes>

        <Route
          path="/"
          element={<Hero addToCart={addToCart} />}
        />

        <Route
          path="/katalog"
          element={
            <Katalog
              cart={cart}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/aloqa"
          element={<Contact />}
        />

        <Route
          path="/buyurtmani-kuzatish"
          element={<TrackOrder />}
        />

        {/* ✅ TUZATILDI: takrorlangan route olib tashlandi, faqat bitta qoldi */}
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />
        </Route>

      </Routes>

      {success && (
        <div className="fixed top-5 right-5 z-[300] animate-[slideIn_0.4s_ease-out]">
          <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-6 py-4 rounded-2xl shadow-2xl">
            <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
              ✓
            </div>

            <div>
              <p className="font-bold">
                Kirish muvaffaqiyatli!
              </p>

              <p className="text-xs text-gray-400">
                Admin panelga xush kelibsiz
              </p>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-5 bg-black/70 backdrop-blur-md"
          onClick={() => {
            setModal(false);
            if (location.pathname === "/login") {
              navigate("/");
            }
          }}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white dark:bg-gray-900 shadow-[0_30px_100px_rgba(0,0,0,0.45)] border border-white/20 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="h-2 bg-black dark:bg-white" />

            <div className="p-8 sm:p-10">

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-xl">
                  <FaApple className="text-4xl" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                  Admin Panel
                </h2>

                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                  Tizimga kirish uchun ma'lumotlaringizni kiriting
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Login
                </label>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Loginni kiriting"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Parol
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolni kiriting"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white transition"
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] shadow-xl transition-all duration-300"
              >
                Kirish
              </button>

              <button
                onClick={() => {
                  setModal(false);
                  setLogin("");
                  setPassword("");
                  setShowPassword(false);

                  if (location.pathname === "/login") {
                    navigate("/");
                  }
                }}
                className="w-full mt-3 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Yopish
              </button>

              <p className="text-center text-xs text-gray-400 mt-6">
                Apple Store Admin System
              </p>

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

    </div>
  );
}