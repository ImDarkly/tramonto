import { createClient } from "@/utils/supabase/client";
import { useNotificationHandler } from "./useNotificationHandler";
import { useBoundStore } from "@/zustand/store";

const supabase = createClient();

export function useAuth() {
    const { user, setUser } = useBoundStore();
    const handleNotifiction = useNotificationHandler();

    const fetchUser = async () => {
        if (user) return user;

        // Check Supabase session directly
        const {
            data: { user: fetchedUser },
        } = await supabase.auth.getUser();

        if (fetchedUser) {
            setUser(fetchedUser);
        }

        return fetchedUser;
    };

    const signInAnonymously = async () => {
        const {
            data: { user: newUser },
            error,
        } = await supabase.auth.signInAnonymously();
        if (error) {
            handleNotifiction("ANONYMOUS_SIGNIN_FAILED");
            return null;
        }

        setUser(newUser);
        return newUser;
    };

    const getAuthenticatedUser = async () => {
        let currentUser = await fetchUser();
        if (!currentUser) {
            currentUser = await signInAnonymously();
        }
        return currentUser;
    };

    return { user, fetchUser, signInAnonymously, getAuthenticatedUser };
}
