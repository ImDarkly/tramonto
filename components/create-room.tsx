"use client";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useCreateRoom } from "@/hooks/useCreateRoom";

export default function CreateRoom() {
    const { createRoom } = useCreateRoom();

    return (
        <Button variant="outline" onClick={createRoom}>
            Create Room
        </Button>
    );
}
