import { AntdTable } from "@/components/common";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteDepartmentModal } from "./DeleteDepartmentModal";
import { useGetDepartments } from "./departmentApi";
import { EditDepartmentModal } from "./EditDepartmentModal";

export function DepartmentsTable() {

    const { departments, loading } = useGetDepartments();

    const columns: ColumnsType<Department> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (description: string) => description || "N/A"
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space
                    size={"middle"}
                >
                    <EditDepartmentModal
                        department={record}
                    />
                    <DeleteDepartmentModal
                        department={record}
                    />
                </Space>
            ),
            align: "center"
        }
    ]

    return (
        <>
            <AntdTable
                dataSource={departments as Department[]}
                columns={columns}
                loading={loading}
            />
        </>
    )
}
