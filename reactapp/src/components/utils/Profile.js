import React, { useState, useEffect } from "react";
import { Text, Title, SecondaryText } from "./Text.js";
import { Popup } from "./Popup.js";

export function ProfilePicture({ style, onClick }) {
  return (
    <img
      className={style + " h-10 rounded-full"}
      src="https://sea2.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/qatarivirtual/96/1210662_2.png"
      alt="Natalia"
      onClick={onClick}
    />
  );
}
