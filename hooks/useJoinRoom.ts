import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./useAuth";
import { useNotificationHandler } from "./useNotificationHandler";
import { useBoundStore } from "@/zustand/store";
import { useParams, useRouter } from "next/navigation";

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

const checkExistingParticipant = async (roomId: string, userId: string) => {
    const { data, error } = await supabase
        .from("room_participants")
        .select("*")
        .eq("room_id", roomId)
        .eq("user_id", userId);
    return { data, error };
};

const addParticipantToRoom = async (roomId: string, userId: string) => {
    const { error } = await supabase
        .from("room_participants")
        .insert([{ room_id: roomId, user_id: userId }]);
    return { error };
};

export function useJoinRoom() {
    const { code, setCode } = useBoundStore();
    const { getAuthenticatedUser } = useAuth();
    const handleNotification = useNotificationHandler();
    const router = useRouter();

    const joinRoom = async (roomCode: string) => {
        const user = await getAuthenticatedUser();

        const { data: roomData, error: roomError } = await fetchRoom(roomCode);
        if (roomError || !roomData) {
            handleNotification("ROOM_NOT_FOUND", {
                code: roomCode.toUpperCase(),
            });
            router.push(`/`);
            return;
        }

        const { data: existingParticipants, error: participantCheckError } =
            await checkExistingParticipant(roomData.id, user.id);
        if (participantCheckError) {
            handleNotification("PARTICIPATION_CHECK");
            return;
        }

        if (existingParticipants.length === 0) {
            const { error: participantError } = await addParticipantToRoom(
                roomData.id,
                user.id
            );

            if (participantError) {
                handleNotification("FAILED_TO_JOIN_ROOM");
            }
        }

        if (code !== roomData.room_code) {
            setCode(roomData.room_code);
        }
    };

    return { joinRoom };
}
