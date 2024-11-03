import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/zustand/store";
import { useFetchRoom } from "./useFetchRoom";
import { useNotificationHandler } from "./useNotificationHandler";

const supabase = createClient();

export default function useCheckRoom(roomCode: string) {
    const { code } = useBoundStore();
    const { fetchRoom } = useFetchRoom();
    const handleNotification = useNotificationHandler();
    const [roomDeleted, setRoomDeleted] = useState(false);

    useEffect(() => {
        const fetchAndSubscribe = async () => {
            const { data: roomData, error: roomError } = await fetchRoom(code);
            if (roomError) {
                handleNotification("ROOM_NOT_FOUND", {
                    code: code.toUpperCase(),
                });
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
                    (payload: { old: { id: string } }) => {
                        if (payload.old && payload.old.id === roomData.id) {
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
