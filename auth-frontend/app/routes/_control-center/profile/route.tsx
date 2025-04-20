import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ActionFunction, json, redirect } from '@remix-run/router';
import { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData, useNavigate, useNavigation } from '@remix-run/react';
import { accessTokenCookie } from '~/utils/cookies.server';

// 1. Loader runs on server
export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = await accessTokenCookie.parse(cookieHeader);

    if (!cookie) {
        // Redirect to signin if no token
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Now make server-to-server call
    const response = await axios.get('http://localhost:5000/api/v1/user', {
        headers: {
            Authorization: `Bearer ${cookie}`,
        },
    });

    const user = response.data.admin;

    return json({ user });
};

export const action: ActionFunction = async () => {
    // Clear the cookie on server side
    return redirect('/signin', {
        headers: {
            "Set-Cookie": await accessTokenCookie.serialize("", { maxAge: 0 }),
        },
    });
};

export default function Profile() {
    const { user } = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-6">
                <div className="text-white text-xl animate-pulse">Loading your profile...</div>
            </div>
        );
    }

    const profileFields = [
        { label: "Name", value: user.user_name },
        { label: "Email", value: user.email },
        { label: "Phone", value: user.phone_number },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div
                className="backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl rounded-3xl max-w-md w-full p-8"
            >
                <h2 className="text-3xl font-extrabold text-black text-center mb-8">
                    Your Profile
                </h2>
                <div className="space-y-6 text-black text-center">
                    {profileFields.map((field) => (
                        <div key={field.label}>
                            <p className="text-sm font-semibold uppercase text-white/60">{field.label}</p>
                            <p className="text-xl font-bold">{field.value}</p>
                        </div>
                    ))}

                    <Form method="post">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"
                        >
                            Sign Out
                        </motion.button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
