"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui";
import { Api } from "@/services/api-client";
import { usePaginationStore } from "@/store/pagination";
import { useCategoryStore } from "@/store";

interface Props {
  className?: string;
  countProduct:Number,

}

export const PaginationMain: React.FC<Props> = ({ className,countProduct }) => {
  const setPageIndex = usePaginationStore((state) => state.setPageNumber);


 

  return (
    <div className={cn("", className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" size={undefined} />
          </PaginationItem>
          {[...Array(countProduct)].map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                onClick={() => setPageIndex(index + 1)}
                href="#"
                size={undefined}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
           
          <PaginationItem className={Number(countProduct) < Number(5) ? "hidden" : ""}>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" size={undefined} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationMain;
