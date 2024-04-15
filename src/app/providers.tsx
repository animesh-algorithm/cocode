"use client";

import { ThemeProvider } from "@/providers/theme-providers";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <NextTopLoader color="#f25d5b" showSpinner={false} />

      {children}
    </ThemeProvider>
  );
}
