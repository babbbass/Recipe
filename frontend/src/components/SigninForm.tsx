import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/stores/user.store"
import { Card, CardContent } from "./ui/card"

const formSchema = z.object({
  email: z.string().email("email invalid.").min(4, {
    message: "Votre adresse email doit contenir au moins 4 caractères.",
  }),
  password: z.string().min(5, {
    message: "Votre mot de passe doit contenir au moins 5 caractères.",
  }),
})

export function SignInForm() {
  const { setUser } = useUserStore()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        localStorage.setItem("token", data.token)
        localStorage.setItem("name", data.user.user)
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className='w-full h-1/3 sm:w-2/3 md:w-1/3 max-h-72'>
      <CardContent className='text-center p-2 py-4 flex flex-col justify-between h-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='border-purple-300 hover:border-purple-600'
                      placeholder='email...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='border-purple-300 hover:border-purple-600'
                      type='password'
                      placeholder='mot de passe'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='bg-purple-600 hover:bg-purple-700/10 hover:text-purple-600 transition-all'
            >
              Se connecter
            </Button>
          </form>
        </Form>
        <p className='text-sm mt-4'>
          Tu n'as pas encore de compte?{" "}
          <Link
            to='/inscription'
            className='text-purple-600 font-medium hover:bg-purple-700/10 hover:p-2 rounded-xl'
          >
            S'enregistrer
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
