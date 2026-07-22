import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MainHeader } from "@/components/layout/main-header";
import { MainFooter } from "@/components/layout/main-footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Tibamkononi — Connecting Mombasa's Healthcare",
  description:
    "Digital healthcare platform connecting hospitals, patients, and the county health office in Mombasa. AI-powered triage, emergency response, and hospital management.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="antialiased min-h-screen bg-background flex flex-col">
        <Providers>
          <MainHeader />
          <main className="flex-1">{children}</main>
          <MainFooter />
          <MobileNav />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
