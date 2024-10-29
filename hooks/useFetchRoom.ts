import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export function useFetchRoom() {
    const fetchRoom = async (code: string) => {
        const { data, error } = await supabase
            .from("rooms")
            .select("*")
            .eq("room_code", code)
            .limit(1)
            .single();

        if (error) {
            return { data: null, error };
        }

        return { data, error };
    };

    return { fetchRoom };
}
