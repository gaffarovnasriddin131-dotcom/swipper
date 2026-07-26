import React, { useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([
    {
      name: "iPhone 17 Pro Max",
      category: "Phone",
      price: "$1500",
    },
    {
      name: "MacBook Pro",
      category: "Laptop",
      price: "$2000",
    },
    {
      name: "iPad Pro",
      category: "Tablet",
      price: "$1200",
    },
  ]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  function handleAddProduct() {
    if (!name || !category || !price) {
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 2500);

      return;
    }

    setProducts([
      ...products,
      {
        name,
        category,
        price,
      },
    ]);

    setName("");
    setCategory("");
    setPrice("");

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  }

  function handleDelete(index) {
    setProducts(products.filter((_, i) => i !== index));

    setShowDelete(true);

    setTimeout(() => {
      setShowDelete(false);
    }, 2500);
  }

  return (
    <div>

     
      {showError && (
        <div className="fixed top-6 right-6 animate-bounce z-50">
          <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl">
            <h2 className="font-bold text-lg">
              ⚠ Xatolik
            </h2>

            <p>
              Kodlarni to'liq yozing!
            </p>
          </div>
        </div>
      )}

      
      {showSuccess && (
        <div className="fixed top-6 right-6 animate-bounce z-50">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl">
            <h2 className="font-bold text-lg">
              ✅ Muvaffaqiyatli
            </h2>

            <p>
              Mahsulot qo'shildi.
            </p>
          </div>
        </div>
      )}

    
      {showDelete && (
        <div className="fixed top-6 right-6 animate-bounce z-50">
          <div className="bg-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl">
            <h2 className="font-bold text-lg">
              🗑 O'chirildi
            </h2>

            <p>
              Mahsulot o'chirildi.
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

      </div>

    
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Product Name"
            className="border p-3 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className="border p-3 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Price"
            className="border p-3 rounded-lg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

        </div>

        <button
          onClick={handleAddProduct}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition hover:scale-105"
        >
          + Add Product
        </button>

      </div>

      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((item, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-4">
                  {item.name}
                </td>

                <td className="p-4">
                  {item.category}
                </td>

                <td className="p-4">
                  {item.price}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}