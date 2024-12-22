"use client"

import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Home, Settings, Users, LogOut } from 'lucide-react'
import { AlternadorTema } from "./alternador-tema"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { fazerLogout } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/auth'

const linksComuns = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
]

const linksAdmin = [
  { href: "/admin/usuarios", label: "Gerenciar Usuários", icon: Users },
]

export function Sidebar() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function verificarAdmin() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('usuarios')
          .select('cargos(nome)')
          .eq('id', user.id)
          .single()
        
        // Se cargos for array, verifique o primeiro item
        if (data && Array.isArray(data.cargos) && data.cargos[0]?.nome === 'admin') {
          setIsAdmin(true)
        }
      }
    }
  
    verificarAdmin()
  }, [])
  

  const handleLogout = async () => {
    try {
      await fazerLogout()
      toast({
        title: "Logout realizado com sucesso",
        description: "Você será redirecionado para a página inicial.",
      })
      router.push('/')
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    }
  }

  const links = [...linksComuns, ...(isAdmin ? linksAdmin : [])]

  return (
    <div className="flex flex-col h-screen w-64 bg-background border-r">
      <div className="flex-1 py-6 px-3">
        <h2 className="mb-6 px-4 text-lg font-semibold tracking-tight">
          Dashboard
        </h2>
        <nav className="space-y-1">
          {links.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link href={link.href}>
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t flex items-center justify-between">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
        <AlternadorTema />
      </div>
    </div>
  )
}

