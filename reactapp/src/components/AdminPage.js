import React, { useState, useEffect } from "react";
import { useLocation, redirect } from "react-router-dom";
import { useQuery } from "react-query";

import Page from "./site/Page.js";
import { DiscordLogOutButton } from "./LoginPage.js";
import { Text, Title } from "./utils/Text.js";
import { useUser } from "./site/UserContext";
import { ProfilePicture } from "./utils/Profile.js";

export function AdminPage() {
  const { username, setLogged } = useUser();

  const groups = {};

  return (
    <Page>
      <div class="text-center p-5">
        <Title>Welcome back</Title>
        <Title style="font-bold">{username}</Title>
        <DiscordLogOutButton setLogged={setLogged} />
        <Title>Choose from a group to administrate</Title>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 min-h-screen items-center justify-center">
          {groups.map((group, index) => (
            <ProfilePicture key={index}></ProfilePicture>
          ))}
        </div>
      </div>
    </Page>
  );
}
