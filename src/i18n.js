
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      premiumTechnology: "Premium Technology",
      welcomeFirst: "Welcome to",
      welcomeSecond: "Apple Store",
      heroDescription:
        "Find the latest Apple products in one place. Modern design, powerful technology and reliable service — all for you.",
      viewCatalog: "View Catalog",
      productsCount: "Products",
      premiumQuality: "Premium Quality",
      support: "Support",

      katalog: "Catalog",
      catalogText:
        "Choose your favorite Apple products at the best prices.",
      addToCart: "Add to Cart",

      storage: "Storage",
      selectStorage: "Select Storage",
      selectedStorage: "Selected storage",

      rateProduct: "Rate this product",
      selectRating: "Select a star to rate",
      yourRating: "You rated",

      backToCatalog: "Back to Catalog",

      cart: "Cart",
      products: "products",
      total: "Total",
      emptyCart: "Your cart is empty.",
      emptyCartText: "Your cart is empty.",
      orderNow: "Order Now",
      remove: "Remove",
      quantity: "Quantity",

      checkout: "Checkout",
      orderTitle: "Place an Order",
      orderDescription: "Enter your information to place your order.",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      email: "Email",
      deliveryAddress: "Delivery Address",
      fillAllFields: "Please fill in all fields.",
      orderError: "An error occurred while placing the order.",
      orderSuccess: "Your order has been successfully sent!",
      orderFailed: "Failed to send the order.",
      sending: "Sending...",
      confirmOrder: "Confirm Order",
      cancel: "Cancel",

      contactUs: "CONTACT US",
      contactTitle: "Contact Us",
      contactText:
        "If you have any questions or want to place an order, you can contact us.",
      phone: "Phone",
      telegram: "Telegram",
      call: "Call us",
      telegramMessage: "Message us on Telegram",

      login: "Login",
      password: "Password",
      close: "Close",
      loginSuccess: "Login successful!",
      loginError: "Incorrect login or password!",

      home: "Home",
      catalog: "Catalog",
      contact: "Contact",

      all: "All",
      iphone: "iPhone",
      mac: "Mac",
      ipad: "iPad",
      airpods: "AirPods",
      appleWatch: "Apple Watch",
      accessories: "Accessories",

      chooseStorage: "Choose storage",
      productRating: "Rate this product",
      back: "Back to Catalog",
      addCart: "Add to Cart",
    },
  },

  uz: {
    translation: {
      premiumTechnology: "Premium Texnologiya",
      welcomeFirst: "Apple Store'ga",
      welcomeSecond: "xush kelibsiz",
      heroDescription:
        "Eng yangi Apple mahsulotlarini bir joydan toping. Zamonaviy dizayn, kuchli texnologiya va ishonchli xizmat — barchasi siz uchun.",
      viewCatalog: "Katalogni ko'rish",
      productsCount: "Mahsulotlar",
      premiumQuality: "Premium sifat",
      support: "Qo'llab-quvvatlash",

      katalog: "Katalog",
      catalogText:
        "O'zingizga yoqqan Apple mahsulotlarini eng qulay narxlarda tanlang.",
      addToCart: "Savatga qo'shish",

      storage: "Xotira",
      selectStorage: "Xotirani tanlang",
      selectedStorage: "Tanlangan xotira",

      rateProduct: "Mahsulotga baho bering",
      selectRating: "Baho berish uchun yulduz tanlang",
      yourRating: "Sizning bahoyingiz",

      backToCatalog: "Katalogga qaytish",

      cart: "Savat",
      products: "ta mahsulot",
      total: "Jami",
      emptyCart: "Savat hozircha bo'sh.",
      emptyCartText: "Savat hozircha bo'sh.",
      orderNow: "Buyurtma berish",
      remove: "O'chirish",
      quantity: "Miqdor",

      checkout: "Buyurtma berish",
      orderTitle: "Buyurtma berish",
      orderDescription:
        "Buyurtma berish uchun ma'lumotlaringizni kiriting.",
      fullName: "To'liq ism",
      phoneNumber: "Telefon raqami",
      email: "Elektron pochta",
      deliveryAddress: "Yetkazib berish manzili",
      fillAllFields: "Iltimos, barcha maydonlarni to'ldiring.",
      orderError: "Buyurtma berishda xatolik yuz berdi.",
      orderSuccess: "Buyurtmangiz muvaffaqiyatli yuborildi!",
      orderFailed: "Buyurtmani yuborib bo'lmadi.",
      sending: "Yuborilmoqda...",
      confirmOrder: "Buyurtmani tasdiqlash",
      cancel: "Bekor qilish",

      contactUs: "BIZ BILAN BOG'LANING",
      contactTitle: "Biz bilan bog'laning",
      contactText:
        "Savollaringiz yoki buyurtma bo'yicha biz bilan bog'lanishingiz mumkin.",
      phone: "Telefon",
      telegram: "Telegram",
      call: "Qo'ng'iroq qilish",
      telegramMessage: "Telegram orqali yozish",

      login: "Kirish",
      password: "Parol",
      close: "Yopish",
      loginSuccess: "Kirish muvaffaqiyatli!",
      loginError: "Login yoki parol xato!",

      home: "Bosh sahifa",
      catalog: "Katalog",
      contact: "Aloqa",

      all: "Barchasi",
      iphone: "iPhone",
      mac: "Mac",
      ipad: "iPad",
      airpods: "AirPods",
      appleWatch: "Apple Watch",
      accessories: "Aksessuarlar",

      chooseStorage: "Xotirani tanlang",
      productRating: "Mahsulotga baho bering",
      back: "Katalogga qaytish",
      addCart: "Savatga qo'shish",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

