"use client";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CircleX, Ghost } from "lucide-react";
import { useRoom } from "@/hooks/useRoom";
import { Suspense } from "react";

export default function RoomHeader() {
    const { code } = useRoom();
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
