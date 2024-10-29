import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/zustand/store";
import { RealtimeChannel } from "@supabase/supabase-js";

const supabase = createClient();

export function useRoomPlayers() {
    const { code, playerCount, setPlayerCount } = useBoundStore();

    useEffect(() => {
        if (!code) return;

        let channel: RealtimeChannel;

        const setupRealtimeSubscription = async () => {
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

            channel = supabase
                .channel(`room_${code}`)
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: "rooms",
                        filter: `room_code=eq.${code}`,
                    },
                    (payload: { new: { player_count: number } }) => {
                        if (payload.new && "player_count" in payload.new) {
                            setPlayerCount(payload.new.player_count as number);
                        }
                    }
                )
                .subscribe();
        };

        setupRealtimeSubscription();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
        };
    }, [code, setPlayerCount]);

    return playerCount;
}
