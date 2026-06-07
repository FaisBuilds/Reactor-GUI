import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "MARK 5 | Arc Reactor Interface",
  description:
    "Premium holographic Arc Reactor GUI — evolved from the original Jarvis desktop assistant concept.",
  keywords: ["arc reactor", "jarvis", "stark", "holographic UI"],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${jetbrains.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
