import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import RoboticCursor from "@/components/smooth-cursor";
import Footer from "@/components/footer";
import SkullInWave from "@/components/skull";
import { TypingProvider } from "@/context/ctx";

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
      <body className={`${ppInter.className} antialiased bg-gray-700 h-dvh`}>
        <TypingProvider>
          {" "}
          <RoboticCursor />
          <SkullInWave />
          <main className=" h-dvh mb-10 bg-black">{children}</main>
          {/* <Footer /> */}
        </TypingProvider>
      </body>
    </html>
  );
}
