import { useDisclosure } from "@/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useDeletePosition } from "./positionApi";

export function DeletePositionModal({ position }: { position: Position }) {

    const [isOpen, { toggle }] = useDisclosure();

    const { deletePosition, loading } = useDeletePosition()

    const handleDelete = () => {
        deletePosition(position.id, {
            onSuccess: () => {
                toggle()
            }
        })
    }

    return (
        <>
            <Button
                icon={<DeleteOutlined />}
                danger
                onClick={toggle}
            />
            <Modal
                title="Delete Position"
                open={isOpen}
                onCancel={toggle}
                okText="Delete"
                okButtonProps={{
                    danger: true,
                    loading: loading,
                    onClick: handleDelete,
                }}
                cancelButtonProps={{
                    disabled: loading
                }}
                width={440}
                maskClosable={!loading}
                centered
            >
                <p>
                    Are you sure you want to delete this position name
                    <span
                        className="font-semibold text-dark-indigo mx-1"
                    >
                        &apos;{position.name}&apos;
                    </span>
                    ?
                </p>
            </Modal>
        </>
    )
}
