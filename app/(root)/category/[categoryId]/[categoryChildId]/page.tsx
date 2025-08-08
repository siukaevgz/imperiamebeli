"use client";
import React from "react";
import {
  BreadcrumbComp,
  Container,
  PodCategory3,
  ProductList,
  Title,
} from "@/components/shared/";
import { useMediaQuery } from "react-responsive";
import { useParams } from "next/navigation";

type UrlParams = {
  categoryId?: string;
  categoryChildId?: string;
};

export default function Page() {
  const { categoryId, categoryChildId } = useParams<UrlParams>(); // Используем useParams для получения параметров URL

  // Проверка на наличие categoryId и categoryChildId
  const categoryGetId = typeof categoryId === 'string' ? Number(categoryId) : null;
  const categoryChildGetId = typeof categoryChildId === 'string' ? Number(categoryChildId) : null;

  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });

  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  // Если categoryGetId или categoryChildGetId не установлены, отображаем загрузочный индикатор
  if (categoryGetId === null || categoryChildGetId === null) {
    return <div>Loading...</div>;
  }

  // Создаем объект params для передачи в BreadcrumbComp
  const params = {
    categoryId: typeof categoryId === 'string' ? categoryId : "", // Убедимся, что categoryId - это строка
    categoryChildId: typeof categoryChildId === 'string' ? categoryChildId : "", // Убедимся, что categoryChildId - это строка
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
        <PodCategory3
          categoryId={categoryGetId}
          categoryChildId={categoryChildGetId}
        />
      </Container>

      <Container className="flex justify-between pt-[50px]">
        <ProductList
          categoryId={categoryGetId}
          categoryChildId={categoryChildGetId}
        />
      </Container>
    </>
  );
}
