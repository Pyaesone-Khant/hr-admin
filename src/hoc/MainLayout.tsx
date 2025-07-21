// styles
import "../styles/global.css";

// components
import { Header } from "@/hoc/Header";
import { Sidebar } from "@/hoc/Sidebar";
import { useUserStore } from "@/states/zustand/user";
import { Layout } from "antd";
import { Navigate, Outlet } from "react-router";

export function MainLayout() {

    const jwt = useUserStore(state => state.jwt);

    if (!jwt || !jwt.accessToken) return <Navigate to={"/login"} replace />

    return (
        <>
            <Layout
                hasSider
                className="flex flex-row w-full min-h-screen !bg-gradient-to-r !from-dark-indigo !to-gray-cyan"
            >
                <Sidebar />
                <section
                    className="w-full flex flex-col"
                >
                    <Header />
                    <div
                        className="p-8 flex-1 text-neutral"
                    >
                        <Outlet />
                    </div>
                </section>
            </Layout>
        </>
    )

}
