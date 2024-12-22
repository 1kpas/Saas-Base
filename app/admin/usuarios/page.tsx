import { createClient } from "@/app/supabase/servidor"
import { cookies as nextCookies } from "next/headers"
import { redirect } from "next/navigation"
import { ListaUsuarios } from "@/components/lista-usuarios"
import type { RequestCookies } from "next/dist/server/web/spec-extension/cookies"

export default async function PaginaAdminUsuarios() {
  // Aqui, cookies() retorna Promise<ReadonlyRequestCookies>, mas queremos `RequestCookies`.
  const readOnlyCookies = await nextCookies()

  // Forçamos coerção:
  const cookieStore = readOnlyCookies as unknown as RequestCookies

  // Agora o TS aceita que cookieStore tem .set() etc.
  const supabase = createClient(cookieStore)

  // Obter usuário logado
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: usuarioAtual } = await supabase
    .from("usuarios")
    .select("*, cargos(nome)")
    .eq("id", user.id)
    .single()

  if (!usuarioAtual || usuarioAtual.cargos.nome !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Administração de Usuários</h1>
      <ListaUsuarios />
    </div>
  )
}
