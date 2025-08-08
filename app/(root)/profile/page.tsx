'use client'
import { Container, Title } from "@/components/shared";
import { BreadcrumbComp, CategoryBlock } from "@/components/shared/";
import Menu from "@/components/shared/menu";
import { Button } from "@/components/ui";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation"

export default function ProfilePage() {

  const { data: session } = useSession();
  if (!session) {
    return redirect("/not-auth")
  }
  return (
    <>
      <div>
        Это ваш профиль {session.user.email}
        <Button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          variant={"outline"}
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Выйти
        </Button>
      </div>
    </>
  );
}
