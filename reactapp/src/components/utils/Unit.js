import { useState } from "react";
import { LoadingBox } from "./Box";
import { ICAOText, SecondaryText, Text } from "./Text";
import { ProfilePicture } from "./Profile";
import { CalendarShow } from "./Calendar";
import { HiArrowNarrowRight } from "react-icons/hi";
import { PiAirplaneTakeoffFill, PiAirplaneLandingFill } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";

export function Unit({ unitData, joiningGroups, children, style, isLoading }) {
  //Todo
  if (isLoading) {
    return (
      <LoadingBox
        style={style + " rounded-xl object-cover object-center aspect-video"}
      />
    );
  }

  const dateObject = new Date(unitData.date);
  return (
    <div class="mb-3 mr-3 p-2 rounded-lg bg-gray-100 dark:bg-midnight2">
      <div class="flex items-center justify-between">
        {unitData.type === 1 && (
          <div class="flex items-center">
            <div class="mr-1">
              <FaUserGroup size="20px" />
            </div>
            <Text style="text-lg">
              {unitData.departure + " - " + unitData.arrival + " Group Flight"}
            </Text>
          </div>
        )}
        {unitData.type === 2 && (
          <div class="flex items-center">
            <div class="mr-1">
              <PiAirplaneLandingFill size="20px" />
            </div>
            <Text style="text-lg">{unitData.arrival + " Fly-in"}</Text>
          </div>
        )}
        {unitData.type === 3 && (
          <div class="flex items-center">
            <div class="mr-1">
              <PiAirplaneTakeoffFill size="20px" />
            </div>
            <Text style="text-lg">{unitData.departure + " Fly-out"}</Text>
          </div>
        )}
        <Text style="font-light">{unitData.date}</Text>
      </div>
      <table>
        <tbody>
          {unitData.flights.map((flightData, index) => (
            <Flight flightData={flightData} unitData={unitData}></Flight>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Flight({ flightData, unitData, children, style, isLoading }) {
  //Todo
  if (isLoading) {
    return (
      <LoadingBox
        style={style + " rounded-xl object-cover object-center aspect-video"}
      />
    );
  }

  const convertTimeToZFormat = (time) => {
    let [hours, minutes] = time.split(":");
    return hours + ":" + minutes + "z";
  };

  return (
    <tr key={flightData.id} class="mr-1">
      <td class="py-1">
        <ProfilePicture
          style="h-7"
          src={flightData.group.profile_link}
        ></ProfilePicture>
      </td>
      <td class="py-1">
        <SecondaryText style="pl-1 pr-2">{flightData.group.name}</SecondaryText>
      </td>
      {unitData !== 1}
      <td className="flex flex-col items-center py-1">
        <ICAOText>
          {unitData.type === 2 ? flightData.departure : unitData.departure}
        </ICAOText>
        <Text style="text-sm font-semibold text-slate-600 dark:text-slate-200 ">
          {convertTimeToZFormat(flightData.departure_time)}
        </Text>
      </td>
      <td class="py-1">
        <div class="mx-1">
          <HiArrowNarrowRight />
        </div>
      </td>
      <td className="flex flex-col items-center">
        <ICAOText>
          {unitData.type === 3 ? flightData.arrival : unitData.arrival}
        </ICAOText>
        <Text style="text-sm font-semibold text-slate-600 dark:text-slate-200 ">
          {convertTimeToZFormat(flightData.arrival_time)}
        </Text>
      </td>
    </tr>
  );
}
