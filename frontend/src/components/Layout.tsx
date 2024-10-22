import { ReactNode } from "react"
import { Header } from "./Header"

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex max-w-7xl mx-auto flex-1 flex-col min-h-screen overflow-hidden'>
      <Header />
      <main>{children}</main>
    </div>
  )
}
