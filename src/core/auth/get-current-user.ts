import { cache } from "react";
import { auth } from "@/core/auth";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  return session?.user ?? null;
});
