import axios from "axios";
import { json, redirect } from "@remix-run/router";
import { ActionFunction } from "@remix-run/node";
import { accessTokenCookie } from "~/utils/cookies.server";
import { useActionData } from "@remix-run/react";
import AuthForm from "~/components/AuthForm";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const emailOrMobile = formData.get("emailOrMobile");
    const password = formData.get("password");

    try {
        const response = await axios.post("http://localhost:5000/api/v1/signin", {
            emailOrMobile,
            password,
        }, {
            headers: { "Content-Type": "application/json" }
        });

        const accessToken = response.data.access_token;

        return redirect("/profile", {
            headers: {
                "Set-Cookie": await accessTokenCookie.serialize(accessToken),
            },
        });
    } catch (err: any) {
        const errorResponse = err.response?.data?.message || "Something went wrong";

        // Return error messages from server
        return json(
            {
                error: {
                    general: errorResponse, // General error from the server
                },
            },
            { status: 400 }
        );
    }
};

export default function Signin() {
    const actionData = useActionData<typeof action>();

    return (
        <AuthForm
            heading="Welcome Back"
            fields={[
                { name: "emailOrMobile", type: "text", placeholder: "Email or Mobile" },
                { name: "password", type: "password", placeholder: "Password" },
            ]}
            submitButtonText="Sign in"
            error={actionData?.error}
            bottomText="Don't have an account?"
            bottomLinkText="Sign up"
            bottomLinkHref="/signup"
            themeColor="blue"
        />
    );
}