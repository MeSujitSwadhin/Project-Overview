import { LoaderFunctionArgs, redirect } from "@remix-run/router";
import Signin from "~/routes/_auth/signin/route";

export async function loader({ request }: LoaderFunctionArgs) {
    const cookies = request.headers.get("Cookie");
    if (cookies && cookies.includes("access_token")) {
        throw redirect('/profile');
    }
    return null;
}


export default function Index() {

    return (
        <>
            <Signin />
        </>
    )
}