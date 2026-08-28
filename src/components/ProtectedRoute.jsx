import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function isTokenValid(token) {
  if (!token) return false;

  try {
    // JWT'ning ikkinchi qismini (payload) dekodlash - imzoni tekshirmaydi,
    // faqat muddati tugaganini tekshirish uchun
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.exp) return true;

    // exp soniyalarda keladi, Date.now() millisekundlarda
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
}

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("adminToken");

  if (!isTokenValid(token)) {
    localStorage.removeItem("adminToken");

    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
