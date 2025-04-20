import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import axios from "axios";

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
    } catch (error: any) {
        return json({ error: error.response?.data?.message || "Signup failed" }, { status: 400 });
    }
};

export default function SignupPage() {
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-white to-green-100">
            <Form method="post" className="bg-white/70 p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-6">
                <h2 className="text-3xl font-bold text-center text-green-700">Create Account</h2>

                {actionData?.error && (
                    <div className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md">
                        {actionData.error}
                    </div>
                )}

                <input
                    name="user_name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none"
                    required
                />
                <input
                    name="phone_number"
                    type="text"
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-full"
                >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
            </Form>
        </div>
    );
}
