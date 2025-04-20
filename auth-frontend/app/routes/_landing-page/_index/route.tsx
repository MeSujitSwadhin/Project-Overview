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
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-100">
                <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl text-center">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Welcome to Our Platform</h1>
                    <p className="text-gray-600 mb-8">
                        Manage your journey effortlessly. Sign in to continue exploring awesome features!
                    </p>
                    <a href="/signin">
                        <button
                            type="button"
                            className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-bold py-3 rounded-full transition duration-300 text-lg"
                        >
                            Sign In
                        </button>
                    </a>
                </div>
            </div>
        </>
    )
}