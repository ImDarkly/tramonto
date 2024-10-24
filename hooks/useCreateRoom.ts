import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./useAuth";
import { useNotificationHandler } from "./useNotificationHandler";
import { useRouter } from "next/navigation";

export function useCreateRoom() {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const { getAuthenticatedUser } = useAuth();
    const handleNotification = useNotificationHandler();
    const router = useRouter();

    const fetchRoom = async (id: string) => {
        const { data, error } = await supabase
            .from("rooms")
            .select("*")
            .eq("id", id)
            .limit(1)
            .single();
        return { data, error };
    };

    const createRoom = async () => {
        setIsLoading(true);

        try {
            // Fetch current authenticated user
            const user = await getAuthenticatedUser();

            /// Create room
            const { data: createRoomData, error: createRoomError } =
                await supabase.rpc("create_room", {
                    p_master_id: user.id,
                });
            if (createRoomError) throw createRoomError;

            console.log("Create room id: ", createRoomData);

            const { data: fetchRoomData, error: fetchRoomError } =
                await fetchRoom(createRoomData);

            handleNotification("ROOM_CREATED_SUCCESSFULLY", {
                code: fetchRoomData.room_code.toString().toUpperCase(),
            });

            router.push(`/room/${fetchRoomData.room_code}/master`);
        } finally {
            setIsLoading(false);
        }
    };

    return { createRoom, isLoading };
}
