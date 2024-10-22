import { toast } from "react-toastify"
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
import { X } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom de la recette doit contenir au moins 3 caractères.",
  }),
  description: z.string().min(10, {
    message: "Les ingrédients doivent contenir au moins 10 caractères.",
  }),
})

type EditRecipeProps = {
  displayModal: (v: boolean) => void
  recipe?: {
    name: string
    description: string
    _id: string
  } | null
  refetch: () => void
}

export function EditRecipe({ recipe, displayModal, refetch }: EditRecipeProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: recipe ? recipe?.name : "",
      description: recipe ? recipe?.description : "",
    },
  })

  async function createRecipe(recipe: any) {
    try {
      const response = await fetch("http://localhost:3000/api/recipes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(recipe),
      })

      if (response.ok) {
        toast.success("Votre recette a bien été ajoutée")
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function updateRecipe(recipe: any) {
    try {
      const response = await fetch("http://localhost:3000/api/recipes/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(recipe),
      })
      if (response.ok) {
        const data = await response.json()
        toast.success("Votre recette modifiée avec succes")
        refetch()
        return data.recipeUpdated
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    displayModal(false)
    if (recipe) {
      const updatedRecipe = { id: recipe?._id, ...values }
      updateRecipe(updatedRecipe)
    } else {
      createRecipe(values)
    }
  }

  return (
    <div className='fixed inset-0 z-50 bg-gray-900/50 bg-opacity-75 flex flex-col items-center justify-center'>
      <div
        className='fixed bottom-14 right-8 rounded-full p-4 bg-purple-600 text-white hover:bg-blue-500/10 hover:cursor-pointer hover:text-blue-500'
        onClick={() => displayModal(false)}
      >
        <X className='font-bold w-10 h-10' />
      </div>
      <h1 className='text-3xl font-bold mb-8'>
        {recipe ? "Modifier la recette" : "Ajouter une nouvelle recette"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={recipe ? recipe?.name : "nom de la recette"}
                    {...field}
                    value={field.value}
                  />
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
                  <Input
                    placeholder={
                      recipe ? recipe?.description : "Entrez vos ingrédients"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>{recipe ? "Modifier" : "Ajouter"}</Button>
        </form>
      </Form>
    </div>
  )
}
