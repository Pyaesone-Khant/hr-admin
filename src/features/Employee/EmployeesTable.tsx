import { AntdTable } from "@/components/common";
import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router";
import { useGetEmployees } from "./employeeApi";

export function EmployeesTable() {

    const { employees, loading } = useGetEmployees();

    const columns: ColumnsType<Employee> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
        },
        {
            title: 'Employment Status',
            dataIndex: 'employmentStatus',
            key: 'employmentStatus',
        },
        {
            title: 'Position',
            dataIndex: ['position', 'name'],
            key: 'position',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Link
                        to={`/employees/${record.id}`}
                    >
                        <Button
                            icon={<EyeOutlined />}
                        />
                    </Link>
                </>
            ),
            align: 'center'
        }
    ]

    return (
        <>
            <AntdTable
                columns={columns}
                dataSource={employees ?? []}
                loading={loading}
            />
        </>
    )
}
