"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

const GlobalContext = createContext({
  userId: "",
  setUserId: () => "",
  username: "",
  setUsername: () => "",
});

export const GlobalContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        userId,
        setUserId,
        username,
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
