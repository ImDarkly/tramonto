"use client";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CircleX, Ghost } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useRoom } from "@/hooks/useRoom";
import { Badge } from "./ui/badge";

export default function RoomHeader() {
    const { room_code } = useParams();
    const { roomData, isLoading } = useRoom(room_code as string);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleCopyCode = () => {
        const currentUrl = `${window.location.origin}${pathname.replace("/master", "")}${searchParams ? `${searchParams.toString()}` : ""}`;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast.success("Room URL copied to clipboard!");
        });
    };

    return (
        <nav className="flex h-20 w-full items-center justify-between px-4 border-b">
            {isLoading ? (
                <>
                    <Skeleton className="w-24 h-10" />
                    <Skeleton className="w-10 h-9" />
                </>
            ) : (
                <>
                    {roomData ? (
                        <Button
                            variant="ghost"
                            className="uppercase"
                            onClick={handleCopyCode}
                        >
                            #{room_code}
                        </Button>
                    ) : (
                        <Button variant="ghost" disabled>
                            <CircleX className="mr-2 h-4 w-4" />
                            Room Not Found
                        </Button>
                    )}
                    <ThemeSwitcher />
                </>
            )}
            <Badge
                variant="secondary"
                className="absolute gap-2 left-2/4 top-24 transform -translate-x-1/2"
            >
                Players: 1
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            </Badge>
        </nav>
    );
}
