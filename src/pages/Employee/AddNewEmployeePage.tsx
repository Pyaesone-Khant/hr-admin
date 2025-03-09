import { AddNewEmployeeForm } from "@/features/Employee";

export function AddNewEmployeePage() {
    return (
        <section
            className="space-y-6 max-w-2xl mx-auto"
        >
            <h2 className="text-2xl font-semibold">Add New Employee</h2>
            <AddNewEmployeeForm />
        </section>
    )
}
