import React, { useState, useEffect } from "react";
import { Text, TruncatedText, SecondaryText, ClickableText } from "./Text.js";
import { ProfilePicture } from "./Profile.js";
import Calender from "./Calender.js";
import Banner from "./Banner.js";
import { Popup } from "./Popup.js";

export default function Event({}) {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleProfilePopup = (event) => {
    event.stopPropagation();
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const togglePopup = () => {
    if (!isProfilePopupOpen) {
      setIsPopupOpen(!isPopupOpen);
    }
  };

  const closePopupOnEscape = (event) => {
    if (event.key === "Escape" && isPopupOpen) {
      setIsPopupOpen(false);
    }
    if (event.key === "Escape" && isProfilePopupOpen) {
      setIsProfilePopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closePopupOnEscape);
    return () => {
      document.removeEventListener("keydown", closePopupOnEscape);
    };
  }, [isPopupOpen, isProfilePopupOpen]);
  return (
    <>
      <div class="p-3">
        <div
          onClick={togglePopup}
          class="cursor-pointer rounded-xl bg-white dark:bg-midnight p-2 hover:shadow-lg shadow-slate-100 dark:shadow-midnight2 duration-200 hover:bg-slate-100 dark:hover:bg-midnight2"
        >
          <div class="flex">
            <div class="mr-2">
              <ProfilePicture
                style="h-8"
                onClick={toggleProfilePopup}
              ></ProfilePicture>
            </div>
            <div class="mb-1 flex items-center">
              <ClickableText onClick={toggleProfilePopup}>
                Qatari Virtual
              </ClickableText>
            </div>
          </div>

          <Popup
            togglePopup={toggleProfilePopup}
            isPopupOpen={isProfilePopupOpen}
          >
            <div class="mb-1 flex items-center">
              <ProfilePicture style={"h-20 rounded-full"}></ProfilePicture>
              <Text style="text-3xl p-4 font-semibold">Qatari Virtual</Text>
            </div>
          </Popup>

          <TruncatedText style="dark:text-slate-100 mb-2 text-lg font-semibold	">
            Christmas In New York! By Qatari Virtual
          </TruncatedText>

          <div class="relative">
            <Banner src="https://images-ext-2.discordapp.net/external/A6xyp9sMfTBBCTSwsgbUa5dFDKu3cEmWMp_Tek68tE4/https/global.discourse-cdn.com/infiniteflight/optimized/4X/0/a/6/0a646d555e58ed792705ee22089c894854b812ab_2_1024x576.jpeg?format=webp&width=1014&height=570"></Banner>
            <Calender style="absolute" month="dec" day="23"></Calender>
          </div>
        </div>
      </div>
      <Popup togglePopup={togglePopup} isPopupOpen={isPopupOpen}>
        <div class="mb-1 flex items-center">
          <ProfilePicture style={"h-20 rounded-full"}></ProfilePicture>
          <Text style="text-3xl p-4 font-semibold">Event</Text>
        </div>
      </Popup>
    </>
  );
}
