import { cn } from "@/lib/utils";
import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuItemType } from "antd/es/menu/interface";
import { Building2, ChevronRight, CircleDollarSign, FileUser, LayoutDashboard, LucideRockingChair, Settings, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

const iconSize = "!size-5";

const SidebarLinks: MenuItemType[] = [
    {
        key: "1",
        icon: <LayoutDashboard
            className={iconSize}
        />,
        label: "Dashboard",
    },
    {
        key: "2",
        icon: <Building2
            className={iconSize}
        />,
        label: "Departments",
    },
    {
        key: "3",
        icon: <Users
            className={iconSize}
        />,
        label: "Employees",
    },
    {
        key: "7",
        icon: <LucideRockingChair
            className={iconSize}
        />,
        label: "Positions",
    },
    {
        key: "4",
        icon: <FileUser
            className={iconSize}
        />,
        label: "Leaves",
    },
    {
        key: "5",
        icon: <CircleDollarSign
            className={iconSize}
        />,
        label: "Payroll",
    },
    {
        key: "6",
        icon: <Settings
            className={iconSize}
        />,
        label: "Settings",
    }
]

export function Sidebar() {

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const pathname = useLocation().pathname;
    const [activeKey, setActiveKey] = useState<string[]>(getActiveKey(pathname));

    useEffect(() => {
        setActiveKey(getActiveKey(pathname))
    }, [pathname])

    return (
        <Sider
            className="overflow-auto h-screen sticky inset-x-0 top-0 bottom-0 !bg-black/30"
            collapsed={collapsed}
            collapsible
            trigger={null}
        >
            <NavLink
                to={'/'}
                className={cn("flex justify-center items-center !h-[76px] space-x-2", {
                    "px-3": collapsed
                })}
            >
                <img
                    src={"/src/assets/react.svg"}
                    alt={"Logo"}
                    className="size-8"
                />
            </NavLink>
            <Menu
                mode="inline"
                rootClassName="p-0 !bg-transparent"
                className="text-white"
                items={SidebarLinks}
                selectedKeys={activeKey}
            />

            <Button
                type="primary"
                block
                className=" !rounded-none !h-12 mt-auto "
                onClick={() => setCollapsed(!collapsed)}
                icon={<ChevronRight
                    className={cn("transform !transition-all !duration-300", {
                        "rotate-180": collapsed
                    })}
                />}
            />
        </Sider>
    )
}

const getActiveKey = (pathname: string) => {

    if (pathname.includes('employees')) {
        return ["3"];
    }

    switch (pathname) {
        case "/":
            return ["1"];
        case "":
            return ["1"];
        case "/departments":
            return ["2"];
        case "/leaves":
            return ["4"];
        case "/payroll":
            return ["5"];
        case "/settings":
            return ["6"];
        case "/positions":
            return ["7"];
        default:
            return ["1"];
    }
}