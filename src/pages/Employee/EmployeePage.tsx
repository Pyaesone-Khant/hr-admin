import { PageHeader } from "@/components/common";
import { EmployeesTable } from "@/features/Employee";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router";

export function EmployeePage() {
    return (
        <section
            className="space-y-6"
        >
            <PageHeader
                title="Employees"
            >
                <Link
                    to={'new'}
                >
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                    >
                        New Employee
                    </Button>
                </Link>
            </PageHeader>

            <EmployeesTable />
        </section>
    )
}
