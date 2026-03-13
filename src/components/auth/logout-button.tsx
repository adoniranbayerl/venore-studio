"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/core/auth/actions/sign-out";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await signOutAction();
        })
      }
    >
      <LogOut className="mr-2 size-4" />
      {isPending ? "Saindo..." : "Sair"}
    </Button>
  );
}
