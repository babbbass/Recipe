import { SignUp } from "./pages/Signup"
import { Home } from "./pages/Home"
import { SignIn } from "./pages/Signin"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Layout } from "./components/Layout"

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/inscription' element={<SignUp />}></Route>
            <Route path='/connexion' element={<SignIn />}></Route>
          </Routes>
          <ToastContainer />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
