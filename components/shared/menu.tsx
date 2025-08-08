"use client";
import React from "react";
import { cn } from "../../lib/utils";
import Container from "./container";
import { Button } from "../ui";
import { AlignJustify, ArrowRight, ShoppingCart, User } from "lucide-react";
import SearchInput from "./search-input";
import { Api } from "@/services/api-client";
import { Category } from "@prisma/client";
import Title from "./title";
import { useCategoryStore, usePaginationStore } from "@/store";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export const Menu: React.FC<Props> = ({ className }) => {
  const setPageIndex = usePaginationStore((state) => state.setPageNumber);

  const [categorys, setCategorys] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    Api.categorys.getCategory().then((items: Category[]) => {
      setCategorys(items);
      setLoading(false);
    });
  }, []);

  return (
    <div className={cn("flex flex-col w-[220px] h-auto gap-5", className)}>
      <Title
        text={"Все товары"}
        className="mt-4 text-xl font-bold text-left w-full mb-6"
      />
      {loading
        ? [...Array(12)].map((_, index) => (
            <Skeleton key={index} className="h-[25px] w-full rounded-sm" />
          ))
        : categorys.map((items) => (
            <Link
              href={`/category/${items.id}`}
              key={items.id}
              className="text-sm font-bold text-slate-900 hover:cursor-pointer hover:text-yellow-500"
            >
              {items.name}
            </Link>
          ))}
    </div>
  );
};

export default Menu;
