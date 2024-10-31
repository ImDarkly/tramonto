import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/zustand/store";
import { useAuth } from "./useAuth";
import { useFetchUserRole } from "./useFetchUserRole";

const supabase = createClient();

export function useRoleInfo() {
    const { code, roleInfo, setRoleInfo } = useBoundStore();
    const roleId = useFetchUserRole();

    useEffect(() => {
        async function fetchRoleInfo() {
            if (!roleId) return;
            const { data, error } = await supabase
                .from("roles")
                .select("*")
                .eq("id", roleId)
                .single();

            if (error) {
                console.error("Error fetching role info:", error);
            } else if (data) {
                setRoleInfo(data);
            }
        }

        fetchRoleInfo();
    }, [roleId]);

    return roleInfo;
}
