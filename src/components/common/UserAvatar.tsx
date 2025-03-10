import { cn } from "@/lib/utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export function UserAvatar({
    src,
    className,
    ...props
}: {
    src?: string;
    className?: string;
}) {

    const avatarSize = className?.split(" ").find(c => c.startsWith("size-") || c.startsWith("!size-"))?.split("-")[1] ?? "10";
    const iconSize = Math.ceil(Math.floor(parseInt(avatarSize) * 4) / 2.5) + 'px';
    return (
        <Avatar
            src={src}
            alt="User Avatar"
            className={cn(" size-10 min-w-max aspect-square object-cover bg-dark-indigo text-neutral ", className)}
            {...props}
            icon={<UserOutlined
                style={{ fontSize: iconSize }}
            />}
        />
    )
}
