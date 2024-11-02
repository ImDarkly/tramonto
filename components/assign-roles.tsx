"use client";
import { useRoomPlayers } from "@/hooks/useRoomPlayers";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/zustand/store";
import { useFetchRoom } from "@/hooks/useFetchRoom";

const supabase = createClient();

export default function AssignRoles() {
    const connectedPlayers = useRoomPlayers();
    const { code } = useBoundStore();
    const { fetchRoom } = useFetchRoom();

    const assignRoles = async () => {
        const { data: roomData } = await fetchRoom(code);

        const {} = await supabase.rpc("assign_roles", {
            p_room_id: roomData.id,
        });
    };

    const canAssignRoles = connectedPlayers >= 6;

    return (
        <div className="flex flex-col gap-4 items-center">
            <Button onClick={assignRoles} disabled={!canAssignRoles}>
                Assign Roles
            </Button>
            {!canAssignRoles && (
                <p className="text-sm text-muted-foreground">
                    At least 6 players are required to assign roles.
                </p>
            )}
        </div>
    );
}
