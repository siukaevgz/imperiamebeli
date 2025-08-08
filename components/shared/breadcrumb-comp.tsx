"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { Container } from "./container";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../ui";
import { NextRequest } from "next/server";
import prisma from "@/prisma/prisma-client";
import { Api } from "@/services/api-client";
import { useMediaQuery } from "react-responsive";
import { category } from "@/prisma/constants";

import { Category, CategoryChild, CategoryChildChild } from "@prisma/client";

type urlParams = {
  params: {
    categoryId: String;
    categoryChildId?: String;
    categoryChildChildId?: String;
  };
};

type Props = {
  className?: string;
  req?: urlParams;
};

export const BreadcrumbComp: React.FC<Props> = ({ className, req }) => {
  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });
  ///////////import { useMediaQuery } from "react-responsive";
  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  const [category, setCategory] = React.useState<Category>();
  const [categoryChild, setCategoryChild] = React.useState<CategoryChild>();
  const [categoryChildChild, setCategoryChildChild] =
    React.useState<CategoryChildChild>();

  React.useEffect(() => {
    if (req?.params.categoryId) {
      Api.breadcrumb
        .getCategory(Number(req?.params.categoryId))
        .then((items: Category) => {
          setCategory(items);
        });
    }
    if (req?.params.categoryChildId) {
      Api.breadcrumb
        .getCategoryChild(Number(req?.params.categoryChildId))
        .then((items: CategoryChild) => {
          setCategoryChild(items);
        });
    }
    if (req?.params.categoryChildChildId) {
      Api.breadcrumb
        .getCategoryChildChild(Number(req?.params.categoryChildChildId))
        .then((items: CategoryChildChild) => {
          setCategoryChildChild(items);
        });
    }

    console.log(category);
  }, []);

  return (
    <>
      <Container className={`${className} ${isDesktop ? "" : "pl-4 pr-4"}`}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Каталог</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className={category ? "" : "hidden"} />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                {category ? (
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_URL + "/category/" + category?.id
                    }
                  >
                    {category.name}
                  </Link>
                ) : (
                  "пусто"
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className={categoryChild ? "" : "hidden"} />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                {categoryChild ? (
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_URL +
                      "/category/" +
                      category?.id +
                      "/" +
                      categoryChild?.id
                    }
                  >
                    {categoryChild.name}
                  </Link>
                ) : (
                  ""
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator
              className={categoryChildChild ? "" : "hidden"}
            />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                {categoryChildChild ? (
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_URL +
                      "/category/" +
                      category?.id +
                      "/" +
                      categoryChild?.id +
                      "/" +
                      categoryChildChild.id
                    }
                  >
                    {categoryChildChild.name}
                  </Link>
                ) : (
                  ""
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Container>
    </>
  );
};

export default BreadcrumbComp;
