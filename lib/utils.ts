import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(money: number | bigint, currency = "EUR") {
  const formatter = new Intl.NumberFormat(
    new Intl.NumberFormat().resolvedOptions().locale,
    {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    },
  );

  return formatter.format(money);
}

export function formatNumber(number: number | bigint) {
  const formatter = new Intl.NumberFormat(
    new Intl.NumberFormat().resolvedOptions().locale,
  );
  return formatter.format(number);
}
