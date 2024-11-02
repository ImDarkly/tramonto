import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function useCheckParticipation() {
    const checkParticipation = async (roomId: string, userId: string) => {
        const { data, error } = await supabase
            .from("room_participants")
            .select("*")
            .eq("room_id", roomId)
            .eq("user_id", userId);
        return { data, error };
    };

    return checkParticipation;
}
