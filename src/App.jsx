import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Katalog from "./components/Katalog";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Contact from "./components/Contact";
import About from "./components/About";

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
        localStorage.setItem("isAdmin", "true");

        setModal(false);
        setSuccess(true);
        setLogin("");
        setPassword("");

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
        <div className="fixed top-5 right-5 z-[100]">
          <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold">
            ✓ Kirish muvaffaqiyatli!
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-5">
          <div className="bg-white dark:bg-gray-800 w-full max-w-sm p-8 rounded-3xl shadow-2xl">

            <h2 className="text-2xl font-black mb-1 text-gray-900 dark:text-white text-center">
              Tizimga kirish
            </h2>

            <p className="text-center text-gray-400 dark:text-gray-500 text-sm mb-6">
              Admin panelga kirish uchun ma'lumotlaringizni kiriting
            </p>

            <input
              type="text"
              placeholder="Login"
              className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-full p-3.5 rounded-xl outline-none mb-3"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Parol"
              className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-full p-3.5 rounded-xl outline-none mb-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-sm text-gray-500 mb-4"
            >
              {showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"}
            </button>

            <button
              onClick={handleLogin}
              className="bg-black text-white w-full py-3.5 rounded-xl font-bold"
            >
              Kirish
            </button>

            <button
              onClick={() => setModal(false)}
              className="border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 w-full py-3.5 mt-3 rounded-xl font-semibold"
            >
              Yopish
            </button>

          </div>
        </div>
      )}

    </div>
  );
}