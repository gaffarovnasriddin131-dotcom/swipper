const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// ✅ MUHIM: .env fayliga JWT_SECRET qo'shing (masalan uzun tasodifiy matn)
const JWT_SECRET = process.env.JWT_SECRET || "swipper-fallback-secret-oynating";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://swipper-1.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ==========================================
// MONGODB ULANISH
// ==========================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB ulandi"))
  .catch((err) => console.error("MongoDB ulanish xatosi:", err));

// ==========================================
// SXEMALAR (SCHEMAS)
// ==========================================

const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  comment: String,
  products: Array,
  total: String,
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  descriptionUz: String,
  descriptionEn: String,
  xotiralar: [
    {
      nomi: String, // masalan "128 GB"
      narx: Number, // masalan 999
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const visitSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const ratingSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

const Order = mongoose.model("Order", orderSchema);
const Product = mongoose.model("Product", productSchema);
const Visit = mongoose.model("Visit", visitSchema);

// ==========================================
// ✅ YANGI: ADMIN TOKENINI TEKSHIRUVCHI MIDDLEWARE
// ==========================================

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Ruxsat yo'q. Iltimos tizimga kiring.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Ruxsat yo'q",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token yaroqsiz yoki muddati tugagan",
    });
  }
}

// ==========================================
// ASOSIY YO'L
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Apple Store Server ishlayapti",
  });
});

// ==========================================
// ADMIN LOGIN — ✅ ENDI HAQIQIY TOKEN QAYTARADI
// ==========================================

app.post("/api/admin/login", (req, res) => {
  try {
    const { login, password } = req.body;

    if (
      login === process.env.ADMIN_LOGIN &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { isAdmin: true, login },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        success: true,
        message: "Kirish muvaffaqiyatli",
        token,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Login yoki parol xato",
    });
  } catch (error) {
    console.error("LOGIN XATOSI:", error);

    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi",
    });
  }
});

// ==========================================
// TASHRIFLAR HISOBLAGICHI
// ==========================================

app.post("/api/visit", async (req, res) => {
  try {
    let visit = await Visit.findOne();

    if (!visit) {
      visit = await Visit.create({ count: 1 });
    } else {
      visit.count += 1;
      await visit.save();
    }

    res.status(200).json({
      success: true,
      count: visit.count,
    });
  } catch (error) {
    console.error("VISIT XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Xatolik yuz berdi",
    });
  }
});

app.get("/api/visits", async (req, res) => {
  try {
    const visit = await Visit.findOne();

    res.status(200).json({
      success: true,
      count: visit ? visit.count : 0,
    });
  } catch (error) {
    console.error("VISITS XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Xatolik yuz berdi",
    });
  }
});

// ==========================================
// BUYURTMALAR (ORDERS)
// ==========================================

// ✅ HIMOYALANDI: faqat admin ko'ra oladi
app.get("/api/orders", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("ORDERS FETCH XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Buyurtmalarni olishda xatolik",
    });
  }
});

// ✅ YANGI: buyurtma holatini o'zgartirish (faqat admin)
app.put("/api/orders/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "completed",
      "cancelled",
      "delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Noto'g'ri holat",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("ORDER STATUS XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Holatni yangilashda xatolik",
    });
  }
});

app.post("/api/order", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      comment,
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

    // BAZAGA SAQLASH

    await Order.create({
      name,
      phone,
      email,
      address,
      comment,
      products,
      total,
    });

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
${comment ? `💬 Izoh: ${comment}\n` : ""}
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

// ==========================================
// BAHOLASH (RATING)
// ==========================================

app.get("/api/ratings/:productId", async (req, res) => {
  try {
    const ratings = await Rating.find({
      productId: req.params.productId,
    });

    const count = ratings.length;

    const average =
      count === 0
        ? 0
        : ratings.reduce((sum, r) => sum + r.stars, 0) / count;

    res.status(200).json({
      success: true,
      average,
      count,
    });
  } catch (error) {
    console.error("RATING FETCH XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Baholarni olishda xatolik",
    });
  }
});

app.post("/api/ratings", async (req, res) => {
  try {
    const { productId, stars } = req.body;

    if (!productId || !stars) {
      return res.status(400).json({
        success: false,
        message: "Malumot yetarli emas",
      });
    }

    await Rating.create({ productId, stars });

    const ratings = await Rating.find({ productId });

    const count = ratings.length;

    const average =
      ratings.reduce((sum, r) => sum + r.stars, 0) / count;

    res.status(201).json({
      success: true,
      average,
      count,
    });
  } catch (error) {
    console.error("RATING SAVE XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Bahoni saqlashda xatolik",
    });
  }
});

// ==========================================
// MAHSULOTLAR
// ==========================================

// Ochiq — hamma ko'ra oladi (katalog uchun kerak)
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("PRODUCTS FETCH XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Mahsulotlarni olishda xatolik",
    });
  }
});

// ✅ HIMOYALANDI: faqat admin qo'sha oladi
app.post("/api/products", verifyAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      descriptionUz,
      descriptionEn,
      xotiralar,
    } = req.body;

    if (!name || !category || !xotiralar || xotiralar.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Barcha maydonlarni to'ldiring",
      });
    }

    const product = await Product.create({
      name,
      category,
      image,
      descriptionUz,
      descriptionEn,
      xotiralar,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("PRODUCT CREATE XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Mahsulot qo'shishda xatolik",
    });
  }
});

// ✅ YANGI + HIMOYALANDI: mahsulotni tahrirlash
app.put("/api/products/:id", verifyAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      descriptionUz,
      descriptionEn,
      xotiralar,
    } = req.body;

    if (!name || !category || !xotiralar || xotiralar.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Barcha maydonlarni to'ldiring",
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        image,
        descriptionUz,
        descriptionEn,
        xotiralar,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Mahsulot topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("PRODUCT UPDATE XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Mahsulotni tahrirlashda xatolik",
    });
  }
});

// ✅ HIMOYALANDI: faqat admin o'chira oladi
app.delete("/api/products/:id", verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Mahsulot o'chirildi",
    });
  } catch (error) {
    console.error("PRODUCT DELETE XATOSI:", error);

    res.status(500).json({
      success: false,
      message: "Mahsulotni o'chirishda xatolik",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlayapti`);
});