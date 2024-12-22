import { createServerClient } from "@supabase/ssr";
import type { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

interface CookieParaDefinir {
  name: string;
  value: string;
}

export function createClient(cookieStore: RequestCookies) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesParaDefinir: CookieParaDefinir[]) {
          try {
            cookiesParaDefinir.forEach(({ name, value }) => {
              cookieStore.set(name, value);
            });
          } catch {
            // Em server components, pode não ser possível setar cookies diretamente
          }
        },
      },
    }
  );
}
