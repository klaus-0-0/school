"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      console.log("res", res)
      localStorage.setItem("user-info", JSON.stringify(res.data.user));
        router.push("/dashboard"); 
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <img
        src="/assets/LoginBI.png"
        alt="Background"
        className="absolute w-full h-full object-cover opacity-100"
      />

      {/* Top Navigation Bar */}
      <nav className="w-full bg-white p-4 flex justify-end relative z-10">
        <div className="flex space-x-6">
          <button className="text-black font-bold mt-4 cursor-pointer" onClick={() => router.push("/")}>
            About
          </button>
          <div className="flex justify-center pt-4 gap-4">
            <button
              className="w-50 bg-pink-500 cursor-pointer hover:bg-pink-600 text-white py-2 px-4 rounded font-medium transition"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </button>
            <button
              className="w-50 bg-white cursor-pointer hover:bg-gray-500 text-pink-500 border border-black py-2 px-4 rounded font-medium transition"
              onClick={() => router.push("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center lg:justify-start p-4 relative z-10">
        <div className="w-full max-w-md lg:ml-60 bg-white bg-opacity-90 p-6 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Login</h2>
            <p className="text-pink-600 mt-2">Welcome back</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-black"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex justify-center pt-4 gap-4">
              <button
                className="w-60 cursor-pointer bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded font-medium transition"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                className="text-pink-500 hover:text-cyan-800 font-medium cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;