"use client";

import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/store";
import axios from "axios";
import endpoint from "@/constants/endpoint";

const Account = () => {
  console.log("endpoint", endpoint);
  const { userId, setUserId, username, setUsername } = useGlobalContext();
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [oldPasswordFocus, setOldPasswordFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${endpoint}/api/v1/users/${userId}`,
        {
          username: newUsername,
          email: newEmail,
          password: newPassword,
          oldPassword: oldPassword,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.status === 200) {
        setErrorMessage("");
        sessionStorage.setItem("username", newUsername);
        setUsername(newUsername);
        setNewPassword("");
        setNewEmail(newEmail);
        setOldPassword("");
      }
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.status === 401) {
          setErrorMessage("Invalid password");
        } else if (error.response.status === 404) {
          setErrorMessage("User not found");
        }
      }
    }
  };

  const fetchUser = async () => {
    if (userId) {
      const response = await axios.get(`${endpoint}/api/v1/users/${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      setNewUsername(response.data.username);
      setNewEmail(response.data.email);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <div className="flex flex-col items-center bg-blue-900 text-white p-10 rounded-lg shadow-md w-full max-w-md mx-auto">
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-8">Account</h2>

        <div className="relative mb-6 w-full">
          <input
            type="text"
            value={newUsername}
            onChange={handleUsernameChange}
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
            className="w-full py-2 bg-transparent border-none border-b-2 border-white text-white text-lg focus:outline-none focus:border-blue-600"
          />
          <label
            className={`absolute bottom-2 left-0 transition-all duration-300 ease-in-out pointer-events-none text-gray-400 ${
              usernameFocus || newUsername ? "opacity-0" : ""
            }`}
          >
            New Username
          </label>
        </div>
        <div className="relative mb-6 w-full">
          <input
            type="email"
            value={newEmail}
            onChange={handleEmailChange}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="w-full py-2 bg-transparent border-none border-b-2 border-white text-white text-lg focus:outline-none focus:border-blue-600"
          />
          <label
            className={`absolute bottom-2 left-0 transition-all duration-300 ease-in-out pointer-events-none text-gray-400 ${
              emailFocus || newEmail ? "opacity-0" : ""
            }`}
          >
            Email
          </label>
        </div>
        <div className="relative mb-6 w-full">
          <input
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            onFocus={() => setOldPasswordFocus(true)}
            onBlur={() => setOldPasswordFocus(false)}
            className="w-full py-2 bg-transparent border-none border-b-2 border-white text-white text-lg focus:outline-none focus:border-blue-600"
          />
          <label
            className={`absolute bottom-2 left-0 transition-all duration-300 ease-in-out pointer-events-none text-gray-400 ${
              oldPasswordFocus || oldPassword ? "opacity-0" : ""
            }`}
          >
            Old Password
          </label>
        </div>
        <div className="relative mb-6 w-full">
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            className="w-full py-2 bg-transparent border-none border-b-2 border-white text-white text-lg focus:outline-none focus:border-blue-600"
          />
          <label
            className={`absolute bottom-2 left-0 transition-all duration-300 ease-in-out pointer-events-none text-gray-400 ${
              passwordFocus || newPassword ? "opacity-0" : ""
            }`}
          >
            New Password
          </label>
        </div>

        <input
          type="submit"
          value="Submit"
          className="bg-blue-600 text-white py-3 px-5 border-none rounded-md cursor-pointer transition-colors duration-300 ease-in-out w-full text-lg hover:bg-blue-700"
        />
        {errorMessage && (
          <p className="text-red-500 text-center mt-5">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Account;
