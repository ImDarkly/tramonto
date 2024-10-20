import { createClient } from "@/utils/supabase/client";
import { useAuthStore } from "@/zustand/store";
import { toast } from "sonner";

export function useAuth() {
    const supabase = createClient();
    const { user, setUser } = useAuthStore();

    const fetchUser = async () => {
        if (user) return user;

        // Check Supabase session directly
        const {
            data: { user: fetchedUser },
            error,
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
            toast.error("Anonymous Sign-In Failed", {
                description:
                    "Unable to complete anonymous sign-in. Please try again later or contact support if the issue persists.",
            });
            return null;
        }

        setUser(newUser);
        return newUser;
    };

    return { user, fetchUser, signInAnonymously };
}
