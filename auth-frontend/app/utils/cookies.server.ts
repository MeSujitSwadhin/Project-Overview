// app/cookies.server.ts
import { createCookie } from "@remix-run/node";

export const accessTokenCookie = createCookie("access_token", {
    maxAge: 60 * 60, // 1 hour
    httpOnly: false,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
});
