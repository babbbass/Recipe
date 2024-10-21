import { Header } from "@/components/Header"
import { Plus } from "lucide-react"
import { useState } from "react"
import { EditRecipe } from "@/components/EditRecipe"
import { Recipes } from "@/components/Recipes"

export function Home() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Header />
      <Recipes />

      <div
        className='fixed bottom-14 right-8 rounded-full p-4 bg-purple-600 text-white hover:bg-blue-500/10 hover:cursor-pointer hover:text-blue-500'
        onClick={() => setShowModal(true)}
      >
        <Plus className='font-bold w-10 h-10' />
      </div>

      {showModal && <EditRecipe displayModal={setShowModal} />}
    </>
  )
}
