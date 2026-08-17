import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Katalog from "./components/Katalog";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Contact from "./components/Contact";

import AdminPanel from "./Pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Settings from "./Pages/Settings";

export default function App() {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch("https://swipper-server.onrender.com/api/visit", {
      method: "POST",
    }).catch((error) => {
      console.error("VISIT XATOSI:", error);
    });
  }, []);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (!login.trim() || !password.trim()) {
      alert("Login va parolni kiriting!");
      return;
    }

    try {
      const response = await fetch(
        "https://swipper-server.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: login.trim(),
            password: password.trim(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("isAdmin", "true");

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
      {success && (
        <div className="fixed top-5 right-5 z-[100]">
          <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold">
            Kirish muvaffaqiyatli!
          </div>
        </div>
      )}

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
          element={
            <Hero
              addToCart={addToCart}
            />
          }
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
          path="/aloqa"
          element={<Contact />}
        />

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

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>
      </Routes>

      {modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-5">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-lg">
                A
              </div>

              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                Admin Panel
              </h2>

              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Tizimga kirish
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="mb-4 w-full rounded-xl border border-gray-300 bg-white p-3.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <div className="relative mb-6">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Parol"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white p-3.5 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-blue-600"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
              >
                Kirish
              </button>

              <button
                type="button"
                onClick={() => {
                  setModal(false);
                  setLogin("");
                  setPassword("");
                  setShowPassword(false);
                }}
                className="mt-3 w-full rounded-xl border border-gray-300 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
              >
                Yopish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}