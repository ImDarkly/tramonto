import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/zustand/store";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useFetchRoom } from "./useFetchRoom";

const supabase = createClient();

export function useFetchUserRole() {
    const { code } = useBoundStore();
    const [roleId, setRoleId] = useState("");
    const { getAuthenticatedUser } = useAuth();
    const { fetchRoom } = useFetchRoom();

    useEffect(() => {
        let channel: RealtimeChannel;

        const setupRealtimeSubscription = async () => {
            if (!code) {
                return;
            }
            const user = await getAuthenticatedUser();

            if (!user || !code) return console.log("User and code error");
            const { data: roomData, error: roomError } = await fetchRoom(code);

            const { data, error } = await supabase
                .from("room_participants")
                .select("role_id")
                .eq("room_id", roomData.id)
                .eq("user_id", user.id)
                .single();

            if (error) {
                console.error("Error fetching role:", error);
            } else if (data) {
                setRoleId(data.role_id);
            }

            channel = supabase
                .channel(`room_participant_${roomData.id}_${user.id}`)
                .on(
                    "postgres_changes",
                    {
                        event: "UPDATE",
                        schema: "public",
                        table: "room_participants",
                    },
                    (payload: { new: { role_id: string } }) => {
                        if (payload.new && "role_id" in payload.new) {
                            setRoleId(payload.new.role_id);
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
    }, [getAuthenticatedUser, setRoleId]);

    console.log("Updated role ID:", roleId);
    return roleId;
}
