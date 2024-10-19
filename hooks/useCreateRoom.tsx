import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function useCreateRoom() {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const createRoom = async () => {
        setIsLoading(true);

        try {
            // Check if the user is already logged in
            let {
                data: { user },
            } = await supabase.auth.getUser();

            // If not logged in, attempt to log in anonymously
            if (!user) {
                const { data: loginData, error: loginError } =
                    await supabase.auth.signInAnonymously();
                if (loginError) throw loginError;

                // After login, retrieve the user again
                user = loginData.user;
            }

            // Generate room code
            const { data: roomCode, error: roomCodeError } = await supabase.rpc(
                "generate_unique_room_code"
            );
            if (roomCodeError) throw roomCodeError;

            // Create room
            const { error: roomError } = await supabase
                .from("rooms")
                .insert([{ room_code: roomCode, master_id: user?.id }]);
            if (roomError) throw roomError;

            toast.success("Room created successfully!", {
                description: `Your room code is ${roomCode}`,
            });

            router.push(`/room/${roomCode}/master`);
        } catch (error) {
            toast.error("Unable to create room.", {
                description:
                    "If you continue to experience issues, try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { createRoom, isLoading };
}
