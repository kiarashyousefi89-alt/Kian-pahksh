// تنظیمات کلی فروشگاه کیان پخش
// ⚠️ اطلاعات تماس زیر نمونه است؛ کافیست مقادیر را با اطلاعات واقعی خود جایگزین کنید.
export const siteConfig = {
  brand: {
    name: "کیان پخش",
    latinName: "KIAN PAKHSH",
    tagline: "انتخاب مطمئن برای آشپزی بهتر",
  },
  contact: {
    phone: "۰۹۱۸ ۹۴۵ ۶۱۷۷",
    phoneHref: "tel:+989189456177",
    whatsapp: "۰۹۱۸ ۹۴۵ ۶۱۷۷",
    whatsappHref: "https://wa.me/989189456177",
    email: "info@example.com",
    emailHref: "mailto:info@example.com",
    address: "تهران، خیابان نمونه، پلاک ۰۰، طبقه ۰",
    addressHint: "دفتر مرکزی و انبار پخش",
    hours: [
      { days: "شنبه تا چهارشنبه", time: "۸:۳۰ تا ۱۸:۰۰" },
      { days: "پنجشنبه", time: "۸:۳۰ تا ۱۳:۳۰" },
      { days: "جمعه", time: "تعطیل" },
    ],
  },
  categories: ["سرخ‌کردنی", "آفتابگردان", "پخت‌وپز", "زیتون", "کنجد"],
  socials: [
    { key: "instagram", name: "اینستاگرام", href: "https://www.instagram.com/" },
    { key: "telegram", name: "تلگرام", href: "https://telegram.org/" },
    { key: "whatsapp", name: "واتس‌اپ", href: "https://wa.me/989189456177" },
  ],
  navLinks: [
    { label: "خانه", to: "/" },
    { label: "محصولات", to: "/products" },
    { label: "درباره ما", to: "/#about" },
    { label: "خدمات", to: "/#services" },
    { label: "تماس با ما", to: "/contact" },
  ],
};

export const SHIPPING_NOTE = "هزینه ارسال پس از ثبت سفارش محاسبه و توسط کارشناس فروش اعلام می‌شود.";