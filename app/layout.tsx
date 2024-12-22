import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ProvedorTema } from "@/components/tema-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Base',
  description: 'Base para projetos SaaS com Next.js e Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ProvedorTema
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ProvedorTema>
      </body>
    </html>
  )
}

