import { StateCreator } from "zustand";

export interface RoomState {
    code: string;
    playerCount: number;
}

export interface RoomActions {
    setCode: (code: string) => void;
    setPlayerCount: (count: number) => void;
}
export const createRoomSlice: StateCreator<RoomState & RoomActions> = (
    set
) => ({
    code: "",
    playerCount: 0,
    setCode: (code) => set({ code }),
    setPlayerCount: (count) => set({ playerCount: count }),
});
