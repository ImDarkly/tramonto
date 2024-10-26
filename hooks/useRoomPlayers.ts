import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/zustand/store";

const supabase = createClient();

export function useRoomPlayers() {
    const { code, playerCount, setPlayerCount } = useBoundStore();

    useEffect(() => {
        if (!code) return;

        const fetchRoomPlayers = async () => {
            const { data, error } = await supabase
                .from("rooms")
                .select("player_count")
                .eq("room_code", code)
                .single();

            if (error) {
                console.error("Error fetching connected players:", error);
            } else if (data) {
                setPlayerCount(data.player_count);
            }
        };

        fetchRoomPlayers();
    }, [code, setPlayerCount]);

    return playerCount;
}
