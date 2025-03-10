import { AntdTable } from "@/components/common";
import { LeaveStatus } from "@/constants/leave-status";
import { ColumnsType } from "antd/es/table";
import { useGetLeaves } from "./leaveApi";
import { UpdateLeaveStatusModal } from "./UpdateLeaveStatusModal";

export function LeavesTable({ status }: {
    status: LeaveStatus
}) {

    const { leaves, loading } = useGetLeaves(status);

    const columns: ColumnsType<Leave> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Employee",
            dataIndex: ["employee", "name"],
            key: "employee",
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => record.status === LeaveStatus.PENDING ? (
                <UpdateLeaveStatusModal
                    leave={record}
                />
            ) : '-'
            ,
            align: "center"
        }
    ]

    return (
        <>
            <AntdTable
                columns={columns}
                dataSource={leaves}
                loading={loading}
            />
        </>
    )
}
