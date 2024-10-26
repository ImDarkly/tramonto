import { useNotificationHandler } from "@/hooks/useNotificationHandler";
import { Button } from "./ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { useBoundStore } from "@/zustand/store";

export default function CopyRoomCode() {
    const { code } = useBoundStore();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const handleNotification = useNotificationHandler();

    const handleCopyCode = () => {
        const currentUrl = `${window.location.origin}${pathname.replace("/master", "")}${searchParams ? `${searchParams.toString()}` : ""}`;
        navigator.clipboard.writeText(currentUrl).then(() => {
            handleNotification("URL_COPIED_SUCCESSFULLY");
        });
    };

    return (
        <Button variant="ghost" className="gap-2" onClick={handleCopyCode}>
            #{code.toUpperCase()}
        </Button>
    );
}
