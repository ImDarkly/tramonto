import { NotificationKey, getNotificationMessage } from "@/utils/notifications";
import { useCallback } from "react";
import { toast } from "sonner";

export function useNotificationHandler() {
    return useCallback(
        (key: NotificationKey, params?: Record<string, string>) => {
            const { title, description, severity } = getNotificationMessage(
                key,
                params
            );

            toast[severity](title, {
                description: description,
            });
        },
        []
    );
}
