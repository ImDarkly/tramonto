"use client";
import { useLeaveRoom } from "@/hooks/useLeaveRoom";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LeaveRoom() {
    const leaveRoom = useLeaveRoom();
    const router = useRouter();

    const handleLeaveRoom = async () => {
        await leaveRoom();
        router.push("/");
    };

    return (
        <Button onClick={handleLeaveRoom} variant="destructive">
            Leave Room
        </Button>
    );
}
