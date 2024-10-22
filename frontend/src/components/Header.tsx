import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { SquareArrowRight } from "lucide-react"
import { useUserStore } from "@/stores/user.store"

export function Header() {
  const { user } = useUserStore()
  const userConnected = user ? user.user : localStorage.getItem("name")
  return (
    <header className='p-4 bg-purple-600 text-yellow-500 shadow w-full '>
      <nav className='flex justify-between items-center'>
        <Link to='/' className='font-bold text-lg md:text-2xl'>
          Mes recettes
        </Link>
        <div className='flex gap-2 items-center'>
          {userConnected ? (
            <>
              <Link to='/'>
                <Button className='rounded-3xl text-slate-50/90 hover:bg-slate-50/90 hover:text-slate-900 transition-all'>
                  Mes favoris
                </Button>
              </Link>
              <Link to='/profil'>
                <Button className='rounded-full text-lg bg-yellow-500/90 text-purple-600 hover:bg-slate-50/90 hover:text-slate-900 transition-all'>
                  {userConnected[0].toUpperCase()}
                </Button>
              </Link>
            </>
          ) : (
            <Link to='/connexion'>
              <Button className='rounded-3xl text-slate-50/90 hover:bg-slate-50/90 hover:text-slate-900 transition-all'>
                Connexion
                <SquareArrowRight size={20} />
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
