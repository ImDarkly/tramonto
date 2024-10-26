"use client";
import { useIsMaster } from "@/hooks/useIsMaster";
import DeleteRoom from "./delete-room";
import { Button } from "./ui/button";

export default function RoomFooter() {
    const isMaster = useIsMaster();

    return (
        <footer className="w-full flex pt-2 justify-center mx-auto text-center text-xs h-20">
            {isMaster ? (
                <DeleteRoom />
            ) : (
                <Button variant="destructive" disabled>
                    Leave Room
                </Button>
            )}
        </footer>
    );
}
