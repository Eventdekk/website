import React, { useState, useEffect } from "react";
import { Text, Title, SecondaryText } from "./Text.js";
import { Popup } from "./Popup.js";
import { LoadingBox } from "./Box.js";

export function ProfilePicture({
  style,
  onClick,
  src = "https://cdn.discordapp.com/icons/1073981884075352105/c6d918571a79ae8d11f43badbc11f88d.webp?size=160",
  isLoading,
}) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src, isLoading]);

  const handleError = (e) => {
    setError(true);
  };

  if (isLoading || error) {
    return <LoadingBox style={style + " h-10 w-10"} />;
  }

  return (
    <img
      className={style + " h-10 rounded-full"}
      src={src}
      alt="Profile picture"
      onClick={onClick}
      onError={handleError}
    />
  );
}

export function StackedProfile({ style, groups }) {
  const maxVisibleGroups = 7;
  const visibleGroups = groups.slice(0, maxVisibleGroups);
  const remainingGroupsCount = groups.length - maxVisibleGroups;
  return (
    <>
      {visibleGroups.map((group, index) => (
        <ProfilePicture
          key={index}
          style={style + " h-6 -mr-1 ring-2 dark:ring-midnight"}
          src={group.profile_link}
        />
      ))}
      {remainingGroupsCount > 0 && (
        <span
          className={
            style +
            " flex -mr-1 items-center justify-center dark:bg-midnight2 rounded-full h-6 w-6 ring-2 dark:ring-midnight"
          }
        >
          <SecondaryText style="font-medium text-xs">
            +{remainingGroupsCount}
          </SecondaryText>
        </span>
      )}
    </>
  );
}
