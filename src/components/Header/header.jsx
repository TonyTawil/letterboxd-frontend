"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/store";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";

const Header = () => {
  const { userId, setUserId, username, setUsername } = useGlobalContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountPage = () => {
    router.push("/account");
    handleClose();
  };

  const handleSignout = () => {
    setUserId("");
    setUsername("");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    handleClose();
    router.push("/");
  };

  useEffect(() => {
    if (!username && !userId) {
      const username = sessionStorage.getItem("username");
      const userId = sessionStorage.getItem("userId");
      if (username && userId) {
        setUsername(username);
        setUserId(userId);
      }
    }
  }, []);

  return (
    <nav className="bg-gray-800 p-2 mt-0 w-full">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
          <Link
            href="/"
            className="text-white no-underline hover:text-gray-300 hover:no-underline transform hover:scale-110 transition-transform duration-200"
          >
            <span className="text-2xl pl-2">Movie</span>
          </Link>
        </div>
        <div className="flex w-full md:w-1/2 justify-center md:justify-end">
          {userId && username ? (
            <div className="flex items-center">
              <AccountCircleIcon
                sx={{ color: "gold" }}
                className="mr-2"
                onClick={handleClick}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleAccountPage}>
                  Edit Account Details
                </MenuItem>
                <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
              </Menu>
              <span style={{ color: "white", fontWeight: "bold" }}>
                {username}
              </span>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
