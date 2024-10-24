"use client";

import { useRemoveRoom } from "@/hooks/useRemoveRoom";
import { Button } from "./ui/button";

export default function RemoveRoom() {
    const { removeRoom } = useRemoveRoom();

    return (
        <Button variant="outline" onClick={removeRoom}>
            Remove Room
        </Button>
    );
}
