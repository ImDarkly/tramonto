import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./useAuth";
import { useNotificationHandler } from "./useNotificationHandler";
import { useBoundStore } from "@/zustand/store";

export function useCreateRoom() {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { getAuthenticatedUser } = useAuth();
    const handleNotification = useNotificationHandler();
    const { id, code } = useBoundStore();

    const createRoom = async () => {
        setIsLoading(true);

        try {
            // Fetch current authenticated user
            const user = await getAuthenticatedUser();

            /// Create room
            const { data, error: roomError } = await supabase.rpc(
                "create_room",
                {
                    p_master_id: user.id,
                }
            );
            if (roomError) throw roomError;

            handleNotification("ROOM_CREATED_SUCCESSFULLY", {
                code: code.toString(),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { createRoom, isLoading };
}
