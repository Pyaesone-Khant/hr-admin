import { MainLayout } from "@/hoc";
import { ConfigProvider } from "antd";
import { createHashRouter, RouterProvider } from "react-router";

function App() {
	const router = createHashRouter([
		{
			path: "/",
			element: <MainLayout />,
		},
	]);

	return <ConfigProvider
		theme={{
			token: {
				colorPrimary: "#08213f"
			}
		}}
	>
		<RouterProvider router={router} />
	</ConfigProvider>;
}

export default App;
