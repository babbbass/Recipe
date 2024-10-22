import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "./ui/card"

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Nom de l'utilisateur au moins 3 caractères.",
  }),
  email: z.string().email("email invalid.").min(4, {
    message: "Votre adresse email doit contenir au moins 4 caractères.",
  }),
  password: z.string().min(5, {
    message: "Votre mot de passe doit contenir au moins 5 caractères.",
  }),
})

export function SignUpForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        navigate("/connexion")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className='w-full h-1/3 sm:w-2/3 md:w-1/3 max-h-72'>
      <CardContent className='text-center p-2 py-4 flex flex-col justify-between h-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='nom utilisateur....' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='email' {...field} />
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
                    <Input placeholder='mot de passe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='md:w-1/3 bg-purple-600 hover:bg-purple-700/10 hover:text-purple-600 transition-all'
            >{`S'inscrire`}</Button>
          </form>
        </Form>
        <p className='text-sm mt-4'>
          Tu as déja un compte ?{" "}
          <Link
            to='/connexion'
            className='text-purple-600 font-medium hover:bg-purple-700/10 hover:p-2 rounded-xl'
          >
            Se connecter
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
