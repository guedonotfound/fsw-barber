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
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  })

  const router = useRouter()

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      router.push(`/barbershops?title=${data.title}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Busque barbearias..."
                    {...field}
                    className="bg-secondary focus:ring-primary w-full pr-12 focus:ring-3 focus:outline-hidden"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    className="focus:ring-primary absolute inset-y-0 right-0 flex items-center rounded-none px-3 py-2 focus:ring-3 focus:outline-hidden"
                    aria-label="Pesquisar"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <SearchIcon />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default Search
