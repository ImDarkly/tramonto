import { createClient } from "@/utils/supabase/client";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./useAuth";

export function useRoom(roomCode: string | null) {
    const supabase = useMemo(() => createClient(), []);
    const [roomData, setRoomData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { fetchUser, signInAnonymously } = useAuth();
    const initializationRef = useRef(false);

    useEffect(() => {
        async function fetchRoomData() {
            if (!roomCode || initializationRef.current) return;
            initializationRef.current = true;

            if (!roomCode) {
                setIsLoading(false);
                return;
            }

            // Fetch current authenticated user
            let currentUser = await fetchUser();

            // If no user, sign in anonymously
            if (!currentUser) {
                currentUser = await signInAnonymously();
            }

            const { data: room, error: roomError } = await supabase
                .from("rooms")
                .select("*")
                .eq("room_code", roomCode)
                .single();

            // Check if the user is already a participant in the room
            const { data: existingParticipants, error: participantCheckError } =
                await supabase
                    .from("room_participants")
                    .select("*")
                    .eq("room_id", room.id)
                    .eq("user_id", currentUser?.id);

            if (participantCheckError) {
                toast.error("Error Checking Participation", {
                    description:
                        "We encountered an issue while checking your participation status. Please try again later.",
                });
                console.log(participantCheckError.message);
                setIsLoading(false);
                return;
            }

            // Check if any existing participants were found
            if (existingParticipants.length === 0) {
                // No existing participant, insert them into the room_participants table
                const { error: participantError } = await supabase
                    .from("room_participants")
                    .insert([{ room_id: room.id, user_id: currentUser?.id }]);

                if (participantError) {
                    toast.error("Failed to Join Room", {
                        description:
                            "We encountered an issue while trying to join the room. Please check your network connection or try again later.",
                    });
                    console.log(participantError.message);
                } else {
                    toast.success("Successfully joined the room!", {
                        description: "Welcome to the room!",
                    });
                }
            } else {
                toast.info("You are already a participant in this room.", {
                    description: "Feel free to continue participating!",
                });
            }

            if (roomError) {
                toast.error("Room Not Found", {
                    description:
                        "We couldn't retrieve the room information. Please make sure the room code is correct and try again.",
                });
            } else {
                setRoomData(room);
            }

            setIsLoading(false);
        }

        fetchRoomData();
    }, [roomCode]);

    return { roomData, isLoading };
}
