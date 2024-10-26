import { createClient } from "@/utils/supabase/client";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import { useBoundStore } from "@/zustand/store";

const supabase = createClient();

export function useIsMaster() {
    const { getAuthenticatedUser } = useAuth();
    const { code } = useBoundStore();
    const [isMaster, setIsMaster] = useState(false);

    useEffect(() => {
        const checkIsMaster = async () => {
            if (!code) {
                setIsMaster(false);
                return;
            }

            const user = await getAuthenticatedUser();

            const { data, error } = await supabase
                .from("rooms")
                .select("master_id")
                .eq("room_code", code)
                .single();

            if (error || !data) {
                setIsMaster(false);
                return;
            }

            setIsMaster(data.master_id === user.id);
        };

        checkIsMaster();
    }, [code]);
    return isMaster;
}
