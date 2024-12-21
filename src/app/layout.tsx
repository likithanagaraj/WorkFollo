import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../styles/globals.css";
import "../styles/typography.css";
import { Toaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Freelance Flow",
  description: "Simplify Freelancing & Agency Work with Our All-in-One Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  antialiased`}
      >
        {children}
        <Toaster />

      </body>
    </html>
  );
}
