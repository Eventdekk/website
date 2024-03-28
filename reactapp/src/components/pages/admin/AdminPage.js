import React, { useState, useEffect } from "react";
import { useLocation, redirect, Link } from "react-router-dom";
import { useQuery } from "react-query";

import Page from "../../site/Page.js";
import { DiscordLogOutButton } from "../LoginPage.js";
import { SecondaryText, Text, Title, ClickableText } from "../../utils/Text.js";
import { useUser } from "../../site/UserContext.js";
import { ProfilePicture } from "../../utils/Profile.js";
import { convertDatesToObjects, WeeklyView } from "../../utils/Calendar.js";
import { HoverBox } from "../../utils/Box.js";

import { fetchUserGroups, fetchGroupEvents } from "../../query/query.js";

export function AdminPage() {
  const { username, setLogged, userId, selectedGroup, setSelectedGroup } =
    useUser();

  const { data, isLoading, error } = useQuery(
    userId ? ["user_groups", userId] : null,
    () => fetchUserGroups(userId),
    {
      enabled: userId !== null,
    }
  );

  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  if (isLoading) {
    return <Page></Page>;
  }

  if (error) {
    return <Page></Page>;
  }

  if (selectedGroup) {
    return (
      <Page>
        <div class="p-2 px-5">
          <Dashboard group={selectedGroup} />
        </div>
      </Page>
    );
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
            <HoverBox
              onClick={() => handleGroupSelection(group)}
              style="m-2 flex items-center"
            >
              <ProfilePicture
                key={index}
                style="m-2 h-20 rounded-xl"
                src={group.profile_link}
              ></ProfilePicture>
              <Title style="font-bold m-2">{group.name}</Title>
            </HoverBox>
          ))}
        </div>
      </div>
    </Page>
  );
}

export function Dashboard({ children, group }) {
  const [date, setDate] = useState(new Date());

  const { data, isLoading, error } = useQuery(
    group.id ? ["group_events", group.id] : null,
    () => fetchGroupEvents(group.id),
    {
      enabled: group.id !== null,
    }
  );

  if (isLoading || error) {
    return (
      <div class="max-w-screen-md mx-auto">
        <SecondaryText style="pl-1">Control panel for</SecondaryText>
        <Text style="font-bold text-3xl">{group.name}</Text>
      </div>
    );
  }

  const modifiedEvents = convertDatesToObjects(data);

  return (
    <div class="max-w-screen-md mx-auto">
      <SecondaryText style="pl-1">Control panel for</SecondaryText>
      <Text style="font-bold text-3xl">{group.name}</Text>
      <UpcomingEvent data={data} isLoading={isLoading} error={error} />
      <WeeklyView events={modifiedEvents} date={date} onDateChange={setDate} />
    </div>
  );
}

export function UpcomingEvent({ data, isLoading, error }) {
  if (isLoading) {
    return (
      <div class="my-2 flex items-center rounded-xl p-2 bg-slate-100 dark:bg-midnight2">
        Loading
      </div>
    );
  }

  if (error) {
    return (
      <div class="my-2 flex items-center rounded-xl p-2 bg-slate-100 dark:bg-midnight2">
        Error
      </div>
    );
  }

  if (data.length == 0) {
    return (
      <div class="my-2 flex items-center rounded-xl p-2 bg-slate-100 dark:bg-midnight2">
        <SecondaryText>No upcoming events</SecondaryText>
        <Link to="/admin/create">
          <ClickableText style="px-2 text-xl">Create an event</ClickableText>
        </Link>
      </div>
    );
  }

  return (
    <div class="my-2 flex items-center rounded-xl p-2 bg-slate-100 dark:bg-midnight2">
      <SecondaryText>Upcoming event:</SecondaryText>
      <Text style="px-2 text-xl">{data[0].name}</Text>
    </div>
  );
}
