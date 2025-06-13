import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NiNJA: The REVIVED XBLS - Best Online JTAG/RGH Experience",
  description: "NiNJA provides the best online JTAG/RGH experience with off-host cheats, ban bypasses, and premium Xbox 360 stealth services. Get online safely with our advanced protection systems.",
  keywords: "Xbox 360, JTAG, RGH, stealth server, XBL, cheats, ban bypass, NiNJA, gaming",
  authors: [{ name: "NiNJA Team" }],
  openGraph: {
    title: "NiNJA: The REVIVED XBLS",
    description: "Best online JTAG/RGH experience with off-host cheats and ban bypasses",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
