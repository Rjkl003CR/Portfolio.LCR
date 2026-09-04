import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#000000",
};

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Chamathka Portfolio",
  },
};

import { Providers } from "./Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
