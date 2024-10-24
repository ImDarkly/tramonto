import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./useAuth";
import { useNotificationHandler } from "./useNotificationHandler";
import { useBoundStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

const supabase = createClient();

const fetchRoom = async (code: string) => {
    const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("room_code", code)
        .limit(1)
        .single();
    return { data, error };
};

export function useRemoveRoom() {
    const { getAuthenticatedUser } = useAuth();
    const handleNotification = useNotificationHandler();
    const { code } = useBoundStore();
    const router = useRouter();

    const removeRoom = async () => {
        // Fetch current authenticated user
        const user = await getAuthenticatedUser();

        const { data: roomData, error: roomFetchError } = await fetchRoom(code);
        if (roomFetchError || !roomData) {
            handleNotification("ROOM_NOT_FOUND");
            throw roomFetchError || new Error("Room not found");
        }

        if (roomData.master_id === user.id) {
            const { error } = await supabase
                .from("rooms")
                .delete()
                .eq("room_code", code);
        }

        handleNotification("ROOM_DELETED_SUCCESSFULLY");
        router.push(`/`);
    };

    return { removeRoom };
}
