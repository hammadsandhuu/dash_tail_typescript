import { redirect } from "next/navigation";

export default async function HomePage() {
  // Note: Middleware already handles redirects
  // This is just a fallback — in case someone disables middleware
  // or visits "/" directly via client-side routing.

  // On the server, you can’t use js-cookie — we check cookies via headers instead
  // but since middleware covers redirects, this will never render.

  redirect("/auth/login");
}
