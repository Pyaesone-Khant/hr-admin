import { useUserStore } from "@/states/zustand/user";
import { Navigate } from "react-router";
import { LoginForm } from "./Login/LoginForm";

export function Login() {

    const jwt = useUserStore(state => state.jwt);

    if (jwt && jwt.accessToken) return <Navigate to={"/"} replace />

    return (
        <section
            className=" !bg-gradient-to-r !from-dark-indigo !to-gray-cyan min-h-screen flex items-center"
        >
            <div
                className="mx-auto max-w-lg w-full p-4 shadow rounded-xs bg-white/[0.02] text-white"
            >
                <h2
                    className="text-3xl font-semibold mb-6"
                >
                    Login
                </h2>

                <LoginForm />
            </div>
        </section>
    )
}
