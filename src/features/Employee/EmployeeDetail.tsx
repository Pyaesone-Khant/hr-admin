import { UserAvatar } from "@/components/common";
import { formatNumber } from "@/lib/utils";
import { useParams } from "react-router";
import { useGetEmployee } from "./employeeApi";

export function EmployeeDetail() {

    const { id } = useParams<string>();

    const { employee } = useGetEmployee(id!);

    return (
        <section
            className="max-w-4xl mx-auto flex flex-col items-center gap-10"
        >
            <article
                className="text-center !space-y-4"
            >
                <UserAvatar
                    className=" !size-28 "
                />
                <h2
                    className="text-xl font-semibold"
                >
                    {employee?.name}
                </h2>
            </article>

            <div
                className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-4"
            >
                {
                    Object.entries(employee ?? {}).map(([key, value]) => {
                        if ((typeof value === 'string' || typeof value === 'number') && !(key === 'id' || key === 'name')) {
                            return (
                                <DataItem
                                    key={key}
                                    label={key}
                                    value={key === 'salary' ? formatNumber(value) + ' MMK' : value.toString()}
                                />
                            )
                        }
                    })
                }
                <DataItem
                    label="Department"
                    value={employee?.department?.name ?? 'N/A'}
                />
                <DataItem
                    label="Position"
                    value={employee?.position?.name ?? 'N/A'}
                />
            </div>

        </section>
    )
}

const DataItem = ({ label, value }: { label: string, value: string }) => {
    return (
        <article
            className="grid grid-cols-5 border-b"
        >
            <h3
                className="font-semibold text-white bg-dark-indigo capitalize p-4 col-span-2"
            >
                {
                    label
                }
            </h3>
            <p
                className="p-4 bg-dark-indigo/20 col-span-3"
            >
                {value}
            </p>
        </article>
    )
}