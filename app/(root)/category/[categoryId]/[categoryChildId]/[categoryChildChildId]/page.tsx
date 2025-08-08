"use client";
import React from "react";
import {
  BreadcrumbComp,
  Container,
  ProductList,
  Title,
} from "@/components/shared";
import { useMediaQuery } from "react-responsive";
import { useParams } from "next/navigation";

type UrlParams = {
  categoryId?: string;
  categoryChildId?: string;
  categoryChildChildId?: string;
};

export default function Page() {
  const { categoryId, categoryChildId, categoryChildChildId } = useParams<UrlParams>();

  // Проверка на наличие categoryId и других идентификаторов
  const categoryGetId = typeof categoryId === 'string' ? Number(categoryId) : null;
  const categoryChildGetId = typeof categoryChildId === 'string' ? Number(categoryChildId) : null;
  const categoryChildChildGetId = typeof categoryChildChildId === 'string' ? Number(categoryChildChildId) : null;

  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });

  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  // Если один из идентификаторов не установлен, отображаем загрузочный индикатор
  if (categoryGetId === null || categoryChildGetId === null || categoryChildChildGetId === null) {
    return <div>Loading...</div>;
  }

  // Создаем объект params для передачи в BreadcrumbComp
  const params = {
    categoryId: typeof categoryId === 'string' ? categoryId : "", // Убедимся, что categoryId - это строка
    categoryChildId: typeof categoryChildId === 'string' ? categoryChildId : "", // Убедимся, что categoryChildId - это строка
    categoryChildChildId: typeof categoryChildChildId === 'string' ? categoryChildChildId : "", // Убедимся, что categoryChildChildId - это строка
  };

  return (
    <>
      <BreadcrumbComp className="mt-4" req={{ params }} />
      <Container className={`${isDesktop ? "" : "pl-4"}`}>
        <Title text="Мебельная фурнитура" className="mt-4 text-2xl font-bold" />
      </Container>
      <Container className={`${isDesktop ? "" : "pl-4"}`}>
        <Title
          text="ПО НИЗКИМ ЦЕНАМ"
          className="mt-1 text-sm font-extrabold text-yellow-500"
        />
      </Container>

      <Container className="flex justify-between pt-[50px]">
        <ProductList
          categoryId={categoryGetId}
          categoryChildId={categoryChildGetId}
          categoryChildChildId={categoryChildChildGetId}
        />
      </Container>
    </>
  );
}
