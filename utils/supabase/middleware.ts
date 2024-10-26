import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

const getUserRoom = async (supabase: SupabaseClient, userId: string) => {
    const { data: participantData, error: participantError } = await supabase
        .from("room_participants")
        .select("room_id")
        .eq("user_id", userId)
        .single();

    if (!participantData) return null;

    const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("room_code, master_id")
        .eq("id", participantData.room_id)
        .single();

    return roomData;
};

const checkMasterAccess = async (
    supabase: SupabaseClient,
    roomCode: string,
    userId: string
) => {
    const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("master_id")
        .eq("room_code", roomCode)
        .single();

    return roomData?.master_id === userId;
};

export const updateSession = async (request: NextRequest) => {
    let response = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return null;
    }

    const urlParts = request.nextUrl.pathname.split("/");
    if (urlParts[1] === "room") {
        const roomCode = urlParts[2];
        const isMasterRoute = urlParts[3] === "master";

        const roomData = await getUserRoom(supabase, user.id);

        if (roomData) {
            const isMaster = roomData.master_id === user.id;

            if (isMaster && !isMasterRoute) {
                return NextResponse.redirect(
                    new URL(`/room/${roomCode}/master`, request.url)
                );
            }

            if (!isMaster && isMasterRoute) {
                return NextResponse.redirect(
                    new URL(`/room/${roomCode}`, request.url)
                );
            }
        }
    }

    return response;
};
