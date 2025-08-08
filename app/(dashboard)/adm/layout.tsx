import { Container, Header } from "@/components/shared";
import { BookOpen, QrCode } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Индустрия Мебели",
  description: "Интернет-магазин фурнитуры для мебели",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header offer={true} />
      <Container>
        <div className="flex space-x-4 p-4 bg-gray-100 rounded-lg shadow mb-4 mt-4">
          <Link
            href="/adm"
            className="flex items-center space-x-2 p-2 bg-white rounded-lg transition duration-200 hover:bg-blue-500 hover:text-white"
          >
            <BookOpen className="h-5 w-5" />
            <span>Заказы</span>
          </Link>
          <Link
            href="/adm/qr"
            className="flex items-center space-x-2 p-2 bg-white rounded-lg transition duration-200 hover:bg-blue-500 hover:text-white"
          >
            <QrCode className="h-5 w-5" />
            <span>QR-коды</span>
          </Link>
        </div>
      </Container>
      {children}
    </>
  );
}
