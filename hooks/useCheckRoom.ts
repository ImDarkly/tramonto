import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/zustand/store";
import { useEffect, useState } from "react";
import { useFetchRoom } from "./useFetchRoom";

const supabase = createClient();

export default function useCheckRoom(roomCode: string) {
    const [roomDeleted, setRoomDeleted] = useState(false);
    const { code } = useBoundStore();
    const { fetchRoom } = useFetchRoom();

    useEffect(() => {
        const fetchAndSubscribe = async () => {
            const { data, error } = await fetchRoom(code);
            if (error) {
                console.error("Error fetching room:", error);
                return;
            }

            const channel = supabase
                .channel(`room-${roomCode}-deletion`)
                .on(
                    "postgres_changes",
                    {
                        event: "DELETE",
                        schema: "public",
                        table: "rooms",
                    },
                    (payload: any) => {
                        console.log("Room deletion detected:", payload);
                        if (payload.old && payload.old.id === data.id) {
                            console.log("Current room was deleted");
                            setRoomDeleted(true);
                        }
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        };

        fetchAndSubscribe();
    }, [roomCode, code]);

    return roomDeleted;
}
