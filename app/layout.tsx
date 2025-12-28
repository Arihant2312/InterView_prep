import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

// import DotGrid from "@/components/magicui/Backgrounds/DotGrid/DotGrid"; // Uncomment if you want DotGrid everywhere

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Prep.io",
  description: "An AI powered Interview PReparation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} antialiased relative`}>
        {/* Example: Add a global background here */}
        {/* <DotGrid className="fixed inset-0 -z-10 h-screen w-screen" dotSize={8} gap={24} baseColor="#3b82f6" activeColor="#06b6d4" /> */}
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}