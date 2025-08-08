import React from "react";
import { cn } from "../../lib/utils";
import Container from "./container";

interface Props {
  className?: string;
  text: string;
}

export const Title: React.FC<Props> = ({ className, text }) => {
  return (

      <div className={cn("", className)}>{text}</div>
    
  );
};

export default Title;
