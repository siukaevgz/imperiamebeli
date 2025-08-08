'use client'
import React, { useContext } from "react";
import { cn } from "../../lib/utils";
import { useFormContext } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {


  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });

  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);



  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const error = errors[name]?.message as string;
  return (
    <div className={` ${isDesktop ? "w-[45%]" : "w-full"}`}>
      {label && (
        <p className="font-medium mb-2">
          {label}
          {required}
        </p>
      )}
      <div className="relative w-[100%]">
        <input
          className="p-2 border-spacing-1 w-[100%] border-gray-500 rounded bg-slate-200 mt-4"
          {...register(name)}
          {...props}
        />
      </div>
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default FormInput;
