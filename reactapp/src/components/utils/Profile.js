import React, { useState, useEffect } from "react";
import { Text, Title, SecondaryText } from "./Text.js";
import { Popup } from "./Popup.js";

export function ProfilePicture({
  style,
  onClick,
  src = "https://sea2.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/qatarivirtual/96/1210662_2.png",
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
