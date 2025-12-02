import type { Metadata } from "next";
import { Roboto, Vazirmatn, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Vahedi Tools - Professional Industrial & Construction Tools",
  description: "Premium quality industrial, construction, and hardware tools. Shop drills, hammers, power tools, and more. Trusted by professionals worldwide.",
  keywords: ["tools", "industrial", "construction", "hardware", "drills", "hammers", "power tools", "professional tools"],
  authors: [{ name: "Mohammad Vahedi" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Vahedi Tools - Professional Tools Store",
    description: "Premium quality industrial and construction tools for professionals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vahedi Tools",
    description: "Professional industrial and construction tools",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${vazirmatn.variable} ${notoSansArabic.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
