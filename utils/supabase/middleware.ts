import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

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

    console.log("User:", user); // Inspect the user object

    // Check for protected route access
    if (request.nextUrl.pathname.startsWith("/protected") && userError) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Check if user is logged in and has a room code
    if (request.nextUrl.pathname === "/" && user && !userError) {
        // First, get the room_id from room_participants table
        const { data: participantData, error: participantError } =
            await supabase
                .from("room_participants")
                .select("room_id")
                .eq("user_id", user.id)
                .single();

        if (participantError) {
            console.error("Error fetching room participant:", participantError);
            return response;
        }

        if (participantData) {
            // Now, get the room_code from rooms table using the room_id
            const { data: roomData, error: roomError } = await supabase
                .from("rooms")
                .select("room_code")
                .eq("id", participantData.room_id)
                .single();

            if (roomError) {
                console.error("Error fetching room:", roomError);
                return response;
            }

            if (roomData) {
                const roomCode = roomData.room_code;
                return NextResponse.redirect(
                    new URL(`/room/${roomCode}/master`, request.url)
                );
            }
        }
    }

    return response;
};
