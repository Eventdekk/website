import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchUser } from "../query/query.js";
import { Popup } from "../utils/Popup.js";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isLogged, setLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const [discordId, setDiscordId] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const { data, isLoading, error } = useQuery(
    userId ? ["user", userId] : null,
    () => fetchUser(userId),
    {
      enabled: userId !== null,
    }
  );

  console.log(data);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userIdParam = queryParams.get("userId");

  const loginUser = (userId) => {
    localStorage.setItem("userId", userId);
    setLogged(true);
    setUserId(userId);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId !== null && storedUserId !== "") {
      loginUser(storedUserId);
    }
  }, []);

  useEffect(() => {
    //Check if this is a valid UUID
    if (userIdParam !== null) {
      loginUser(userIdParam);
    }
  }, [userIdParam]);

  useEffect(() => {
    if (!isLoading && data) {
      setDiscordId(data.discord_id);
      setAvatar(data.avatar);
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
        userId,
        discordId,
        setDiscordId,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
