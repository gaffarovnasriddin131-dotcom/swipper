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

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
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
          body: JSON.stringify({
            login,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("isAdmin", "true");

        setModal(false);
        setLogin("");
        setPassword("");

        navigate("/admin");
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
      oldCart.filter(
        (item) => item.id !== id
      )
    );
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
        .filter(
          (item) => item.quantity > 0
        )
    );
  }

  return (
    <div className="min-h-screen">
      {!isAdminPage && (
        <Navbar
          setModal={setModal}
          cart={cart}
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
          element={
            <Contact />
          }
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
            element={
              <Dashboard />
            }
          />

          <Route
            path="products"
            element={
              <Products />
            }
          />

          <Route
            path="orders"
            element={
              <Orders />
            }
          />

          <Route
            path="settings"
            element={
              <Settings />
            }
          />
        </Route>
      </Routes>

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
            <h2 className="
              text-2xl
              font-black
              mb-6
              text-gray-900
              text-center
            ">
              Tizimga kirish
            </h2>

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