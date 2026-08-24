import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chamathka Ranathunga | Full-Stack Developer & IT Undergraduate",
  description:
    "Portfolio of Chamathka Ranathunga — Full-Stack Developer, IoT Engineer, and BSc (Hons) IT undergraduate at the University of Moratuwa. Specializing in Next.js, Spring Boot, and embedded systems.",
  keywords: [
    "Chamathka Ranathunga",
    "Full-Stack Developer",
    "University of Moratuwa",
    "Software Engineer",
    "Next.js",
    "Spring Boot",
    "IoT",
    "Portfolio",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
