import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useQuery } from "react-query";

import Page from "./site/Page.js";
import { Text, Title } from "./utils/Text.js";
import { fetchUser } from "./query/query.js";
import { useUser } from "./site/UserContext";

export function LoginPage() {
  const { isLogged, setLogged, isLoading, error } = useUser();

  if (!isLogged) {
    return (
      <Page>
        <div class="text-center p-5">
          <Title style="pb-3">You need to login using discord!</Title>
          <DiscordAuthButton></DiscordAuthButton>
        </div>
      </Page>
    );
  }
  if (error) {
    setLogged(false);
    return (
      <Page>
        <div class="text-center p-5">
          <Title>User not found!</Title>
          <DiscordAuthButton></DiscordAuthButton>
        </div>
      </Page>
    );
  }

  if (isLoading) {
    return (
      <Page>
        <div class="text-center p-5">
          <Title>Loading</Title>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Navigate to="/admin" />
    </Page>
  );
}

export function DiscordAuthButton() {
  const handleAuthClick = () => {
    const authorizationUrl = "http://localhost:8000/api/auth/discord/";
    window.location.href = authorizationUrl;
  };

  return (
    <button onClick={handleAuthClick} class="m-1 p-2 rounded bg-stone-800">
      <Text>Authenticate with discord</Text>
    </button>
  );
}

export function DiscordLogOutButton({ setLogged }) {
  const handleAuthClick = () => {
    localStorage.removeItem("userId");
    setLogged(false);
  };

  return (
    <Link to="/login">
      <button onClick={handleAuthClick} class="m-1 p-2 rounded bg-stone-800">
        <Text>Log out</Text>
      </button>
    </Link>
  );
}
