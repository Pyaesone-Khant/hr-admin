import '@ant-design/v5-patch-for-react-19';

import { queryClient } from '@/constants';
import { MainLayout } from "@/hoc";
import { AddNewEmployeePage, DepartmentPage, EmployeePage } from "@/pages";
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from "antd";
import { createHashRouter, RouterProvider } from "react-router";

function App() {
	const router = createHashRouter([
		{
			path: "/",
			element: <MainLayout />,
			children: [
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
							path: "new",
							element: <AddNewEmployeePage />
						}
					]
				}
			]
		},
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
				<RouterProvider router={router} />
			</ConfigProvider>
		</QueryClientProvider>
	)
}

export default App;
