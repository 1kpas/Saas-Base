"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { fazerLogin, fazerRegistro, recuperarSenha } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft } from 'lucide-react'

export default function PaginaAutenticacao() {
  const [modo, setModo] = useState<'login' | 'registro' | 'recuperacao'>('login')
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCarregando(true)

    try {
      switch (modo) {
        case 'login':
          await fazerLogin(email, senha)
          toast({ title: "Login realizado com sucesso", description: "Redirecionando para o painel." })
          router.push("/dashboard")
          break
        case 'registro':
          if (senha !== confirmarSenha) {
            throw new Error("As senhas não coincidem.")
          }
          await fazerRegistro(email, senha)
          toast({ title: "Registro realizado com sucesso", description: "Verifique seu email para confirmar o registro." })
          setModo('login')
          break
        case 'recuperacao':
          await recuperarSenha(email)
          toast({ title: "Email de recuperação enviado", description: "Verifique sua caixa de entrada." })
          setModo('login')
          break
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
        variant: "destructive",
      })
    } finally {
      setCarregando(false)
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={modo}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="w-[350px] shadow-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {modo === 'login' ? "Bem-vindo de volta!" : 
                   modo === 'registro' ? "Crie sua conta" : 
                   "Recuperar senha"}
                </CardTitle>
                <CardDescription className="text-center">
                  {modo === 'login' ? "Entre na sua conta para acessar o painel." : 
                   modo === 'registro' ? "Registre-se para começar a usar nossa plataforma." : 
                   "Enviaremos instruções para recuperar sua senha."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {modo !== 'recuperacao' && (
                    <div className="space-y-2">
                      <Label htmlFor="senha">Senha</Label>
                      <Input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {modo === 'registro' && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                      <Input
                        id="confirmarSenha"
                        type="password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  <Button 
                    className="w-full mt-6" 
                    type="submit" 
                    disabled={carregando}
                  >
                    {carregando ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {carregando
                      ? "Processando..."
                      : modo === 'login'
                      ? "Entrar"
                      : modo === 'registro'
                      ? "Registrar"
                      : "Enviar instruções"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-center space-y-2">
                {modo === 'login' && (
                  <>
                    <button
                      type="button"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setModo('recuperacao')}
                    >
                      Esqueceu sua senha?
                    </button>
                    <p className="text-sm text-muted-foreground">
                      Não tem uma conta?{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline font-medium transition-colors"
                        onClick={() => setModo('registro')}
                      >
                        Registre-se
                      </button>
                    </p>
                  </>
                )}
                {modo === 'registro' && (
                  <p className="text-sm text-muted-foreground">
                    Já tem uma conta?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline font-medium transition-colors"
                      onClick={() => setModo('login')}
                    >
                      Faça login
                    </button>
                  </p>
                )}
                {modo === 'recuperacao' && (
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline font-medium transition-colors flex items-center"
                    onClick={() => setModo('login')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o login
                  </button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
