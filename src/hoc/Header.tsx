import { useLocation } from "react-router";

export function Header() {
    const pathname = useLocation().pathname;
    const title = pathname?.split("/")[1] === "" ? "Dashboard" : pathname?.split("/")[1];
    return (
        <header className="p-6 border-l border-dark-indigo sticky top-0 z-10 bg-black/30 backdrop-blur-lg">
            <h2 className="uppercase text-lg font-semibold mix-blend-lighten text-white tracking-wider">
                {title}
            </h2>
        </header>
    )
}
