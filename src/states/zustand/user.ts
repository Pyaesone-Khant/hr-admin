import { getJwtToken } from "@/services/getJwtToken";
import { getUserData } from "@/services/getUserData";
import { create } from "zustand";

type UserState = {
    user: undefined | User;
    jwt: undefined | JWT;
    setUser: (user: User) => void;
    setJwt: (jwt: JWT) => void;
    clearJwt: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: getUserData().user,
    jwt: getJwtToken().jwt,
    setUser: (user) => set({ user }),
    setJwt: (jwt) => set({ jwt }),
    clearJwt: () => set({ jwt: undefined, user: undefined }),
}))