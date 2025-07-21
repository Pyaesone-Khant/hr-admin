import { AntdTable } from "@/components/common"
import { Space } from "antd"
import { ColumnsType } from "antd/es/table"
import { DeletePositionModal } from "./DeletePositionModal"
import { EditPositionModal } from "./EditPositionModal"
import { useGetPositions } from "./positionApi"

export function PositionsTable() {

    const { positions, loading } = useGetPositions()

    const columns: ColumnsType<Position> = [
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
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <EditPositionModal
                        position={record}
                    />
                    <DeletePositionModal
                        position={record}
                    />
                </Space>
            ),
            align: 'center'
        }
    ]

    return (
        <>
            <AntdTable
                dataSource={positions ?? []}
                loading={loading}
                columns={columns}
            />
        </>
    )
}
