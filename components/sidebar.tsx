"use client"

import { useRouter, usePathname } from 'next/navigation'
import Link from "next/link"
import { Home, Settings, LogOut, ChevronRight } from 'lucide-react'
import { AlternadorTema } from "./alternador-tema"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { fazerLogout } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from 'react'
import { criarClienteNavegador } from '@/app/supabase/cliente'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const linksComuns = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
]

export function Sidebar() {
  const router = useRouter()
  const { toast } = useToast()
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const supabase = criarClienteNavegador()
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) throw error

        if (user) {
          setUserEmail(user.email || "")
          setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || "Usuário")
        } else {
          throw new Error("Usuário não autenticado.")
        }
      } catch (error) {
        console.error("Erro ao carregar informações do usuário:", error)
        toast({
          title: "Erro ao carregar usuário",
          description: "Não foi possível obter as informações do usuário.",
          variant: "destructive",
        })
      }
    }

    carregarUsuario()
  }, [toast])

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

  return (
    <div className="flex flex-col h-screen w-64 bg-background border-r">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`https://avatar.vercel.sh/${userEmail}`} />
            <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </div>
        <AlternadorTema />
      </div>
      <div className="flex-1 py-6 px-3 space-y-1">
        <h2 className="mb-6 px-4 text-lg font-semibold tracking-tight">
          SaaS-Base
        </h2>
        <nav className="space-y-1">
          {linksComuns.map((link) => {
            const isActive = pathname === link.href
            return (
              <TooltipProvider key={link.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start group",
                        isActive ? "bg-secondary" : "hover:bg-accent"
                      )}
                      asChild
                    >
                      <Link href={link.href}>
                        <link.icon className={cn("mr-2 h-4 w-4", isActive && "text-primary")} />
                        <span className={cn(isActive && "font-medium text-primary")}>
                          {link.label}
                        </span>
                        <ChevronRight className={cn(
                          "ml-auto h-4 w-4 opacity-0 transition-opacity",
                          isActive ? "opacity-100 text-primary" : "group-hover:opacity-100"
                        )} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{link.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start hover:bg-accent" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
