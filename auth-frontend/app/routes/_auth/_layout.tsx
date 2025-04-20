import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/router";


export async function loader({ request }: LoaderFunctionArgs) {
    const cookies = request.headers.get("Cookie");
    if (cookies && cookies.includes("access_token")) {
        throw redirect('/profile');
    }
    return null;
}


export default function Layout() {
    return (
        <Outlet />
    );
}