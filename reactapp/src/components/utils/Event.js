import React, { useState, useEffect } from "react";
import { Text, TruncatedText, SecondaryText, ClickableText } from "./Text.js";
import { ProfilePicture } from "./Profile.js";
import { CalendarShow } from "./Calendar.js";
import Banner from "./Banner.js";
import { Popup } from "./Popup.js";
import { HoverBox, LoadingBox } from "./Box.js";
import { usePopup } from "../site/PopupContext.js";

//"https://images-ext-2.discordapp.net/external/A6xyp9sMfTBBCTSwsgbUa5dFDKu3cEmWMp_Tek68tE4/https/global.discourse-cdn.com/infiniteflight/optimized/4X/0/a/6/0a646d555e58ed792705ee22089c894854b812ab_2_1024x576.jpeg?format=webp&width=1014&height=570"

export function Event({ data }) {
  const { isPopupOpen, openPopup, closePopup, togglePopup } = usePopup();

  const dateObject = new Date(data.start_date);

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
        <HoverBox onClick={toggleEventPopup} style="cursor-pointer rounded-xl">
          <div class="flex">
            <div class="mr-2">
              <ProfilePicture
                style="h-8"
                onClick={toggleProfilePopup}
                src={data.group.profile_link}
              ></ProfilePicture>
            </div>
            <div class="mb-1 flex items-center">
              <ClickableText onClick={toggleProfilePopup}>
                {data.group.name}
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
              dateObject={dateObject}
            ></CalendarShow>
          </div>
        </HoverBox>
      </div>
    </>
  );
}

export function LoadingEvent() {
  return (
    <>
      <div class="p-3">
        <HoverBox style="cursor-pointer rounded-xl">
          <div class="flex">
            <div class="mr-2">
              <ProfilePicture style="h-8 w-8" isLoading={true}></ProfilePicture>
            </div>
            <div class="mb-1 flex items-center">
              <LoadingBox style="h-4 w-32" />
            </div>
          </div>

          <TruncatedText style="dark:text-slate-100 mb-2 text-lg font-semibold	"></TruncatedText>

          <div class="relative">
            <Banner isLoading={true}></Banner>
          </div>
        </HoverBox>
      </div>
    </>
  );
}

function profilePopup(data) {
  return (
    <div class="mb-1 flex items-center">
      <ProfilePicture
        style={"h-20 rounded-full"}
        src={data.group.profile_link}
      ></ProfilePicture>
      <Text style="text-3xl p-4 font-semibold">{data.group.name}</Text>
    </div>
  );
}

function eventPopup(data) {
  return (
    <div class="mb-1 flex items-center">
      <ProfilePicture
        style={"h-20 rounded-full"}
        src={data.group.profile_link}
      ></ProfilePicture>
      <Text style="text-3xl p-4 font-semibold">{data.name}</Text>
    </div>
  );
}
