import React, { useState } from "react";

import { MonthlyView, WeeklyView } from "./utils/Calender.js";
import Page from "./site/Page.js";
import { ClickableText } from "./utils/Text.js";
import { useQuery } from "react-query";
import { fetchEvents } from "./query/query.js";
import { Map } from "./utils/Map.js";

export default function CalenderPage() {
  const [view, setView] = useState("monthly");
  const [date, setDate] = useState(new Date());
  const { data, isLoading, error } = useQuery("events", fetchEvents);

  const airports = [
    { id: 1, name: "Airport A", latitude: 43.7128, longitude: -74.006 },
    { id: 2, name: "Airport B", latitude: 38.0522, longitude: -118.2437 },
    { id: 3, name: "Airport C", latitude: 43.8781, longitude: -87.6298 },
  ];

  const planes = [
    { id: 1, name: "Plane 1", latitude: 40.9128, longitude: -74.006 },
    { id: 2, name: "Plane 2", latitude: 34.2522, longitude: -118.2437 },
    { id: 3, name: "Plane 3", latitude: 41.9781, longitude: -87.6298 },
  ];

  const onDateChange = (date) => {
    setDate(date);
  };

  const switchToMonthlyView = () => {
    setView("monthly");
  };

  const switchToWeeklyView = () => {
    setView("weekly");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  function convertDatesToObjects(events) {
    return events.map((event) => {
      return {
        ...event,
        date: new Date(event.date),
      };
    });
  }

  const modifiedEvents = convertDatesToObjects(data);

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
        <MonthlyView
          events={modifiedEvents}
          date={date}
          onDateChange={onDateChange}
        />
      ) : (
        <WeeklyView
          events={modifiedEvents}
          date={date}
          onDateChange={onDateChange}
        />
      )}
      <Map planes={planes} airports={airports} />
    </Page>
  );
}
