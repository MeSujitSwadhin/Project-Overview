import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Signin() {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = {
            emailOrMobile: formData.get("emailOrMobile"),
            password: formData.get("password"),
        };
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/signup`, data,
                {
                    headers: { "Content-Type": "application/json" },
                });
            toast.success('Login successful! 🎉');
            navigate('/profile');
        } catch (err: any) {
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        };
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-sm space-y-6"
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800">Welcome Back</h2>

                <div className="space-y-4">
                    <input
                        name="emailOrMobile"
                        type="text"
                        placeholder="Email or Mobile"
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent placeholder-gray-400 text-gray-700"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent placeholder-gray-400 text-gray-700"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all disabled:opacity-50"
                >
                    Signin
                </button>

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500 font-medium hover:underline">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}
