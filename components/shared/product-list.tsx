"use client";
import * as React from "react";
import { Api } from "@/services/api-client";
import { theProducts } from "@/services/products";
import { Image, User } from "lucide-react";
import { Button } from "../ui";
import { Product, SkeletonProduct } from "@/components/shared";
import {
  usePaginationStore,
  useProductsStore,
  useCategoryStore,
} from "@/store/";
import { useMediaQuery } from "react-responsive";

import PaginationMain from "./pagination-main";
import { categoryChild, categoryChildChild } from "@/prisma/constants";

interface Props {
  className?: String;
  categoryId?: Number;
  categoryChildId?: Number;
  categoryChildChildId?: Number;
}

export const ProductList: React.FC<Props> = ({
  className,
  categoryId,
  categoryChildId,
  categoryChildChildId,
}) => {
  const setProducts = useProductsStore((state) => state.setProducts);
  const products = useProductsStore((state) => state.products);
  const pageNumberIndex = usePaginationStore((state) => state.pageNumber);

  const [loading, setLoadin] = React.useState(true);
  const [countProduct, setCountProduct] = React.useState<Number>(0);

  React.useEffect(() => {
    setLoadin(true);
    //////Список продуктов
    Api.products
      .getProducts(
        pageNumberIndex,
        categoryId,
        categoryChildId,
        categoryChildChildId
      )
      .then((items: theProducts[]) => {
        setProducts(items);
        setLoadin(false);
      });

    /////Количество страниц для пагинации
    Api.products
      .getProductsCount(categoryId, categoryChildId, categoryChildChildId)
      .then((res: Number) => {
        setCountProduct(res);
      });

    /////События: переход по странице, выбор новой категории подкатегории подподкатегории
  }, [pageNumberIndex]);

  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });
  ///////////import { useMediaQuery } from "react-responsive";
  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  return (
    <div
      className={` ${
        isDesktop ? "" : "flex flex-col justify-center pl-4 pr-4 w-full"
      } `}
    >
      <div
        className={` ${
          isDesktop
            ? "grid gap-10 grid-cols-3 w-[800px]"
            : "flex flex-col justify-center gap-2 w-full"
        } `}
      >
        {loading
          ? [...Array(10)].map((_, index) => <SkeletonProduct key={index} />)
          : products.map((items: theProducts) => (
              <Product key={items.id} items={items} />
            ))}
      </div>
      <PaginationMain countProduct={countProduct} />
    </div>
  );
};

export default ProductList;
