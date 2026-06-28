import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mastering Contract Drafting & Freelancing | Lawctopus Law School",
  description: "Learn to draft 24+ high-demand contracts, launch an elite freelancing career on Upwork, and get evaluated by top legal faculty in a comprehensive 6-month expert-level course.",
  keywords: ["contract drafting", "freelancing", "lawctopus", "legal training", "upwork", "ndas", "shareholders agreement", "legal career"],
  authors: [{ name: "Lawctopus Law School" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
