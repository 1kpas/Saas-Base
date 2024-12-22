import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login");
  return null; // Opcional, pois a execução nunca chega aqui devido ao redirecionamento.
}
