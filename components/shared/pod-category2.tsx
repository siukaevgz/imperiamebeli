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
}

export const PodCategory2: React.FC<Props> = ({ className, categoryId }) => {
  const [podCategory, setPodCategory] = React.useState<CategoryChild[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    Api.categorys.getPodCategory(categoryId).then((items: CategoryChild[]) => {
      setPodCategory(items);
    });
  }, []);

  const onClickCategory = async (
    categoryId: Number,
    categoryChildId: number
  ) => {
    router.push("/category/" + categoryId + "/" + categoryChildId);
  };
  return (
    <div className="overflow-x-hidden">
      <div className="flex gap-2 mt-10 overflow-x-auto scrollbar-hidden">
        {podCategory.map((items) => (
          <div
            key={items.id}
            onClick={() => onClickCategory(categoryId, items.id)}
            className="shadow-md rounded-sm p-4 border hover:border-yellow-400 hover:cursor-pointer"
          >
            {items.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodCategory2;
