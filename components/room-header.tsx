"use client";
import { ThemeSwitcher } from "./theme-switcher";
import { useParams } from "next/navigation";
import { useJoinRoom } from "@/hooks/useJoinRoom";
import { useEffect, useRef } from "react";
import { useBoundStore } from "@/zustand/store";
import { Badge } from "./ui/badge";
import { useIsMaster } from "@/hooks/useIsMaster";
import PlayerCount from "./player-count";
import CopyRoomCode from "./copy-room-code";

export default function RoomHeader() {
    const { joinRoom } = useJoinRoom();
    const params = useParams<{ code: string }>();
    const processedCodeRef = useRef<string | null>(null);
    const isMaster = useIsMaster();
    const { code } = useBoundStore();

    useEffect(() => {
        if (
            params.code &&
            params.code !== code &&
            params.code !== processedCodeRef.current
        ) {
            processedCodeRef.current = params.code;
            joinRoom(params.code);
        }
    }, [params.code, code, joinRoom]);

    return (
        <nav className="flex h-20 w-full items-center justify-between px-4 border-b">
            <div className="gap-2 flex items-center">
                <CopyRoomCode />
                {isMaster && <Badge>Master</Badge>}
            </div>
            <PlayerCount />
            <ThemeSwitcher />
        </nav>
    );
}
