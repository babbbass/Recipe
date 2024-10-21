import { EditRecipe } from "./EditRecipe"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CardRecipe } from "./CardRecipe"

export const fetchRecipes = async () => {
  const response = await fetch("http://localhost:3000/api/recipes")
  const data = await response.json()
  return data
}

type RecipeProps = {
  name: string
  description: string
  _id: string
}
export function Recipes() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  })

  const [showModalRecipe, setShowModalRecipe] = useState(false)
  const [myRecipe, setMyRecipe] = useState<RecipeProps | null>(null)
  function editRecipe(recipe: RecipeProps) {
    setShowModalRecipe(true)
    setMyRecipe(recipe)
  }
  if (isPending) return <div>Loading...</div>
  if (error) return <p>Erreur : {error.message}</p>
  return (
    <>
      {data && (
        <div className='flex gap-4 p-4'>
          {data.recipes.map((recipe: RecipeProps) => (
            <CardRecipe
              key={recipe._id}
              recipe={recipe}
              editRecipe={editRecipe}
            />
          ))}
          {showModalRecipe && (
            <EditRecipe
              recipe={myRecipe}
              refetch={refetch}
              displayModal={setShowModalRecipe}
            />
          )}
        </div>
      )}
    </>
  )
}
