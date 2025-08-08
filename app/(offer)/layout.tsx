'use client'
import { Header } from "@/components/shared";
import HeaderMobile from "@/components/shared/headerMobile";
import type { Metadata } from "next";
import React from "react";
import { useMediaQuery } from "react-responsive";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });

  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  return (
    <>
      {isDesktop ? <Header offer={true} /> : <HeaderMobile offer={true} />}

      {children}
    </>
  );
}
