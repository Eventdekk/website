import React, { useState, useEffect } from "react";
import { useLocation, redirect } from "react-router-dom";
import { useQuery } from "react-query";

import Page from "./site/Page.js";
import { DiscordLogOutButton } from "./LoginPage.js";
import { Text, Title } from "./utils/Text.js";
import { useUser } from "./site/UserContext";
import { ProfilePicture } from "./utils/Profile.js";

import { fetchUserGroups } from "./query/query.js";

export function AdminPage() {
  const { username, setLogged, userId } = useUser();

  const { data, isLoading, error } = useQuery(
    userId ? ["user_groups", userId] : null,
    () => fetchUserGroups(userId),
    {
      enabled: userId !== null,
    }
  );

  if (isLoading) {
    return <Page></Page>;
  }

  if (error) {
    return <Page></Page>;
  }

  return (
    <Page>
      <div class="text-center p-5">
        <Title>Welcome back</Title>
        <Title style="font-bold">{username}</Title>
        <DiscordLogOutButton setLogged={setLogged} />
        <Title style={"m-5"}>Choose from a group to administrate</Title>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
          {data.map((group, index) => (
            <div class="flex items-center cursor-pointer rounded-xl bg-white dark:bg-midnight p-2 duration-200 hover:bg-slate-100 dark:hover:bg-midnight2">
              <ProfilePicture
                key={index}
                style="m-2 h-20 rounded-xl"
                src={group.profile_link}
              ></ProfilePicture>
              <Title style="font-bold m-2">{group.name}</Title>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
