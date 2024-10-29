import { Badge } from "./ui/badge";
import { useRoomPlayers } from "@/hooks/useRoomPlayers";

const Ping = () => {
    return (
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
    );
};

export default function PlayerCount() {
    const playerCount = useRoomPlayers();

    return (
        <Badge variant="secondary" className="gap-2">
            Connected players: {playerCount}
            <Ping />
        </Badge>
    );
}
