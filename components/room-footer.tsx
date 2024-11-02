"use client";
import { useIsMaster } from "@/hooks/useIsMaster";
import DeleteRoom from "./delete-room";
import { Button } from "./ui/button";
import LeaveRoom from "./leave-room";

export default function RoomFooter() {
    const isMaster = useIsMaster();

    return (
        <footer className="w-full flex pt-4 justify-center mx-auto text-center text-xs min-h-20">
            {isMaster ? <DeleteRoom /> : <LeaveRoom />}
        </footer>
    );
}
