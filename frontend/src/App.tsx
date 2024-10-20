import { SignUp } from "./pages/Signup"
import { Home } from "./pages/Home"
import { SignIn } from "./pages/Signin"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/inscription' element={<SignUp />}></Route>
        <Route path='/connexion' element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
