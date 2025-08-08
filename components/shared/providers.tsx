"use client";
import React, { PropsWithChildren } from "react";

import { SessionProvider } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </>
  );
};

export default Providers;
