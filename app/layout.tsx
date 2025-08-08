import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

import Providers from "@/components/shared/providers";
import Footer from "@/components/shared/footer";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});



export default function RootLayout({
  children,
  types
}: Readonly<{
  children: React.ReactNode;
  types: React.ReactNode;
}>) {
  return (
    <html lang="en">


      <body className={nunito.className}>
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
