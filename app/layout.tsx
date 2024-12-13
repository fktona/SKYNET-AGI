import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import RoboticCursor from "@/components/smooth-cursor";
import Footer from "@/components/footer";
import SkullInWave from "@/components/skull";
import { TypingProvider } from "@/context/ctx";
import RobotNoiseBackground from "@/components/ui/noisebg";

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
      <body className={`${ppInter.className} antialiased  bg-red-600 h-dvh`}>
        <TypingProvider>
          <RoboticCursor />
          <SkullInWave />
          <div className="absolute top-0 left-0 w-full h-full " />
          <RobotNoiseBackground />
          <main className=" h-dvh mb-10 bg-glitch">{children}</main>
          {/* <Footer /> */}
        </TypingProvider>
      </body>
    </html>
  );
}
