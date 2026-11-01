import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Syne, Outfit } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-outfit" });

export const metadata = {
  title: "Dinesh Jangra — Full Stack Engineer",
  description: "Dinesh Jangra builds thoughtful full-stack products, AI-powered applications, and interactive web experiences.",
  openGraph: {
    title: "Dinesh Jangra — Full Stack Engineer",
    description: "Thoughtful full-stack products, AI-powered applications, and interactive web experiences.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dinesh Jangra — Full Stack Engineer",
    description: "Thoughtful full-stack products, AI-powered applications, and interactive web experiences.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark" className={`${syne.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}