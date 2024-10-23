import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { SquareArrowRight } from "lucide-react"
import { useUserStore } from "@/stores/user.store"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { set } from "react-hook-form"

export function Header() {
  const { user, setUser } = useUserStore()
  const userConnected = user ? user.user : localStorage.getItem("name")
  return (
    <header className='p-4 bg-purple-600 text-amber-400 shadow w-full italic'>
      <nav className='flex justify-between items-center'>
        <Link to='/' className='font-bold text-lg md:text-2xl'>
          Mes Notes
        </Link>
        <div className='flex gap-2 items-center'>
          {userConnected ? (
            <Select>
              <SelectTrigger className='rounded-full border-0 text-lg bg-amber-400/90 text-purple-600 hover:bg-slate-50/90 hover:text-slate-900 transition-all'>
                <SelectValue placeholder={userConnected[0].toUpperCase()} />
              </SelectTrigger>
              <SelectContent className='font-medium'>
                <SelectItem
                  value='favoris'
                  className='hover:bg-purple-600/60 hover:text-amber-400 hover:scale-105 transition-all'
                >
                  <Link to='/'>Mes favoris</Link>
                </SelectItem>
                <SelectItem
                  value='profil'
                  className='hover:bg-purple-600/60 hover:text-amber-400 hover:scale-105 transition-all'
                >
                  <Link to='/connexion'>Mon profil</Link>
                </SelectItem>
                <SelectItem
                  value='deconnexion'
                  className='hover:bg-purple-600/60 hover:text-amber-400 hover:scale-105 transition-all'
                >
                  <Link
                    to='/'
                    onClick={() => {
                      localStorage.clear()
                      setUser(null)
                    }}
                  >
                    Deconnexion
                  </Link>
                </SelectItem>
              </SelectContent>
            </Select>
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
