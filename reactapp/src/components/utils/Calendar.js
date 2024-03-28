import React, { useState, useEffect } from "react";
import {
  Text,
  ClickableText,
  SecondaryText,
  InvertedText,
  TruncatedText,
  ClippedText,
} from "./Text.js";

export function CalendarShow({ children, style, month, day }) {
  return (
    <div
      class={
        style +
        " bottom-2 left-2 shadow-md block rounded-xl overflow-hidden bg-white dark:bg-midnight text-center w-14 h-14"
      }
    >
      <div class="bg-primary text-white dark:text-midnight uppercase font-bold">
        {month}
      </div>
      <div class="rounded-xl">
        <span class="text-2xl font-bold dark:text-white">{day}</span>
      </div>
    </div>
  );
}

export function MonthlyView({ children, events, date, onDateChange }) {
  // Function to move to the previous month
  const goToPrevMonth = () => {
    onDateChange(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  // Function to move to the next month
  const goToNextMonth = () => {
    onDateChange(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  // Function to get the days of the current month
  const getDaysInMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    // Adjust the starting point to Monday
    let startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Add days from the previous month
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startDay; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i + 1),
        isCurrentMonth: false,
      });
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    // Add days from the next month
    const nextMonthDays = 42 - days.length; // 42 is the maximum number of cells in a 6x7 grid
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  // Function to group days into rows of 7
  const groupDaysIntoRows = (days) => {
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }
    return rows;
  };

  const getEventsForDay = (events, day) => {
    const dayYear = day.getFullYear();
    const dayMonth = day.getMonth();
    const dayDate = day.getDate();

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === dayYear &&
        eventDate.getMonth() === dayMonth &&
        eventDate.getDate() === dayDate
      );
    });
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="grid gap-4 max-w-screen-md mx-auto p-2">
      <div className="flex justify-between items-center">
        <button onClick={goToPrevMonth}>
          <ClickableText>Previous Month</ClickableText>
        </button>
        <span className="text-lg font-bold">
          <Text>
            {date.toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </span>
        <button onClick={goToNextMonth}>
          <ClickableText>Next Month</ClickableText>
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            {daysOfWeek.map((day, index) => (
              <th key={index} className="" style={{ width: "calc(100% / 7)" }}>
                <Text style="text-sm font-medium">{day}</Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groupDaysIntoRows(getDaysInMonth()).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map(({ date, isCurrentMonth }, index) => (
                <td
                  key={index}
                  className={`relative border border-gray-300 dark:border-gray-800 ${
                    !isCurrentMonth
                      ? "text-gray-500 bg-gray-100 dark:text-gray-700 dark:bg-gray-900"
                      : ""
                  }`}
                  style={{
                    height: "calc(100vh / 7)",
                  }}
                >
                  <div className="absolute top-0 p-0.5 w-full">
                    {Array.isArray(events) &&
                      getEventsForDay(events, date).map((event) => (
                        <EventHolder key={event.name} event={event} />
                      ))}
                  </div>
                  <div class="absolute bottom-0 right-0 px-1">
                    <Text style="font-semibold">
                      {date
                        .getDate()
                        .toLocaleString("en-US", { minimumIntegerDigits: 2 })}
                    </Text>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function WeeklyView({ events, date, onDateChange }) {
  const calcStartDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(
      newDate.getDate() - newDate.getDay() + (newDate.getDay() === 0 ? -6 : 1)
    );
    return newDate;
  };

  useEffect(() => {
    const startDate = calcStartDate(date);
    onDateChange(startDate);
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const goToPrevWeek = () => {
    onDateChange(new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const goToNextWeek = () => {
    onDateChange(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const getEventsForDay = (events, day) => {
    const dayYear = day.getFullYear();
    const dayMonth = day.getMonth();
    const dayDate = day.getDate();

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === dayYear &&
        eventDate.getMonth() === dayMonth &&
        eventDate.getDate() === dayDate
      );
    });
  };

  return (
    <>
      <div className="grid gap-4 max-w-screen-md mx-auto p-2">
        <div className="flex justify-between items-center">
          <button onClick={goToPrevWeek}>
            <ClickableText>Previous Week</ClickableText>
          </button>
          <span className="text-lg font-bold">
            <Text>
              {date.toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </span>
          <button onClick={goToNextWeek}>
            <ClickableText>Next Week</ClickableText>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 max-w-screen-md mx-auto p-2">
        {daysOfWeek.map((day, index) => {
          // Adjust the start date to Monday
          const currentDay = new Date(
            date.getTime() + index * 24 * 60 * 60 * 1000
          );
          return (
            <div key={index}>
              <div className="text-sm font-medium">{day}</div>
              <Text className="text-sm font-medium">
                {currentDay
                  .getDate()
                  .toLocaleString("en-US", { minimumIntegerDigits: 2 })}
              </Text>
              <div
                className={`p-0.5 pt-1 h-auto border-y border-r border-gray-300 dark:border-gray-800 ${
                  index == 0 ? "border-l" : null
                }`}
                style={{
                  height: "calc(100vh / 2)",
                }}
              >
                {Array.isArray(events) &&
                  getEventsForDay(events, currentDay).map((event) => (
                    <EventHolder key={event.name} event={event} />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function EventHolder({ date, event }) {
  return (
    <>
      <TruncatedText>
        <InvertedText
          style="text-sm bg-primary dark:bg-secondary p-0.5 pl-1 mb-1 rounded-md"
          key={event.name}
        >
          {event.name}
        </InvertedText>
      </TruncatedText>
    </>
  );
}

export function convertDatesToObjects(events) {
  return events.map((event) => {
    return {
      ...event,
      date: new Date(event.date),
    };
  });
}
