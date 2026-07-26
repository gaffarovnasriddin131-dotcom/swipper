import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      
      welcome: "Welcome to Apple Store",
      greeting:
        "iPhone 17 Pro Max is Apple's powerful flagship phone. It runs very fast, has a high-quality camera and a large OLED display.",
      price: "1500$",
      order: "Order Now",
      viewCatalog: "View Catalog",
      rating: "5.0 Rating",

      
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

      
      contactUs: "CONTACT US",
      contactTitle: "Contact Us",
      contactText:
        "If you have any questions or want to place an order, you can contact us.",
      phone: "Phone",
      telegram: "Telegram",

      
      login: "Login",
      password: "Password",
      close: "Close",
      loginSuccess: "Login successful!",
      loginError: "Incorrect login or password!",

    
      home: "Home",
      catalog: "Catalog",
    },
  },

  uz: {
    translation: {
      
      welcome: "Apple Store'ga xush kelibsiz",
      greeting:
        "iPhone 17 Pro Max — Apple kompaniyasining kuchli flagman telefoni. U juda tez ishlaydi, yuqori sifatli kamera va katta OLED ekranga ega.",
      price: "18 000 000 UZS",
      order: "Buyurtma berish",
      viewCatalog: "Katalogni ko'rish",
      rating: "5.0 Reyting",

      
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

     
      contactUs: "BIZ BILAN BOG'LANING",
      contactTitle: "Biz bilan bog'laning",
      contactText:
        "Savollaringiz yoki buyurtma bo'yicha biz bilan bog'lanishingiz mumkin.",
      phone: "Telefon",
      telegram: "Telegram",

      
      login: "Kirish",
      password: "Parol",
      close: "Yopish",
      loginSuccess: "Kirish muvaffaqiyatli!",
      loginError: "Login yoki parol xato!",

      
      home: "Bosh sahifa",
      catalog: "Katalog",
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