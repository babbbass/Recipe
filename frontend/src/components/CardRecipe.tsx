import { toast } from "react-toastify"
import { Card, CardContent } from "./ui/card"
import { FilePenLine, Trash, Star } from "lucide-react"

type CardRecipeProps = {
  recipe: any
  editRecipe: (recipe: any) => void
  refetch: () => void
}

async function deleteRecipe(id: string, refetch: () => void) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/recipes/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    if (response.ok) {
      toast.success("Votre recette a bien supprimée")
      refetch()
    }
  } catch (error) {
    toast.error("Une erreur est survenu désolé")
  }
}
export function CardRecipe({ recipe, editRecipe, refetch }: CardRecipeProps) {
  return (
    <Card
      key={recipe._id}
      className='w-[48%] md:w-[32%] flex flex-col cursor-pointer min-h-[200px] hover:border-purple-600 hover:shadow-xl hover:shadow-purple-500/20'
    >
      <CardContent className='flex flex-1 flex-col justify-center pb-2 px-0 italic'>
        <div className='flex items-center w-full pr-2 md:pr-4'>
          <h3 className='text-lg font-bold text-center w-full'>
            {recipe.name}
          </h3>
          <Star className='w-4 h-4  text-purple-600 font-bold cursor-pointer' />
        </div>
        <div className='h-1 border-b border-purple-600 mb-4' />
        <p className='text-sm px-2 md:px-5'>{recipe.description}</p>
        <div className='flex gap-2 h-full items-end justify-end mt-4 flex-1 mr-2 md:mr-4'>
          <FilePenLine
            onClick={() => editRecipe(recipe)}
            className='w-4 h-4 font-bold cursor-pointer text-purple-500 hover:text-purple-600 hover:scale-125 transition-all'
          />
          <Trash
            onClick={() => deleteRecipe(recipe._id, refetch)}
            className='w-4 h-4 text-red-500 font-bold cursor-pointer hover:text-red-600 hover:scale-125 transition-all'
          />
        </div>
      </CardContent>
    </Card>
  )
}
