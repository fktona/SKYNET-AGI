import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import RoboticCursor from "@/components/smooth-cursor";

const ppInter = Inter({
  subsets: ["latin"],
  variable: "--font-Inter",
});
export const metadata: Metadata = {
  title: "Skynet  AGI",
  description: "Skynet AGI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ppInter.className} antialiased bg-gray-700`}>
        <RoboticCursor />
        <main className="bg-glitch h-dvh">{children}</main>
      </body>
    </html>
  );
}
