
export function PageHeader({
    title,
    description,
    children
}: {
    title: string,
    description?: string,
    children?: React.ReactNode
}) {
    return (
        <section
            className="flex items-start justify-between gap-4"
        >
            <article
                className="space-y-2"
            >
                <h2
                    className="text-xl font-semibold"
                >{title}</h2>
                {description && (
                    <p
                        className="text-sm text-gray-400"
                    >
                        {description}
                    </p>
                )}
            </article>
            <div
                className="flex items-center gap-4"
            >
                {children}
            </div>
        </section>
    )
}
