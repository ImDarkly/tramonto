import { StateCreator } from "zustand";

export interface RoomState {
    code: string;
}

export interface RoomActions {
    setCode: (code: string) => void;
}
export const createRoomSlice: StateCreator<RoomState & RoomActions> = (
    set
) => ({
    code: "",
    setCode: (code) => set({ code }),
});
