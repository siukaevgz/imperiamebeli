"use client";
import { Container, PaginationMain, Title } from "@/components/shared";
import { BreadcrumbComp, CategoryBlock } from "@/components/shared/";
import { Menu } from "@/components/shared/";
import { ProductList } from "@/components/shared/";
import { NextRequest } from "next/server";
import React from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });

  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  return (
    <>
      <Container>
        <Title
          text="Мебельная фурнитура"
          className={` ${
            isDesktop
              ? "mt-4 text-2xl font-bold"
              : "mt-4 text-2xl font-bold pl-4"
          }`}
        />
      </Container>
      <Container className={` ${isDesktop ? "" : "pl-4"}`}>
        <Title
          text="ПО НИЗКИМ ЦЕНАМ"
          className="mt-1 text-sm font-extrabold text-yellow-500"
        />
      </Container>
      <CategoryBlock />
      <Container className="flex justify-between pt-[50px]">
        {isDesktop ? <Menu /> : ""}
        {isDesktop ? <ProductList /> : ""}
      </Container>
    </>
  );
}
