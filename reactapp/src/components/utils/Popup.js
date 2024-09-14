import React, { useState, useEffect } from "react";
import { Text, Title, SecondaryText } from "./Text.js";
import { ProfilePicture } from "./Profile.js";
import { CloseButton } from "./Form.js";

export function Popup({ children, style, togglePopup, isPopupOpen }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black opacity-30 ${
          isPopupOpen ? "" : "invisible"
        }`}
        onClick={togglePopup}
      ></div>
      <div
        className={`fixed top-8 bottom-0 inset-x-8 z-50 p-4 bg-white dark:bg-midnight2 rounded-t-xl shadow-lg cursor-default ease-in-out transition-transform duration-300 ${
          isPopupOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="relative p-4 overflow-y-auto">
          {children}
          <CloseButton style="absolute top-4 right-4" onClick={togglePopup} />
        </div>
      </div>
    </>
  );
}
