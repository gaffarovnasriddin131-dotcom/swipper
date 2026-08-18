import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

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
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // DARK / LIGHT REJIM

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

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  // SAVATNI LOCALSTORAGEGA SAQLASH

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  // TASHRIF HISOBLAGICHI

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


  // =========================
  // SAVATGA QO'SHISH
  // =========================

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


  // =========================
  // SAVATDAN O'CHIRISH
  // =========================

  function removeFromCart(id) {
    setCart((oldCart) =>
      oldCart.filter(
        (item) => item.id !== id
      )
    );
  }

  function clearCart() {
    setCart([]);
  }


  // =========================
  // MIQDORNI OSHIRISH
  // =========================

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


  // =========================
  // MIQDORNI KAMAYTIRISH
  // =========================

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
        .filter(
          (item) => item.quantity > 0
        )
    );
  }


  return (
    <div className="min-h-screen">


      {/* ========================= */}
      {/* LOGIN MUVAFFAQIYATLI */}
      {/* ========================= */}

      {success && (
        <div className="
          fixed
          top-5
          right-5
          z-[100]
          animate-bounce
        ">

          <div className="
            bg-green-500
            text-white
            px-6
            py-3
            rounded-xl
            shadow-lg
            font-semibold
          ">

            ✓ Kirish muvaffaqiyatli!

          </div>

        </div>
      )}


      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      {!isAdminPage && (
        <Navbar
          setModal={setModal}
          cart={cart}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
      )}


      {/* ========================= */}
      {/* SAHIFALAR */}
      {/* ========================= */}

      <Routes>


        {/* ========================= */}
        {/* HOME */}
        {/* FAQAT HERO */}
        {/* ========================= */}

        <Route
          path="/"
          element={
            <Hero
              addToCart={addToCart}
            />
          }
        />


        {/* ========================= */}
        {/* KATALOG */}
        {/* ========================= */}

        <Route
          path="/katalog"
          element={
            <Katalog
              cart={cart}
              addToCart={addToCart}
            />
          }
        />


        {/* ========================= */}
        {/* ALOQA */}
        {/* ALOHIDA SAHIFA */}
        {/* ========================= */}

        <Route
          path="/aloqa"
          element={
            <Contact />
          }
        />


        {/* ========================= */}
        {/* MAHSULOT */}
        {/* ========================= */}

        <Route
          path="/product/:id"
          element={
            <ProductDetail
              addToCart={addToCart}
            />
          }
        />


        {/* ========================= */}
        {/* SAVAT */}
        {/* ========================= */}

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={
                removeFromCart
              }
              increaseQuantity={
                increaseQuantity
              }
              decreaseQuantity={
                decreaseQuantity
              }
              clearCart={clearCart}
            />
          }
        />


        {/* ========================= */}
        {/* ADMIN PANEL */}
        {/* ========================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        >

          {/* DASHBOARD */}

          <Route
            index
            element={
              <Dashboard />
            }
          />

          {/* PRODUCTS */}

          <Route
            path="products"
            element={
              <Products />
            }
          />

          {/* ORDERS */}

          <Route
            path="orders"
            element={
              <Orders />
            }
          />

          {/* SETTINGS */}

          <Route
            path="settings"
            element={
              <Settings />
            }
          />

        </Route>

      </Routes>


      {/* ========================= */}
      {/* LOGIN MODAL */}
      {/* ========================= */}

      {modal && (

        <div
          className="
          fixed
          inset-0
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-[200]
          p-5
        "
          style={{
            animation: "fadeIn 0.3s ease-out",
          }}
        >


          <div
            className="
            bg-white
            dark:bg-gray-800
            w-full
            max-w-sm
            p-8
            rounded-3xl
            shadow-2xl
            relative
            overflow-hidden
          "
            style={{
              animation: "modalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >

            <div className="absolute top-[-60px] right-[-60px] w-[160px] h-[160px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl" />

            <div className="relative z-10">

              {/* ICON */}

              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              {/* TITLE */}

              <h2 className="
                text-2xl
                font-black
                mb-1
                text-gray-900
                dark:text-white
                text-center
              ">

                Tizimga kirish

              </h2>

              <p className="text-center text-gray-400 dark:text-gray-500 text-sm mb-6">
                Admin panelga kirish uchun ma'lumotlaringizni kiriting
              </p>


              {/* LOGIN */}

              <input
                type="text"
                placeholder="Login"
                className="
                  border
                  border-gray-200
                  dark:border-gray-600
                  dark:bg-gray-700
                  dark:text-white
                  w-full
                  p-3.5
                  mb-3
                  rounded-xl
                  outline-none
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                  transition-all
                  duration-300
                "
                value={login}
                onChange={(e) =>
                  setLogin(e.target.value)
                }
              />


              {/* PAROL */}

              <div className="relative mb-5">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Parol"
                  className="
                    border
                    border-gray-200
                    dark:border-gray-600
                    dark:bg-gray-700
                    dark:text-white
                    w-full
                    p-3.5
                    pr-12
                    rounded-xl
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                    transition-all
                    duration-300
                  "
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>

              </div>


              {/* KIRISH */}

              <button
                onClick={handleLogin}
                className="
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-700
                  text-white
                  w-full
                  py-3.5
                  rounded-xl
                  font-bold
                  hover:shadow-xl
                  hover:shadow-blue-500/30
                  hover:-translate-y-0.5
                  active:translate-y-0
                  shadow-lg
                  shadow-blue-500/20
                  transition-all
                  duration-300
                "
              >

                Kirish

              </button>


              {/* YOPISH */}

              <button
                onClick={() =>
                  setModal(false)
                }
                className="
                  border
                  border-gray-200
                  dark:border-gray-600
                  text-gray-600
                  dark:text-gray-300
                  w-full
                  py-3.5
                  mt-3
                  rounded-xl
                  font-semibold
                  hover:bg-gray-50
                  dark:hover:bg-gray-700
                  transition-all
                  duration-300
                "
              >

                Yopish

              </button>

            </div>

          </div>

        </div>

      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalPop {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

    </div>
  );
}