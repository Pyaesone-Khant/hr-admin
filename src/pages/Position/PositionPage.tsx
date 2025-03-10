import { PageHeader } from "@/components/common";
import { AddNewPositionModal, PositionsTable } from "@/features/Position";

export function PositionPage() {
    return (
        <section
            className="space-y-6"
        >
            <PageHeader
                title="Positions"
            >
                <AddNewPositionModal />
            </PageHeader>
            <PositionsTable />
        </section>
    )
}
