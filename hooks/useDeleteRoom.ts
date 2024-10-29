import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./useAuth";
import { useNotificationHandler } from "./useNotificationHandler";
import { useBoundStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useFetchRoom } from "./useFetchRoom";

const supabase = createClient();

export function useDeleteRoom() {
    const { getAuthenticatedUser } = useAuth();
    const handleNotification = useNotificationHandler();
    const { code } = useBoundStore();
    const router = useRouter();
    const { fetchRoom } = useFetchRoom();

    const deleteRoom = async () => {
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

    return { deleteRoom };
}
