import { StateCreator } from "zustand";

export interface RoomState {
    code: string;
    id: string;
    playerCount: number;
}

export interface RoomActions {
    setCode: (code: string) => void;
    setId: (id: string) => void;
    setPlayerCount: (count: number) => void;
}
export const createRoomSlice: StateCreator<RoomState & RoomActions> = (
    set
) => ({
    code: "",
    id: "",
    playerCount: 0,
    setCode: (code) => set({ code }),
    setId: (id) => set({ id }),
    setPlayerCount: (count) => set({ playerCount: count }),
});
