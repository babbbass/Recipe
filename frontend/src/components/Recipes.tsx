import { EditRecipe } from "./EditRecipe"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CardRecipe } from "./CardRecipe"
import { Plus } from "lucide-react"

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
  const [showModal, setShowModal] = useState(false)
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
        <div className='flex gap-2 px-2 py-4 flex-wrap justify-center'>
          {data.recipes.map((recipe: RecipeProps) => (
            <CardRecipe
              key={recipe._id}
              recipe={recipe}
              editRecipe={editRecipe}
              refetch={refetch}
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
      <div
        className='fixed bottom-14 right-8 rounded-full p-4 bg-purple-600 text-white hover:bg-blue-500/10 hover:cursor-pointer hover:text-blue-500'
        onClick={() => setShowModal(true)}
      >
        <Plus className='font-bold w-10 h-10' />
      </div>

      {showModal && (
        <EditRecipe displayModal={setShowModal} refetch={refetch} />
      )}
    </>
  )
}
