import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import axios from "axios";
import AuthForm from "~/components/AuthForm";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const user_name = formData.get("user_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone_number = formData.get("phone_number");

    try {
        await axios.post("http://localhost:5000/api/v1/signup", {
            user_name,
            email,
            password,
            phone_number,
        });

        return redirect("/signin");
    } catch (err: any) {
        const errorResponse = err.response?.data?.message || "Sign up failed";

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

export default function SignupPage() {
    const actionData = useActionData<typeof action>();

    return (
        <AuthForm
            heading="Create Account"
            fields={[
                { name: "user_name", type: "text", placeholder: "Full Name" },
                { name: "email", type: "email", placeholder: "Email Address" },
                { name: "password", type: "password", placeholder: "Password" },
                { name: "phone_number", type: "text", placeholder: "Mobile Number" },
            ]}
            submitButtonText="Sign up"
            error={actionData?.error}
            bottomText="Already have an account?"
            bottomLinkText="Sign in"
            bottomLinkHref="/signin"
            themeColor="green"
        />
    );
}
