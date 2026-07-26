import React, { useState } from "react";

export default function Settings() {
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function handleSave() {
    if (
      storeName.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === ""
    ) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);

      return;
    }

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    setStoreName("");
    setEmail("");
    setPhone("");
    setAddress("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex justify-center items-center p-8">


      {error && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className="bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">

            <div className="text-3xl">❌</div>

            <div>
              <h2 className="font-bold text-lg">
                Xatolik!
              </h2>

              <p className="text-sm">
                Iltimos, barcha maydonlarni to'liq to'ldiring.
              </p>
            </div>

          </div>
        </div>
      )}

    
      {success && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">

            <div className="text-3xl">✅</div>

            <div>
              <h2 className="font-bold text-lg">
                Success!
              </h2>

              <p className="text-sm">
                Settings muvaffaqiyatli saqlandi.
              </p>
            </div>

          </div>
        </div>
      )}

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 hover:shadow-blue-300 hover:scale-[1.02] transition-all duration-500">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          ⚙️ Settings
        </h1>

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            🏪 Store Name
          </label>

          <input
            type="text"
            placeholder="Apple Store"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition"
          />
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            📧 Email
          </label>

          <input
            type="email"
            placeholder="apple@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition"
          />
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            📞 Phone
          </label>

          <input
            type="text"
            placeholder="+998 90 123 45 67"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            📍 Address
          </label>

          <textarea
            rows="4"
            placeholder="Toshkent, O'zbekiston"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          💾 Save Changes
        </button>

      </div>
    </div>
  );
}