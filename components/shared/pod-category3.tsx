"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { useCategoryStore } from "@/store";
import { CategoryChild, CategoryChildChild } from "@prisma/client";
import { Api } from "@/services/api-client";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  categoryId: Number;
  categoryChildId: Number;
}

export const PodCategory3: React.FC<Props> = ({
  className,
  categoryId,
  categoryChildId,
}) => {
  const [podCategory, setPodCategory] = React.useState<CategoryChildChild[]>(
    []
  );
  const router = useRouter();

  React.useEffect(() => {
    Api.categorys
      .getPodPodCategory(categoryChildId)
      .then((items: CategoryChildChild[]) => {
        setPodCategory(items);
      });
  }, []);

  const onClickCategory = async (
    categoryId: Number,
    categoryChildId: Number,
    categoryChildChildId: Number
  ) => {
    router.push(
      "/category/" +
        categoryId +
        "/" +
        categoryChildId +
        "/" +
        categoryChildChildId
    );
  };
  return (
    <div className="overflow-x-hidden">
      <div className="flex gap-2 mt-10 overflow-x-auto scrollbar-hidden">
        {podCategory.map((items) => (
          <div
            key={items.id}
            onClick={() =>
              onClickCategory(categoryId, categoryChildId, items.id)
            }
            className="shadow-md rounded-sm p-4 border hover:border-yellow-400 hover:cursor-pointer"
          >
            {items.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodCategory3;
