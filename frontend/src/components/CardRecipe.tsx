import { Card, CardContent } from "./ui/card"
import { FilePenLine, Trash } from "lucide-react"

type CardRecipeProps = {
  recipe: any
  editRecipe: (recipe: any) => void
  refetch: () => void
}

async function deleteRecipe(id: string, refetch: () => void) {
  console.log(id)
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
      console.log("Recipe deleted")
      refetch()
      const data = await response.json()
    }
  } catch (error) {
    console.log(error)
  }
}
export function CardRecipe({ recipe, editRecipe, refetch }: CardRecipeProps) {
  return (
    <Card key={recipe._id} className='flex flex-col pt-2 cursor-pointer'>
      <CardContent className='gap-2 justify-center pb-2'>
        <h3 className='text-lg font-bold'>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <div className='flex gap-2 justify-end mt-4'>
          <FilePenLine
            onClick={() => editRecipe(recipe)}
            className='w-4 h-4 font-bold cursor-pointer text-purple-600'
          />
          <Trash
            onClick={() => deleteRecipe(recipe._id, refetch)}
            className='w-4 h-4 text-red-500 font-bold cursor-pointer'
          />
        </div>
      </CardContent>
    </Card>
  )
}
