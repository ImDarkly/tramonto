"use client";
import { Button } from "./ui/button";
import { useCreateRoom } from "@/hooks/useCreateRoom";

export default function CreateRoom() {
    const { createRoom } = useCreateRoom();

    return (
        <Button variant="outline" className="w-full" onClick={createRoom}>
            Create Room
        </Button>
    );
}
