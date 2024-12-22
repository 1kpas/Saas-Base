import Link from 'next/link'
import { AlternadorTema } from './alternador-tema'

export function Cabecalho() {
  return (
    <header className="flex items-center justify-between p-4 bg-background">
      <Link href="/" className="text-2xl font-bold">
        SaaS Base
      </Link>
      <nav className="flex items-center space-x-4">
        <Link href="/auth/login" className="text-foreground hover:underline">
          Entrar
        </Link>
        <Link href="/auth/registro" className="text-foreground hover:underline">
          Registrar
        </Link>
        <AlternadorTema />
      </nav>
    </header>
  )
}