import { StateCreator } from "zustand";

export interface RoleInfo {
    id: string;
    name: string;
    description: string;
    color: string;
}

export interface AuthState {
    user: any | null;
    roleInfo: RoleInfo | null;
}

export interface AuthActions {
    setUser: (user: any) => void;
    clearUser: () => void;
    setRoleInfo: (roleInfo: RoleInfo | null) => void;
}

export const createAuthSlice: StateCreator<AuthState & AuthActions> = (
    set
) => ({
    user: null,
    roleInfo: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setRoleInfo: (roleInfo) => set({ roleInfo }),
});
