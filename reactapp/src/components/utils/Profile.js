import React, { useState, useEffect } from "react";
import { Text, Title, SecondaryText } from "./Text.js";
import { Popup } from "./Popup.js";

export function ProfileIcon({ children, style }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopupOnEscape = (event) => {
    if (event.key === "Escape" && isPopupOpen) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closePopupOnEscape);
    return () => {
      document.removeEventListener("keydown", closePopupOnEscape);
    };
  }, [isPopupOpen]);

  return (
    <div className="relative">
      <ProfilePicture style={style} togglePopup={togglePopup}></ProfilePicture>
      <Popup togglePopup={togglePopup} isPopupOpen={isPopupOpen}>
        <div class="mb-1 flex items-center">
          <ProfilePicture style={"h-20 rounded-full"}></ProfilePicture>
          <Text style="text-3xl p-4 font-semibold">Qatari Virtual</Text>
        </div>
      </Popup>
    </div>
  );
}

export function ProfilePicture({ style, togglePopup }) {
  return (
    <img
      className={style + " h-10 rounded-full"}
      src="https://sea2.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/qatarivirtual/96/1210662_2.png"
      alt="Natalia"
      onClick={togglePopup}
    />
  );
}
