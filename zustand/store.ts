import { create } from "zustand";
import { AuthActions, AuthState, createAuthSlice } from "./slices/authSlice";
import { createRoomSlice, RoomActions, RoomState } from "./slices/roomSlice";

type Store = RoomState & RoomActions & AuthState & AuthActions;

export const useBoundStore = create<Store>()((set, get, store) => ({
    ...createRoomSlice(set, get, store),
    ...createAuthSlice(set, get, store),
}));
