import React, { useState } from "react";

import { MonthlyView, WeeklyView } from "./utils/Calender.js";
import Page from "./site/Page.js";
import { ClickableText } from "./utils/Text.js";

export default function CalenderPage() {
  const [view, setView] = useState("monthly");
  const [date, setDate] = useState(new Date());

  const onDateChange = (date) => {
    setDate(date);
  };

  const switchToMonthlyView = () => {
    setView("monthly");
  };

  const switchToWeeklyView = () => {
    setView("weekly");
  };

  const events = [
    { date: new Date(2024, 1, 5), title: "Event 1" },
    { date: new Date(2024, 1, 15), title: "Event 2" },
    { date: new Date(2024, 1, 23), title: "Event 3" },
    // Add more events as needed
  ];

  return (
    <Page>
      <div class="flex justify-center">
        <button onClick={switchToMonthlyView} class="mr-4 ">
          <ClickableText
            style={`p-1 ${
              view === "monthly"
                ? "text-primary bg-gray-100 rounded-lg dark:text-secondary dark:bg-gray-800"
                : ""
            }`}
          >
            Month
          </ClickableText>
        </button>
        <button onClick={switchToWeeklyView}>
          <ClickableText
            style={`p-1 ${
              view === "weekly"
                ? "text-primary bg-gray-100 rounded-lg dark:text-secondary dark:bg-gray-800"
                : ""
            }`}
          >
            Week
          </ClickableText>
        </button>
      </div>

      {view === "monthly" ? (
        <MonthlyView events={events} date={date} onDateChange={onDateChange} />
      ) : (
        <WeeklyView events={events} date={date} onDateChange={onDateChange} />
      )}
    </Page>
  );
}
