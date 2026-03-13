import { auth } from "@/core/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return children;
}
