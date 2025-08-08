"use client";
import React from "react";
import {
  BreadcrumbComp,
  Container,
  PodCategory2,
  ProductList,
  Title,
} from "@/components/shared/";
import { useMediaQuery } from "react-responsive";
import { useParams, useRouter } from "next/navigation"; 
import { Api } from "@/services/api-client"; // Предполагается, что Api есть для получения категории

export default function Page() {
  const { categoryId } = useParams(); // Получаем categoryId из параметров URL
  const router = useRouter();

  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });

  const [loading, setLoading] = React.useState(true);
  const [categoryGetId, setCategoryGetId] = React.useState<number | null>(null);

  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  React.useEffect(() => {
    if (typeof categoryId === 'string') {
      setCategoryGetId(Number(categoryId));
      setLoading(false); // Загрузка завершена
    } else {
      // Если categoryId невалидный, можно перенаправить или установить loading
      setLoading(false);
    }
  }, [categoryId]);

  // Если загрузка не завершена, можно отобразить индикатор загрузки
  if (loading) {
    return <div>Loading...</div>;
  }

  // Если categoryGetId не установлен, можно отобразить сообщение
  if (categoryGetId === null) {
    return <div>Category not found.</div>;
  }

  // Создаем объект params для передачи в BreadcrumbComp только после получения categoryId
  const params = {
    categoryId: String(categoryGetId), // Убедимся, что categoryId - это строка
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
        <PodCategory2 categoryId={categoryGetId} />
      </Container>

      <Container className="flex justify-between pt-[50px]">
        <ProductList categoryId={categoryGetId} />
      </Container>
    </>
  );
}
