"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/store";
import Link from "next/link";
import endpoint from "@/constants/endpoint";

const Login = () => {
  const { setUserId, username, setUsername, setWatchedMovies } =
    useGlobalContext();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await axios.post(`${endpoint}/api/v1/users/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful", response.data);
        setUserId(response.data.id);
        setUsername(response.data.username);
        sessionStorage.setItem("userId", response.data.id);
        sessionStorage.setItem("username", response.data.username);
        sessionStorage.setItem("watchedMovies", response.data.watchedMovies);
        router.push("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Incorrect username or password");
        setError(true);
      } else {
        console.error("An error occurred during login", error);
      }
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center bg-blue-900 text-white p-10 rounded-lg shadow-md w-full max-w-md mx-auto ${
        error ? "border-2 border-red-500" : ""
      }`}
    >
      {loading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleLogin}
      >
        <h2 className="mb-8">Welcome Back!</h2>
        <div className="relative mb-6 w-full">
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
            className="w-full py-2 bg-transparent border-none border-b-2 border-white text-white text-lg focus:outline-none focus:border-blue-600"
          />
          <label
            htmlFor="username"
            className={`absolute bottom-2 left-0 transition-all duration-300 ease-in-out pointer-events-none text-gray-400 ${
              usernameFocus || username ? "opacity-0" : ""
            }`}
          >
            Username
          </label>
        </div>
        <div className="relative mb-6 w-full">
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            className="w-full py-2 bg-transparent border-none border-b-2 border-white text-white text-lg focus:outline-none focus:border-blue-600"
          />
          <label
            htmlFor="password"
            className={`absolute bottom-2 left-0 transition-all duration-300 ease-in-out pointer-events-none text-gray-400 ${
              passwordFocus || password ? "opacity-0" : ""
            }`}
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-5 border-none rounded-md cursor-pointer transition-colors duration-300 ease-in-out w-full text-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-center mt-5">
          Incorrect username or password!
        </p>
      )}
      <p className="mt-5">
        Don't have an account?&nbsp;
        <Link href="/register" className="text-blue-500 hover:text-blue-700">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
