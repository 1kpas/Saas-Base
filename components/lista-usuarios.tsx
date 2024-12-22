"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/auth'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Usuario {
  id: string
  email: string
  nome: string | null
  usuario: string | null
  data_cadastro: string
  plano: string
  ativo: boolean
  cargo: string
}

export function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [carregando, setCarregando] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    carregarUsuarios()
  }, [])

  async function carregarUsuarios() {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select(`
          *,
          cargos(nome)
        `)
        .order('data_cadastro', { ascending: false })

      if (error) throw error

      setUsuarios(data.map(u => ({
        ...u,
        cargo: u.cargos.nome
      })))
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      toast({
        title: "Erro ao carregar usuários",
        description: "Ocorreu um erro ao carregar a lista de usuários.",
        variant: "destructive",
      })
    } finally {
      setCarregando(false)
    }
  }

  async function alternarStatusUsuario(id: string, ativo: boolean) {
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ ativo: !ativo })
        .eq('id', id)

      if (error) throw error

      setUsuarios(usuarios.map(u => 
        u.id === id ? { ...u, ativo: !ativo } : u
      ))

      toast({
        title: "Status atualizado",
        description: `Usuário ${!ativo ? 'ativado' : 'desativado'} com sucesso.`,
      })
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error)
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status do usuário.",
        variant: "destructive",
      })
    }
  }

  if (carregando) {
    return <div>Carregando usuários...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Data de Cadastro</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.nome || '-'}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>{usuario.usuario || '-'}</TableCell>
              <TableCell>{new Date(usuario.data_cadastro).toLocaleDateString()}</TableCell>
              <TableCell>{usuario.plano}</TableCell>
              <TableCell>{usuario.cargo}</TableCell>
              <TableCell>{usuario.ativo ? 'Ativo' : 'Inativo'}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alternarStatusUsuario(usuario.id, usuario.ativo)}
                >
                  {usuario.ativo ? 'Desativar' : 'Ativar'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

