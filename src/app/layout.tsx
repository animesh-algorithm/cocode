import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Header from "../components/layout/header";
import { Toaster } from "@/components/ui/toaster";

const font = localFont({
  src: "../../public/fonts/Cubano.ttf",
});

export const metadata: Metadata = {
  title: "CoCode",
  description: "A Pair Programming Social Network for Developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray8 ${font.className}`}>
        <Providers>
          <Header />
          {children}
          <div className="bottom-0 top-[55%] fixed bg-gradient-to-t dark:from-gray-800 left-0 right-0 -z-10"></div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
