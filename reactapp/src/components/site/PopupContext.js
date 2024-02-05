import { createContext, useContext, useState } from "react";
import { Popup } from "../utils/Popup.js";

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const togglePopup = (content) => {
    isPopupOpen ? closePopup() : openPopup(content);
  };

  const openPopup = (content) => {
    setPopupContent(content);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <PopupContext.Provider
      value={{ isPopupOpen, openPopup, closePopup, togglePopup }}
    >
      {children}
      <Popup isPopupOpen={isPopupOpen} togglePopup={togglePopup}>
        {popupContent}
      </Popup>
    </PopupContext.Provider>
  );
}

export function usePopup() {
  return useContext(PopupContext);
}
