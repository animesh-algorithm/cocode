import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./header";
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
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
