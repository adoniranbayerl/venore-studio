import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";

export function getAuthProviders(): Provider[] {
  const providers: Provider[] = [];

  if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
    providers.push(
      GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
      }),
    );
  }

  return providers;
}
