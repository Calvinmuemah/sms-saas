export function normalizeNumber(number) {
  number = number.replace(/\s+/g, "");

  if (number.startsWith("07") || number.startsWith("01")) {
    return "+254" + number.slice(1);
  }

  if (number.startsWith("+254")) return number;

  return null;
}

export default function isValidNumber(number) {
  return /^\+254(7|1)\d{8}$/.test(number);
}