
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appleStore: "Apple Store",
      premiumTechnology: "Premium Technology",
      welcomeFirst: "Welcome to",
      welcomeSecond: "Apple Store",
      heroDescription:
        "Find the latest Apple products in one place. Modern design, powerful technology and reliable service — all for you.",
      viewCatalog: "View Catalog",
      productsCount: "Products",
      premiumQuality: "Premium Quality",
      support: "Support",

      home: "Home",
      katalog: "Catalog",
      about: "About Us",
      contactTitle: "Contact Us",

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
      productBack: "Back to Catalog",

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
      orderDescription:
        "Enter your information to place your order.",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      email: "Email",
      deliveryAddress: "Delivery Address",
      orderComment: "Comment (optional)",
      fillAllFields: "Please fill in all fields.",
      orderError: "An error occurred while placing the order.",
      orderSuccess: "Your order has been successfully sent!",
      orderFailed: "Failed to send the order.",
      sending: "Sending...",
      confirmOrder: "Confirm Order",
      cancel: "Cancel",
      placeOrder: "Place Order",

      contactUs: "CONTACT US",
      contactText:
        "If you have any questions or want to place an order, you can contact us.",
      phone: "Phone",
      telegram: "Telegram",
      call: "Call us",
      callUs: "Call us",
      telegramMessage: "Message us on Telegram",
      writeTelegram: "Message us on Telegram",

      aboutTitle: "About Us",
      aboutDescription:
        "Apple Store brings modern Apple technology together in one place. We offer quality products, modern design and reliable service.",

      aboutQualityTitle: "Quality",
      aboutQualityText:
        "We focus on providing quality Apple products and giving our customers a reliable shopping experience.",

      aboutProductsTitle: "Apple Products",
      aboutProductsText:
        "Discover iPhone, Mac, iPad, AirPods, Apple Watch and other Apple products in our catalog.",

      aboutServiceTitle: "Great Service",
      aboutServiceText:
        "Our goal is to make shopping simple, comfortable and convenient for every customer.",

      aboutBottomTitle: "Technology for You",
      aboutBottomText:
        "Choose your favorite Apple product and enjoy modern technology with Apple Store.",

      login: "Login",
      password: "Password",
      close: "Close",
      loginSuccess: "Login successful!",
      loginError: "Incorrect login or password!",

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

      adminPanel: "Admin Panel",
      adminDashboard: "Admin Dashboard",
      admin: "Admin",
      dashboard: "Dashboard",
      orders: "Orders",
      productsLabel: "Products",
      users: "Users",
      settings: "Settings",
      logout: "Logout",
      visits: "Visits",

      welcomeAdmin: "Welcome Back, Admin",
      manageStore: "Manage your Apple Store quickly and easily.",
      revenue: "Revenue",
      recentOrders: "Recent Orders",
      customer: "Customer",
      product: "Product",
      price: "Price",
      status: "Status",
      completed: "Completed",
      pending: "Pending",
      cancelled: "Cancelled",
      delivered: "Delivered",
      addProduct: "Add Product",
      viewOrders: "View Orders",
      manageUsers: "Manage Users",

      productName: "Product Name",
      category: "Category",
      action: "Action",
      delete: "Delete",
      edit: "Edit",
      role: "Role",
      actions: "Actions",

      errorTitle: "Error",
      fillAllCodes: "Please fill in all fields!",
      successTitle: "Successful",
      productAdded: "Product added.",
      deletedTitle: "Deleted",
      productDeleted: "Product deleted.",

      storeName: "Store Name",
      address: "Address",
      saveChanges: "Save Changes",
      settingsSaved: "Settings saved successfully.",
      fillAllSettings:
        "Please fill in all fields completely.",
    },
  },

  uz: {
    translation: {
      appleStore: "Apple Store",
      premiumTechnology: "Premium Texnologiya",
      welcomeFirst: "Apple Store'ga",
      welcomeSecond: "xush kelibsiz",
      heroDescription:
        "Eng yangi Apple mahsulotlarini bir joydan toping. Zamonaviy dizayn, kuchli texnologiya va ishonchli xizmat — barchasi siz uchun.",
      viewCatalog: "Katalogni ko'rish",
      productsCount: "Mahsulotlar",
      premiumQuality: "Premium sifat",
      support: "Qo'llab-quvvatlash",

      home: "Bosh sahifa",
      katalog: "Katalog",
      about: "Biz haqimizda",
      contactTitle: "Biz bilan bog'laning",

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
      productBack: "Katalogga qaytish",

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
      orderComment: "Izoh (ixtiyoriy)",
      fillAllFields: "Iltimos, barcha maydonlarni to'ldiring.",
      orderError: "Buyurtma berishda xatolik yuz berdi.",
      orderSuccess: "Buyurtmangiz muvaffaqiyatli yuborildi!",
      orderFailed: "Buyurtmani yuborib bo'lmadi.",
      sending: "Yuborilmoqda...",
      confirmOrder: "Buyurtmani tasdiqlash",
      cancel: "Bekor qilish",
      placeOrder: "Buyurtma berish",

      contactUs: "BIZ BILAN BOG'LANING",
      contactText:
        "Savollaringiz yoki buyurtma bo'yicha biz bilan bog'lanishingiz mumkin.",
      phone: "Telefon",
      telegram: "Telegram",
      call: "Qo'ng'iroq qilish",
      callUs: "Qo'ng'iroq qilish",
      telegramMessage: "Telegram orqali yozish",
      writeTelegram: "Telegram orqali yozish",

      aboutTitle: "Biz haqimizda",
      aboutDescription:
        "Apple Store zamonaviy Apple texnologiyalarini bir joyga jamlaydi. Biz sifatli mahsulotlar, zamonaviy dizayn va ishonchli xizmatni taklif qilamiz.",

      aboutQualityTitle: "Sifat",
      aboutQualityText:
        "Biz sifatli Apple mahsulotlarini taqdim etishga va mijozlarimizga ishonchli xarid tajribasini yaratishga e'tibor beramiz.",

      aboutProductsTitle: "Apple mahsulotlari",
      aboutProductsText:
        "Katalogimizdan iPhone, Mac, iPad, AirPods, Apple Watch va boshqa Apple mahsulotlarini topishingiz mumkin.",

      aboutServiceTitle: "Yaxshi xizmat",
      aboutServiceText:
        "Bizning maqsadimiz har bir mijoz uchun xarid qilish jarayonini oddiy, qulay va yoqimli qilish.",

      aboutBottomTitle: "Texnologiya siz uchun",
      aboutBottomText:
        "O'zingizga yoqqan Apple mahsulotini tanlang va Apple Store bilan zamonaviy texnologiyalardan bahramand bo'ling.",

      login: "Kirish",
      password: "Parol",
      close: "Yopish",
      loginSuccess: "Kirish muvaffaqiyatli!",
      loginError: "Login yoki parol xato!",

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

      adminPanel: "Admin Panel",
      adminDashboard: "Admin Boshqaruv Paneli",
      admin: "Admin",
      dashboard: "Boshqaruv",
      orders: "Buyurtmalar",
      productsLabel: "Mahsulotlar",
      users: "Foydalanuvchilar",
      settings: "Sozlamalar",
      logout: "Chiqish",
      visits: "Tashriflar",

      welcomeAdmin: "Xush kelibsiz, Admin",
      manageStore: "Apple Store'ingizni tez va qulay boshqaring.",
      revenue: "Daromad",
      recentOrders: "So'nggi buyurtmalar",
      customer: "Mijoz",
      product: "Mahsulot",
      price: "Narx",
      status: "Holat",
      completed: "Bajarildi",
      pending: "Kutilmoqda",
      cancelled: "Bekor qilindi",
      delivered: "Yetkazildi",
      addProduct: "Mahsulot qo'shish",
      viewOrders: "Buyurtmalarni ko'rish",
      manageUsers: "Foydalanuvchilarni boshqarish",

      productName: "Mahsulot nomi",
      category: "Kategoriya",
      action: "Amal",
      delete: "O'chirish",
      edit: "Tahrirlash",
      role: "Rol",
      actions: "Amallar",

      errorTitle: "Xatolik",
      fillAllCodes: "Kodlarni to'liq yozing!",
      successTitle: "Muvaffaqiyatli",
      productAdded: "Mahsulot qo'shildi.",
      deletedTitle: "O'chirildi",
      productDeleted: "Mahsulot o'chirildi.",

      storeName: "Do'kon nomi",
      address: "Manzil",
      saveChanges: "O'zgarishlarni saqlash",
      settingsSaved: "Sozlamalar muvaffaqiyatli saqlandi.",
      fillAllSettings:
        "Iltimos, barcha maydonlarni to'liq to'ldiring.",
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

