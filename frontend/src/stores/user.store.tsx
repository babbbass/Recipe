import { create } from "zustand"

type UserProps = {
  user: {
    id: string
    user: string
    email: string
  } | null
  setUser: (
    user: {
      id: string
      user: string
      email: string
    } | null
  ) => void
}

export const useUserStore = create<UserProps>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
