import { Outlet } from "@remix-run/react"
import { redirect } from "@remix-run/router";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";


export async function loader({ request }: LoaderFunctionArgs) {
    const cookies = request.headers.get("Cookie");
    if (cookies && cookies.includes("access_token")) {
        throw redirect('/profile');
    }
    return null;
}

const Layout = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout