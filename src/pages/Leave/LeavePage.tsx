import { PageHeader } from "@/components/common";
import { LeaveStatus } from "@/constants/leave-status";
import { LeavesTable } from "@/features/Leave";
import { Select } from "antd";
import { useState } from "react";

export function LeavePage() {

    const [status, setStatus] = useState<LeaveStatus>(LeaveStatus.PENDING);

    return (
        <section
            className="space-y-6"
        >
            <PageHeader
                title="Leaves"
                description="Manage leaves"
            >
                <Select
                    options={Object.keys(LeaveStatus).map((status) => ({
                        label: status,
                        value: status
                    }))}
                    placeholder="Filter by status"
                    className="w-40"
                    value={status}
                    onChange={(value) => setStatus(value as LeaveStatus)}
                />
            </PageHeader>
            <LeavesTable
                status={status}
            />
        </section>
    )
}
