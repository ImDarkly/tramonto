import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useRoom(roomCode: string | null) {
    const supabase = createClient();
    const [roomData, setRoomData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRoomData() {
          if (!roomCode) {
            setIsLoading(false)
            return
          }
    
          const { data, error } = await supabase
            .from("rooms")
            .select("*")
            .eq("room_code", roomCode)
            .single()
    
          if (error) {
            toast.error("Error loading data.", {
              description: "Can't retrieve data. If you continue to experience issues, try again later.",
            })
          } else {
            setRoomData(data)
          }
    
          setIsLoading(false)
        }   
    
        fetchRoomData()
      }, [roomCode])
    
      return { roomData, isLoading }
    }