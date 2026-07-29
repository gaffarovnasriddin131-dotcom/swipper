
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://swipper-server.onrender.com",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Apple Store Server ishlayapti",
  });
});

app.post("/api/order", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      products,
      total,
    } = req.body;

    console.log("Yangi buyurtma:", req.body);

    if (!name || !phone || !email || !address) {
      return res.status(400).json({
        success: false,
        message: "Barcha ma'lumotlarni to'ldiring",
      });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Savat bo'sh",
      });
    }

    if (!process.env.BOT_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "BOT_TOKEN topilmadi",
      });
    }

    if (!process.env.CHAT_ID) {
      return res.status(500).json({
        success: false,
        message: "CHAT_ID topilmadi",
      });
    }

    const productText = products
      .map((product, index) => {
        return `${index + 1}. 📱 ${product.name}
💾 Xotira: ${product.storage || "Ko'rsatilmagan"}
🔢 Soni: ${product.quantity}
💰 Narxi: ${product.price}`;
      })
      .join("\n\n");

    const message = `🛍 YANGI BUYURTMA

👤 Mijoz: ${name}
📞 Telefon: ${phone}
📧 Email: ${email}
📍 Manzil: ${address}

📦 MAHSULOTLAR:

${productText}

💵 JAMI: ${total}

✅ Buyurtma qabul qilindi`;

    const telegramUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message,
      }),
    });

    const telegramData = await telegramResponse.json();

    console.log("Telegram javobi:", telegramData);

    if (!telegramResponse.ok || !telegramData.ok) {
      return res.status(500).json({
        success: false,
        message: "Telegramga yuborishda xatolik",
        telegramError: telegramData,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Buyurtma muvaffaqiyatli yuborildi",
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlayapti`);
});

