"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useRouter();

    const handleSignup = async () => {
        try {
            const res = await axios.post("/api/auth/signup", {
                username,
                email,
                password,
            });
            localStorage.setItem("user-info", JSON.stringify(res.data.user));
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || "Signup failed.";
            console.error("Signup error:", errorMsg);
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col">
            {/* Background Image */}
            <img
                src="/assets/SignBI.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0 "
            />
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-0" /> */}

            {/* nav Bar */}
            <nav className="w-full p-4 flex justify-end z-10 relative">
                <div className="flex space-x-6">
                    <button
                        className="text-black font-bold mt-4 cursor-pointer"
                        onClick={() => navigate.push("")}
                    >
                        About
                    </button>
                    <div className="flex justify-center pt-4 gap-4">
                        <button
                            className="w-50 cursor-pointer bg-black hover:bg-cyan-700 text-white py-2 px-4 rounded font-medium transition"
                            onClick={handleSignup}
                        >
                            Sign up
                        </button>
                        <button
                            className="w-50 cursor-pointer bg-white hover:bg-gray-500 text-black border border-black py-2 px-4 rounded font-medium transition"
                            onClick={() => navigate.push("/login")}
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center lg:justify-start p-4 z-10 relative">
                <div className="w-full max-w-md lg:ml-60 bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/40">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                        <p className="text-gray-600 mt-2">Welcome</p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="text"
                            className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-black"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-black"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-black"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="flex justify-center pt-4 gap-4">
                            <button
                                className="w-50 cursor-pointer bg-black hover:bg-cyan-700 text-white py-2 px-4 rounded font-medium transition"
                                onClick={handleSignup}
                            >
                                Sign up
                            </button>
                            <button
                                className="w-50 bg-white hover:bg-gray-500 cursor-pointer text-black border border-black py-2 px-4 rounded font-medium transition"
                                onClick={() => navigate.push("/login")}
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;