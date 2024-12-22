import { Cabecalho } from '../components/cabecalho'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Cabecalho />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao SaaS Base</h1>
        <p className="text-xl">
          Esta é a base para o seu próximo projeto SaaS usando Next.js e Supabase.
        </p>
      </main>
    </div>
  )
}