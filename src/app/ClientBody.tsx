"use client";

import { ThemeProvider } from "@/components/theme-provider";

export default function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <body suppressHydrationWarning className="antialiased">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </body>
  );
}
