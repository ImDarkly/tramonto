"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateRoom } from "@/hooks/useCreateRoom";

export default function CreateRoom() {
    const { createRoom, isLoading } = useCreateRoom();

    return (
        <Button variant="outline" disabled={isLoading} onClick={createRoom}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {"Creating Room..."}
                </>
            ) : (
                "Create Room"
            )}
        </Button>
    );
}
