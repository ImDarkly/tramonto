import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/zustand/store";
import { useFetchRoom } from "./useFetchRoom";
import { useAuth } from "./useAuth";
import useCheckParticipation from "./useCheckParticipation";

const supabase = createClient();

const removeParticipantFromRoom = async (roomId: string, userId: string) => {
    const { error } = await supabase
        .from("room_participants")
        .delete()
        .eq("room_id", roomId)
        .eq("user_id", userId);
    return { error };
};

export function useLeaveRoom() {
    const { getAuthenticatedUser } = useAuth();
    const { code, setCode } = useBoundStore();
    const { fetchRoom } = useFetchRoom();
    const checkParticipation = useCheckParticipation();

    const leaveRoom = async () => {
        const user = await getAuthenticatedUser();

        const { data: roomData, error: roomError } = await fetchRoom(code);

        const { data: existingParticipants, error: participantCheckError } =
            await checkParticipation(roomData.id, user.id);

        const { error: removeParticipantError } =
            await removeParticipantFromRoom(roomData.id, user.id);

        setCode("");
    };

    return leaveRoom;
}
