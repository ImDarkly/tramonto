import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./useAuth";
import { useNotificationHandler } from "./useNotificationHandler";
import { useRouter } from "next/navigation";

const supabase = createClient();

export function useCreateRoom() {
    const { getAuthenticatedUser } = useAuth();
    const handleNotification = useNotificationHandler();
    const router = useRouter();

    const createRoom = async () => {
        const user = await getAuthenticatedUser();

        const { data: createRoomData, error: createRoomError } =
            await supabase.rpc("create_room", {
                p_master_id: user.id,
            });

        console.log("create room data", createRoomData);

        if (createRoomError) throw createRoomError;

        handleNotification("ROOM_CREATED_SUCCESSFULLY", {
            code: createRoomData.toString().toUpperCase(),
        });

        router.push(`/room/${createRoomData}/master`);
    };
    return { createRoom };
}
