import { Card, CardContent } from "./ui/card"
import { FilePenLine, Trash } from "lucide-react"

type CardRecipeProps = {
  recipe: any
  editRecipe: any
}
export function CardRecipe({ recipe, editRecipe }: CardRecipeProps) {
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
          <Trash className='w-4 h-4 text-red-500 font-bold cursor-pointer' />
        </div>
      </CardContent>
    </Card>
  )
}
