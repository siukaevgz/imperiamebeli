"use client";
import React from "react";
import Container from "./container";
import { Api } from "@/services/api-client";
import { Category } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

interface Props {
  className?: string;
}

export const CategoryBlock: React.FC<Props> = ({ className }) => {
  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });
  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    setLoading(true);
    Api.categorys.getCategory().then((items: Category[]) => {
      setCategories(items);
      setLoading(false);
    });
  }, []);

  return (
    <Container className={`flex flex-col mt-4 ${className}`}>
      <div className="flex flex-wrap">
        {loading
          ? [...Array(15)].map((_, index_skeleton) => (
              <div
                key={index_skeleton}
                className="w-1/2 p-2 flex justify-center items-center"
              >
                <Skeleton className="flex flex-col items-center justify-center bg-gray-200 rounded-sm w-full h-[130px] pt-4 pb-4" />
              </div>
            ))
          : categories.map((mini) => (
              <div
                key={mini.id}
                className="w-1/2 p-2 flex justify-center items-center"
              >
                <Link
                  href={`/category/${mini.id}`}
                  className="flex flex-col items-center justify-center bg-gray-200 rounded-sm hover:cursor-pointer hover:bg-gray-300 w-full h-full pt-4 pb-4"
                >
                  <img alt={mini.name} src={mini.photo} className="w-[80px]" />
                  <p className="text-center">{mini.name}</p>
                </Link>
              </div>
            ))}
      </div>
    </Container>
  );
};

export default CategoryBlock;
