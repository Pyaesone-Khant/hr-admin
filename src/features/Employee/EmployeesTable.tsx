import { AntdTable } from "@/components/common";
import { ColumnsType } from "antd/es/table";
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
        }
    ]

    return (
        <>
            <AntdTable
                columns={columns}
                dataSource={employees}
                loading={loading}
            />
        </>
    )
}
