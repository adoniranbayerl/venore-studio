import { auth } from "@/core/auth";

export async function currentUser() {
  const session = await auth();

  return session?.user ?? null;
}
