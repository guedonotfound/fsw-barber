"use client"

import { SearchIcon, Loader2 } from "lucide-react" // Importando o ícone de carregamento
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Digite algo para buscar",
  }),
})

const Search = () => {
  const [loading, setLoading] = useState(false) // Estado de carregamento
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  })

  const router = useRouter()

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true) // Ativa o carregamento
    try {
      // Simula uma busca, pode ser um tempo para completar a navegação
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push(`/barbershops?title=${data.title}`)
    } finally {
      setLoading(false) // Desativa o carregamento
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        {/* Campo de Busca */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Busque barbearias ou serviços..."
                  {...field}
                  className="w-full bg-secondary focus:outline-none focus:ring focus:ring-primary"
                  disabled={loading} // Desabilita o input enquanto carrega
                />
              </FormControl>
              {/* Mensagem de erro de validação */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Botão de Submissão */}
        <Button
          type="submit"
          className="rounded-xl focus:outline-none focus:ring focus:ring-primary"
          aria-label="Pesquisar"
          disabled={loading} // Desabilita o botão enquanto carrega
        >
          {loading ? (
            <Loader2 className="animate-spin" /> // Ícone de carregamento
          ) : (
            <SearchIcon />
          )}
        </Button>
      </form>
    </Form>
  )
}

export default Search
