"use client";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CircleX, Ghost } from "lucide-react";
import { useJoinRoom } from "@/hooks/useJoinRoom";
import { Suspense, useEffect, useRef } from "react";
import { useBoundStore } from "@/zustand/store";

export default function RoomHeader() {
    const { code } = useBoundStore();
    const { joinRoom } = useJoinRoom();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useParams<{ code: string }>();
    const processedCodeRef = useRef<string | null>(null);

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

    const handleCopyCode = () => {
        const currentUrl = `${window.location.origin}${pathname.replace("/master", "")}${searchParams ? `${searchParams.toString()}` : ""}`;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast.success("Room URL copied to clipboard!");
        });
    };

    return (
        <nav className="flex h-20 w-full items-center justify-between px-4 border-b">
            <Button
                variant="ghost"
                className="uppercase"
                onClick={handleCopyCode}
            >
                #{code}
            </Button>
            <ThemeSwitcher />
        </nav>
    );
}
