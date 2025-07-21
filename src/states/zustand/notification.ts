import { create } from "zustand";

type NotificationProps = {
    type: "success" | "error" | "info" | "warning";
    message: string;
}

type NotificationState = {
    notification: NotificationProps | null;
    setNotification: (notification: NotificationProps | null) => void;
    clearNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notification: null,
    setNotification: (notification) => set({ notification }),
    clearNotification: () => set({ notification: null }),
}))