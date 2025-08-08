"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto xl:max-w-[1280px] md:w-full", className)}>
      {children}
    </div>
  ); // Возвращаем null для мобильной версии
};

export default Container;
