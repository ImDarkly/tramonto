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
                      request.cookies.set(name, value),
                  );
                  response = NextResponse.next({
                      request,
                  });
                  cookiesToSet.forEach(({ name, value, options }) =>
                      response.cookies.set(name, value, options),
                  );
              },
          },
      },
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  console.log("User:", user); // Inspect the user object

  // Check for protected route access
  if (request.nextUrl.pathname.startsWith("/protected") && userError) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Check if user is logged in and has a room code
  if (request.nextUrl.pathname === "/" && user && !userError) {
      const roomCode = user.user_metadata.room_code;
      return NextResponse.redirect(new URL(`/room/${roomCode}/master`, request.url));
  }

  return response;
};

