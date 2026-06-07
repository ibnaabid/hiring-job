import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";
// import { auth } from "@/lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (session.user.role !== "admin") {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard/:path*"],
};