import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/app/providers";
import "./globals.css";
import ServerNav from "./ui/nav/Snav";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Csp Nextjs Starter",
  description: "Csp SaaS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} scroll-smooth max-w-screen`} >
      <body className="min-h-screen ">
        <Providers>
          <ServerNav />
          {children}
          </Providers>
      </body>
    </html>
  );
}
