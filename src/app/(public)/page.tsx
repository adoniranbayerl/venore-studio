import { redirect } from "next/navigation";
import { auth } from "@/core/auth";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  redirect("/login");
}
