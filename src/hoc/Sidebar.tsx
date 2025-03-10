import { cn } from "@/lib/utils";
import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuItemType } from "antd/es/menu/interface";
import { Building2, ChevronLeft, CircleDollarSign, FileUser, LayoutDashboard, LogOut, LucideRockingChair, Settings, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

const iconSize = "!size-5";

const SidebarLinks: MenuItemType[] = [
    {
        key: "1",
        icon: <LayoutDashboard
            className={iconSize}
        />,
        label: <Link to={'/'} >Dashboard</Link>,
    },
    {
        key: "2",
        icon: <Building2
            className={iconSize}
        />,
        label: <Link to={'/departments'}>Departments</Link>,
    },
    {
        key: "3",
        icon: <Users
            className={iconSize}
        />,
        label: <Link to={'/employees'}>Employees</Link>,
    },
    {
        key: "7",
        icon: <LucideRockingChair
            className={iconSize}
        />,
        label: <Link to={'/positions'}>Positions</Link>,
    },
    {
        key: "4",
        icon: <FileUser
            className={iconSize}
        />,
        label: <Link to={'/leaves'}>Leaves</Link>,
    },
    {
        key: "5",
        icon: <CircleDollarSign
            className={iconSize}
        />,
        label: <Link to={'/payroll'}>Payroll</Link>,
    },
    {
        key: "6",
        icon: <Settings
            className={iconSize}
        />,
        label: <Link to={'/settings'}>Settings</Link>,
    },
    {
        key: '20',
        icon: <LogOut
            className={iconSize}
        />,
        label: "Logout",
        danger: true,
    }
]

export function Sidebar() {

    const [collapsed, setCollapsed] = useState<boolean>(true);
    const pathname = useLocation().pathname;
    const [activeKey, setActiveKey] = useState<string[]>(getActiveKey(pathname));

    useEffect(() => {
        setActiveKey(getActiveKey(pathname))
    }, [pathname])

    return (
        <Sider
            className=" !sticky !top-0 h-[100vh] !bg-black/30 overflow-auto "
            collapsed={collapsed}
            collapsible
            trigger={null}
        >
            <NavLink
                to={'/'}
                className={cn("flex justify-center items-center !min-h-[76px] space-x-2", {
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
                icon={<ChevronLeft
                    className={cn("transform !transition-all !duration-300", {
                        "-rotate-180": collapsed
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