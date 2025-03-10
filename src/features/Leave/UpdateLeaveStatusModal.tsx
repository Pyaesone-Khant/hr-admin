import { LeaveStatus } from "@/constants/leave-status"
import { useDisclosure } from "@/hooks"
import { Button, Modal, Space } from "antd"
import { useState } from "react"
import { useUpdateLeaveStatus } from "./leaveApi"

export function UpdateLeaveStatusModal({
    leave
}: {
    leave: Leave
}) {

    const [isOpen, { toggle }] = useDisclosure();
    const { updateLeaveStatus, loading } = useUpdateLeaveStatus()
    const [leaveStatus, setLeaveStatus] = useState<LeaveStatus>(LeaveStatus.APPROVED)

    const handleLeaveStatusUpdate = () => {
        updateLeaveStatus({
            id: leave.id,
            status: leaveStatus
        }, {
            onSuccess: () => {
                toggle();
            }
        })
    };

    const getContext = (status: LeaveStatus) => {
        return status === LeaveStatus.APPROVED ? 'Approve' : 'Reject'
    }

    return (
        <>
            <Space
                size={'middle'}
            >
                {
                    Object.values(LeaveStatus).map((status) => {
                        if (status === LeaveStatus.APPROVED || status === LeaveStatus.REJECTED) {
                            return (
                                <Button
                                    key={status}
                                    onClick={() => {
                                        setLeaveStatus(status)
                                        toggle()
                                    }}
                                    type='primary'
                                    danger={status === LeaveStatus.REJECTED}
                                    className="!capitalize"
                                    size="small"
                                >
                                    {getContext(status)}
                                </Button>
                            )
                        }
                    })
                }
            </Space>
            <Modal
                title={`${getContext(leaveStatus)} leave?`}
                open={isOpen}
                okText={'Confirm'}
                okButtonProps={{
                    loading: loading,
                    onClick: handleLeaveStatusUpdate,
                    danger: leaveStatus === LeaveStatus.REJECTED
                }}
                onCancel={toggle}
                maskClosable={!loading}
                centered
                width={440}
            >
                <p
                    className="pt-4"
                >
                    Are you sure you want to
                    <strong
                        className="lowercase mx-1"
                    >
                        {getContext(leaveStatus)}
                    </strong>
                    this leave?
                </p>
            </Modal>
        </>
    )
}
