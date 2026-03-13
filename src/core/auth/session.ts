import { auth } from "@/core/auth";

export async function getSession() {
  return auth();
}
