import { Header } from "@/components/Header"
import { Plus } from "lucide-react"
import { useState } from "react"
import { AddRecipe } from "@/components/AddRecipe"
import { useQuery } from "@tanstack/react-query"

const fetchRecipes = async () => {
  const response = await fetch("http://localhost:3001/api/recipes")
  const data = await response.json()
  return data
}
export function HomeWrapper() {
  // return <Home recipes={data} />
}
export function Home() {
  const { data, isPending, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  })

  const [showModal, setShowModal] = useState(false)
  if (isPending) return <div>Loading...</div>
  if (error) return <p>Erreur : {error.message}</p>
  return (
    <>
      <Header />
      {data &&
        data.recipes.map((recipe) => <div key={recipe._id}>{recipe.name}</div>)}
      <div
        className='fixed bottom-14 right-8 rounded-full p-4 bg-purple-600 text-white hover:bg-blue-500/10 hover:cursor-pointer hover:text-blue-500'
        onClick={() => setShowModal(true)}
      >
        <Plus className='font-bold w-10 h-10' />
      </div>

      {showModal && <AddRecipe />}
    </>
  )
}
