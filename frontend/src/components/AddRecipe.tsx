import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom de la recette doit contenir au moins 3 caractères.",
  }),
  description: z.string().min(10, {
    message: "Les ingrédients doivent contenir au moins 3 caractères.",
  }),
})

export function AddRecipe() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const response = await fetch("http://localhost:3000/api/recipe/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("recipe added", data)
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='fixed inset-0 bg-gray-900/50 bg-opacity-75 flex flex-col items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='nom de votre recette' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Entrez vos ingrédients' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Ajouter ma recette</Button>
        </form>
      </Form>
    </div>
  )
}
