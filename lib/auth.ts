import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function fazerLogin(email: string, senha: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function fazerRegistro(email: string, senha: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function fazerLogout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}
