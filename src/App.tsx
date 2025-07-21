import '@ant-design/v5-patch-for-react-19';

import { queryClient } from '@/constants';
import { MainLayout } from "@/hoc";
import { AddNewEmployeePage, Dashboard, DepartmentPage, EmployeePage, LeavePage, PositionPage } from "@/pages";
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, notification } from "antd";
import { useEffect } from 'react';
import { createHashRouter, RouterProvider } from "react-router";
import { Login } from './features/Auth';
import { EmployeeDetail } from './features/Employee';
import { useNotificationStore } from './states/zustand/notification';

function App() {

    const [api, contextHolder] = notification.useNotification();
    const noti = useNotificationStore(state => state.notification);

    useEffect(() => {
        if (noti && noti.message && noti.type) {
            api[noti.type]({
                message: noti.type.charAt(0).toUpperCase() + noti.type.slice(1),
                description: noti.message,
                showProgress: true,
                placement: "top",
                duration: 3,
                closable: false,
            })
            useNotificationStore.getState().clearNotification();
        }
    }, [noti, api])

    const router = createHashRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: '/departments',
                    element: <DepartmentPage />
                },
                {
                    path: "/employees",
                    children: [
                        {
                            index: true,
                            element: <EmployeePage />
                        },
                        {
                            path: ":id",
                            element: <EmployeeDetail />
                        },
                        {
                            path: "new",
                            element: <AddNewEmployeePage />
                        }
                    ]
                },
                {
                    path: '/positions',
                    element: <PositionPage />
                },
                {
                    path: '/leaves',
                    element: <LeavePage />
                }
            ]
        },
        {
            path: "/login",
            Component: Login
        }
    ]);

    return (
        <QueryClientProvider
            client={queryClient}
        >
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#08213f",
                        controlHeight: 40,
                        fontFamily: "Raleway, sans-serif",
                    }
                }}
            >
                {contextHolder}
                <RouterProvider router={router} />
            </ConfigProvider>
        </QueryClientProvider>
    )
}

export default App;
