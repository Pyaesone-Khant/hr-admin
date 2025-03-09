import { PageHeader } from "@/components/common";
import { AddNewDepartmentModal, DepartmentsTable } from "@/features/Department";

export function DepartmentPage() {

    return (
        <section
            className="space-y-6"
        >
            <PageHeader
                title="Departments"
                description="List of all departments"
            >
                <AddNewDepartmentModal />
            </PageHeader>

            <DepartmentsTable />
        </section>
    )
}
