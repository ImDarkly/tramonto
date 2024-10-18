"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CreateRoom() {
    const supabase = createClient();
    const [isloading, setIsLoading] = useState(false);

    const handleCreateRoom = async () => {
        setIsLoading(true);

        // Check if the user is already logged in
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // If not logged in, attempt to log in anonymously
        if (!user) {
            const { data: loginData, error: loginError } =
                await supabase.auth.signInAnonymously();
            if (loginError) {
                toast.error("Unable to create room.", {
                    description:
                        "Anonymous login failed. If you continue to experience issues, try again later.",
                });
                setIsLoading(false);
                return;
            }
        }

        // Attempt to generate code.
        const { data: roomCodeData, error: roomCodeError } = await supabase.rpc(
            "generate_unique_room_code"
        );
        if (roomCodeError) {
            toast.error("Unable to create room.", {
                description:
                    "Room code generating failed. If you continue to experience issues, try again later.",
            });
            setIsLoading(false);
            return;
        }

        //Attempt to create room.
        const { data: roomData, error: roomError } = await supabase
            .from("rooms")
            .insert([{ room_code: roomCodeData, master_id: user?.id }]);
        if (roomError) {
            toast.error("Unable to create room.", {
                description:
                    "Room creating failed. If you continue to experience issues, try again later.",
            });
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
    };

    return (
        <Button
            variant="outline"
            disabled={isloading}
            onClick={handleCreateRoom}
        >
            {isloading ? (
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
