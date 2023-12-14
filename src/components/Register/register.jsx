"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    try {
      let watchedMovies = [];
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        { username, password, watchedMovies, email }
      );

      if (response.status === 200) {
        console.log("Registration successful", response.data);
        router.push("/login");
      }
    } catch (error) {
      console.error("An error occurred during registration", error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center bg-blue-900 text-white p-10 rounded-lg shadow-md w-full max-w-md mx-auto ${
        error ? "border-2 border-red-500" : ""
      }`}
    >
      {loading && <div>Loading...</div>}
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleRegister}
      >
        <h2 className="mb-8">Register</h2>
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
        <div className="relative mb-6 w-full">
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="w-full py-2 bg-transparent border-none border-b-2 border-white text-white text-lg focus:outline-none focus:border-blue-600"
          />
          <label
            htmlFor="email"
            className={`absolute bottom-2 left-0 transition-all duration-300 ease-in-out pointer-events-none text-gray-400 ${
              emailFocus || email ? "opacity-0" : ""
            }`}
          >
            Email
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-5 border-none rounded-md cursor-pointer transition-colors duration-300 ease-in-out w-full text-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-center mt-5">
          An error occurred during registration!
        </p>
      )}
      <p className="mt-5">
        Already have an account?&nbsp;
        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
