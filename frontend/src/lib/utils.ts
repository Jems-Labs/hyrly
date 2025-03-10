import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = Array.from({ length: 2026 - 1970 + 1 }, (_, i) =>
  (1970 + i).toString()
);
export const rewardOptions = [
  { value: "full_time_job", label: "Full-Time Job", description: "Offer a job upon completion." },
  { value: "interview", label: "Interview Opportunity", description: "Guarantee a future interview." },
  { value: "internship", label: "Internship", description: "Provide an internship role." },
  { value: "cash_prize", label: "Cash Prize", description: "Monetary reward for the best work." },
  { value: "recognition", label: "Recognition", description: "Certificate or public appreciation." },
];
export function getFaviconUrl(url: string) {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
}