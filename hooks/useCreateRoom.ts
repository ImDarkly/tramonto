import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./useAuth";
import { useNotificationHandler } from "./useNotificationHandler";
import { useRouter } from "next/navigation";

const supabase = createClient();

const fetchRoom = async (id: string) => {
    const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", id)
        .limit(1)
        .single();
    return { data, error };
};

export function useCreateRoom() {
    const { getAuthenticatedUser } = useAuth();
    const handleNotification = useNotificationHandler();
    const router = useRouter();

    const createRoom = async () => {
        // Fetch current authenticated user
        const user = await getAuthenticatedUser();

        /// Create room
        const { data: createRoomData, error: createRoomError } =
            await supabase.rpc("create_room", {
                p_master_id: user.id,
            });
        if (createRoomError) throw createRoomError;

        const { data: fetchRoomData, error: fetchRoomError } =
            await fetchRoom(createRoomData);

        handleNotification("ROOM_CREATED_SUCCESSFULLY", {
            code: fetchRoomData.room_code.toString().toUpperCase(),
        });

        router.push(`/room/${fetchRoomData.room_code}/master`);
    };
    return { createRoom };
}
