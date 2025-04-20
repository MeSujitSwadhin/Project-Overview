import { redirect } from "@remix-run/node";

export async function requireUserSession(request: Request) {
    const cookies = request.headers.get("Cookie");
    if (!cookies || !cookies.includes("access_token")) {
        throw redirect("/signin");
    }

    const accessToken = cookies.split("access_token=")[1].split(";")[0];
    return accessToken;
}