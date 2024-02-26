import React, { useState, useEffect } from "react";
import { Text, TruncatedText, SecondaryText, ClickableText } from "./Text.js";
import { ProfilePicture } from "./Profile.js";
import { CalendarShow } from "./Calendar.js";
import Banner from "./Banner.js";
import { Popup } from "./Popup.js";
import { usePopup } from "../site/PopupContext.js";

//"https://images-ext-2.discordapp.net/external/A6xyp9sMfTBBCTSwsgbUa5dFDKu3cEmWMp_Tek68tE4/https/global.discourse-cdn.com/infiniteflight/optimized/4X/0/a/6/0a646d555e58ed792705ee22089c894854b812ab_2_1024x576.jpeg?format=webp&width=1014&height=570"

export default function Event({ data }) {
  const { isPopupOpen, openPopup, closePopup, togglePopup } = usePopup();

  const dateObject = new Date(data.date);

  const options = { month: "short", day: "numeric" };
  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );

  const [month, day] = formatted.split(" ");

  const toggleProfilePopup = (event) => {
    event.stopPropagation();
    togglePopup(profilePopup(data));
  };

  const toggleEventPopup = () => {
    togglePopup(eventPopup(data));
  };

  const closePopupOnEscape = (event) => {
    if (event.key === "Escape" && isPopupOpen) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closePopupOnEscape);
    return () => {
      document.removeEventListener("keydown", closePopupOnEscape);
    };
  }, [isPopupOpen]);
  return (
    <>
      <div class="p-3">
        <div
          onClick={toggleEventPopup}
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

          <TruncatedText style="dark:text-slate-100 mb-2 text-lg font-semibold	">
            {data.name}
          </TruncatedText>

          <div class="relative">
            <Banner src={data.thumbnail}></Banner>

            <CalendarShow
              style="absolute"
              month={month}
              day={day}
            ></CalendarShow>
          </div>
        </div>
      </div>
    </>
  );
}

function profilePopup(data) {
  return (
    <div class="mb-1 flex items-center">
      <ProfilePicture style={"h-20 rounded-full"}></ProfilePicture>
      <Text style="text-3xl p-4 font-semibold">Qatari Virtual</Text>
    </div>
  );
}

function eventPopup(data) {
  return (
    <div class="mb-1 flex items-center">
      <ProfilePicture style={"h-20 rounded-full"}></ProfilePicture>
      <Text style="text-3xl p-4 font-semibold">Event</Text>
    </div>
  );
}
