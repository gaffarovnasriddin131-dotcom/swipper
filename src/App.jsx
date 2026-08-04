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
import Users from "./Pages/Users";
import Settings from "./Pages/Settings";

export default function App() {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  
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


  

  function handleLogin() {
    if (
      login === "admin" &&
      password === "12345"
    ) {
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

          {/* USERS */}

          <Route
            path="users"
            element={
              <Users />
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

        <div className="
          fixed
          inset-0
          bg-black/50
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-[200]
          p-5
        ">


          <div className="
            bg-white
            w-full
            max-w-sm
            p-7
            rounded-3xl
            shadow-2xl
          ">


            {/* TITLE */}

            <h2 className="
              text-2xl
              font-black
              mb-6
              text-gray-900
              text-center
            ">

              Tizimga kirish

            </h2>


            {/* LOGIN */}

            <input
              type="text"
              placeholder="Login"
              className="
                border
                border-gray-300
                w-full
                p-3
                mb-3
                rounded-xl
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                transition
              "
              value={login}
              onChange={(e) =>
                setLogin(e.target.value)
              }
            />


            {/* PAROL */}

            <input
              type="password"
              placeholder="Parol"
              className="
                border
                border-gray-300
                w-full
                p-3
                mb-5
                rounded-xl
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                transition
              "
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />


            {/* KIRISH */}

            <button
              onClick={handleLogin}
              className="
                bg-blue-600
                text-white
                w-full
                py-3
                rounded-xl
                font-bold
                hover:bg-blue-700
                hover:-translate-y-1
                shadow-lg
                shadow-blue-200
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
                border-gray-300
                text-gray-700
                w-full
                py-3
                mt-3
                rounded-xl
                font-semibold
                hover:bg-gray-100
                transition
              "
            >

              Yopish

            </button>


          </div>

        </div>

      )}

    </div>
  );
}