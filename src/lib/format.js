const numberFormatter = new Intl.NumberFormat("fa-IR");

export const formatNumber = (value) => numberFormatter.format(Math.round(Number(value) || 0));

export const formatPrice = (value) => `${formatNumber(value)} تومان`;

export const STOCK_LABELS = {
  in_stock: "موجود در انبار",
  low_stock: "موجودی محدود",
  out_of_stock: "ناموجود",
};

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export const toEnglishDigits = (value = "") =>
  String(value).replace(/[۰-۹٠-٩]/g, (char) => {
    const persianIndex = PERSIAN_DIGITS.indexOf(char);
    if (persianIndex > -1) return String(persianIndex);
    return String(ARABIC_DIGITS.indexOf(char));
  });

export const toPersianDigits = (value = "") =>
  String(value).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);