import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { SquareArrowRight } from "lucide-react"

export function Header() {
  return (
    <header className='p-4 bg-blue-500 shadow w-full '>
      <nav className='flex justify-between items-center'>
        <Link to='/' className='font-bold text-2xl'>
          Mes recettes
        </Link>
        <div className='flex gap-2 items-center'>
          <Link to='/'>Mes favoris</Link>
          <Link to='/connexion'>
            <Button className='rounded-3xl text-slate-50/90 hover:bg-slate-50/90 hover:text-slate-900 transition-all'>
              Connexion
              <SquareArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
