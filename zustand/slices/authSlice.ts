import { StateCreator } from "zustand";

export interface AuthState {
    user: any | null;
}

export interface AuthActions {
    setUser: (user: any) => void;
    clearUser: () => void;
}

export const createAuthSlice: StateCreator<AuthState & AuthActions> = (
    set
) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
});
