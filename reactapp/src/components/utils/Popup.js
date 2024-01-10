import React, { useState, useEffect } from "react";
import { Text, Title, SecondaryText } from "./Text.js";
import { ProfilePicture } from "./Profile.js";

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
        className={`fixed top-16 bottom-0 inset-x-16 z-50 p-4 bg-white dark:bg-midnight2 rounded-t-xl shadow-lg cursor-default ease-out transition-transform duration-300 ${
          isPopupOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="relative p-4 overflow-y-auto">
          {children}
          <ClosePopupButton togglePopup={togglePopup} />
        </div>
      </div>
    </>
  );
}

export function ClosePopupButton({ togglePopup }) {
  return (
    <button
      className="absolute top-4 right-4 text-midnight dark:text-white hover:text-primary dark:hover:text-primary"
      onClick={togglePopup}
      aria-label="Close"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
