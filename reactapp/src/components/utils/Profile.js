import React, { useState, useEffect } from "react";
import { Text, Title, SecondaryText } from "./Text.js";
import { Popup } from "./Popup.js";

export function ProfilePicture({
  style,
  onClick,
  src = "https://cdn.discordapp.com/icons/1073981884075352105/c6d918571a79ae8d11f43badbc11f88d.webp?size=160",
  isLoading,
}) {
  if (isLoading) {
    return (
      <div class="animate-pulse rounded-full bg-slate-700 h-10 w-10"></div>
    );
  }

  return (
    <img
      className={style + " h-10 rounded-full"}
      src={src}
      alt="Natalia"
      onClick={onClick}
    />
  );
}
