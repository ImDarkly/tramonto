"use client";
import { useRoomPlayers } from "@/hooks/useRoomPlayers";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/zustand/store";
import { useFetchRoom } from "@/hooks/useFetchRoom";

const supabase = createClient();

export default function () {
    const connectedPlayers = useRoomPlayers();
    const { code } = useBoundStore();
    const { fetchRoom } = useFetchRoom();

    const assignRoles = async () => {
        const { data: roomData, error: roomError } = await fetchRoom(code);

        const { data, error } = await supabase.rpc("assign_roles", {
            p_room_id: roomData.id,
        });
    };

    return (
        <div>
            <Button onClick={assignRoles}>Assign Roles</Button>
        </div>
    );
}
