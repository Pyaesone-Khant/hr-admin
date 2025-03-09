import { useDisclosure } from "@/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useDeleteDepartment } from "./departmentApi";

export function DeleteDepartmentModal({ department }: { department: Department }) {

    const [isOpen, { toggle }] = useDisclosure();

    const { deleteDepartment, loading } = useDeleteDepartment()

    const handleDelete = async () => {
        const result = await deleteDepartment(department.id);

        if (result) {
            toggle()
        }
    }

    return (
        <>
            <Button
                icon={<DeleteOutlined />}
                danger
                onClick={toggle}
            />
            <Modal
                title="Delete Department"
                open={isOpen}
                onCancel={toggle}
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
                    Are you sure you want to delete this department name
                    <span
                        className="font-semibold text-dark-indigo mx-1"
                    >
                        &apos;{department.name}&apos;
                    </span>
                    ?
                </p>
            </Modal>
        </>
    )
}
