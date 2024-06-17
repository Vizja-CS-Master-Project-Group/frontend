import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

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

export function formatDatetime(datetime: string) {
  return dayjs(datetime).format("DD.MM.YYYY hh:mm:ss");
}
