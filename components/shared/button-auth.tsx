"use client";
import React, { useEffect } from "react";
import { cn } from "../../lib/utils";
import { useSession, signIn } from "next-auth/react";
import { Button } from "../ui";
import { CircleUser, Icon, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { cookies } from "next/headers";
import { Api } from "@/services/api-client";
import { useMediaQuery } from "react-responsive";

interface Props {
  className?: string;
}

export const ButtonAuth: React.FC<Props> = ({ className }) => {


  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });
  ///////////
  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);



  const { data: session, status } = useSession();
  React.useEffect(() => {
    async function cookieInfo() {
      if (session && status == "authenticated") {
        await Api.user.getToken(session.user.id);
      }
    }

    cookieInfo();
  }, [session]);

  return (
    <>
      {status == "loading" ? (
        <Skeleton className="w-[120px] h-[36px] rounded-md" />
      ) : !session ? (
        <div className={`flex ${isDesktop ? "" : "justify-between"} gap-2`}>
          <Button
            onClick={() =>
              signIn("google", { callbackUrl: "/", redirect: true })
            }
            variant={"outline"}
            className={`flex items-center gap-2 ${isDesktop ? "" : "w-1/2"}`}
          >
            <img src={`/google.svg`} alt="Google" width={25} height={25} />
            Google
          </Button>
          <Button
            onClick={() => signIn("yandex")}
            variant={"outline"}
            className={`flex items-center gap-2 ${isDesktop ? "" : "w-1/2"}`}
          >
            <img src={`/yandex.svg`} alt="Yandex" width={25} height={25} />
            Яндекс
          </Button>
        </div>
      ) : (
        <Link href="/profile">
          <Button variant={"outline"} className="flex items-center gap-2">
            <CircleUser size={16} />
            Профиль
          </Button>
        </Link>
      )}
    </>
  );
};

export default ButtonAuth;
