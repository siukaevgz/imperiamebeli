import React from "react";
import { cn } from "../../lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  className?: string;
}

export const SkeletonProduct: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex flex-col justify-between hover:cursor-pointer">
      <div className="flex w-full justify-center items-center mb-5">
        <Skeleton className="w-[200px] h-[200px]" />
      </div>
      <div>
        <Skeleton className="w-[100px] h-[20px] mb-2 rounded-sm" />
        <Skeleton className="w-full h-[50px] mb-4 rounded-sm" />

        <div className="flex justify-between">
          <Skeleton className="w-[80px] h-[30px]  rounded-sm" />
          <Skeleton className="w-[114px] h-[36px] rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
