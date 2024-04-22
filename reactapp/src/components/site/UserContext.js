import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, Link, redirect } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchUser } from "../query/query.js";
import { Popup } from "../utils/Popup.js";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isLogged, setLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const [discordId, setDiscordId] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);

  const { data, isLoading, error } = useQuery(
    ["user", userId],
    () => fetchUser(userId),
    {
      enabled: userId !== null,
    }
  );

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userIdParam = queryParams.get("userId");

  const loginUser = (userId) => {
    localStorage.setItem("userId", userId);
    setLogged(true);
    setUserId(userId);
  };

  useEffect(() => {
    console.log("empty");
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId !== null && storedUserId !== "") {
      loginUser(storedUserId);
    }
  }, []);

  useEffect(() => {
    console.log("userIdParam");
    if (userIdParam !== null) {
      loginUser(userIdParam);
    }
  }, [userIdParam]);

  useEffect(() => {
    console.log("multo");
    if (!isLoading && data) {
      setDiscordId(data.discord_id);
      setAvatar(data.avatar);
      setUsername(data.username);
    }
  }, [isLoading, data]);

  if (error) {
    setLogged(false);
    localStorage.removeItem("userId");
  }

  if (isLoading) {
    //?
  }

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isLogged,
        setLogged,
        error,
        userId,
        discordId,
        setDiscordId,
        avatar,
        setAvatar,
        username,
        selectedGroup,
        setSelectedGroup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
