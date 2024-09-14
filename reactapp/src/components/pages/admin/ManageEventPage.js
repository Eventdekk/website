import Page from "../../site/Page";
import { HoverBox } from "../../utils/Box";
import {
  Text,
  ClickableText,
  TruncatedText,
  SecondaryText,
} from "../../utils/Text";
import { useQuery } from "react-query";
import { fetchEvents } from "../../query/query";
import Banner from "../../utils/Banner";
import { ProfilePicture, StackedProfile } from "../../utils/Profile";
import { CalendarShow } from "../../utils/Calendar";
import { Link, useParams } from "react-router-dom";
import { Unit } from "../../utils/Unit";

export function ManageEventsPage() {
  const { data, isLoading, error } = useQuery("events", fetchEvents);

  if (isLoading) {
    return <Page>Loading...</Page>;
  }
  // Function to get the month and year as a string
  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  // Group events by month
  const eventsByMonth = data.reduce((acc, event) => {
    const monthYear = getMonthYear(event.start_date);
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

  return (
    <Page>
      <div class="py-3 px-3 flex justify-between items-center">
        <Text style="font-medium text-2xl">Manage Events</Text>
      </div>
      <div className="mr-3">
        {Object.entries(eventsByMonth).map(([month, events]) => (
          <div key={month}>
            <div className="flex items-center mt-2">
              <SecondaryText style="text-lg ">{month}</SecondaryText>
              <div className="flex-grow border-t border-gray-500 dark:border-gray-400 ml-3"></div>
            </div>
            {events.map((event) => (
              <ListItem key={event.id} data={event} />
            ))}
          </div>
        ))}
      </div>
    </Page>
  );
}

export function ManageEventPage() {
  const { data, isLoading, error } = useQuery("events", fetchEvents);
  const { id } = useParams();
  const event = data.find((item) => item.id == id);
  console.log(event);
  return (
    <Page>
      <div class="py-3">
        <Text style="font-meditum text-2xl">{event.name}</Text>
        <div class="flex justify-normal items-center mt-2">
          <div class="mr-1">
            <ProfilePicture
              style="h-7"
              src={event.group.profile_link}
            ></ProfilePicture>
          </div>
          <div class="">
            <ClickableText>{event.group.name}</ClickableText>
          </div>
          <div class="mt-1 ml-5 flex flex-wrap">
            <StackedProfile groups={event.joining_groups} />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div>
          <Banner src={event.thumbnail} style=""></Banner>
          <SecondaryText style="ml-1 mt-2">{event.description}</SecondaryText>
        </div>

        <div class="col-span-2">
          {event.units.map((unitData, index) => (
            <Unit
              unitData={unitData}
              joiningGroups={event.joiningGroups}
            ></Unit>
          ))}
        </div>
      </div>
    </Page>
  );
}

export function ListItem({ data }) {
  const dateObject = new Date(data.start_date);
  return (
    <Link to={"/admin/manage/" + data.id}>
      <HoverBox>
        <div class="grid grid-cols-10">
          <div class="col-span-1 my-auto">
            <CalendarShow dateObject={dateObject}></CalendarShow>
          </div>
          <Banner
            src={data.thumbnail}
            style="mr-1 col-span-3 md:col-span-2 xl:col-span-1"
          ></Banner>
          <div class="ml-2 my-auto col-span-3 lg:col-span-2">
            <TruncatedText style="text-lg font-semibold">
              {data.name}
            </TruncatedText>
            <div class="flex justify-normal items-center">
              <div class="mr-1">
                <ProfilePicture
                  style="h-7"
                  src={data.group.profile_link}
                ></ProfilePicture>
              </div>
              <div class="">
                <ClickableText>{data.group.name}</ClickableText>
              </div>
            </div>
          </div>

          <div class="md:flex flex-wrap mt-1 lg:mt-4 hidden md:col-span-1 xl:col-span-2">
            <StackedProfile groups={data.joining_groups} />
          </div>
        </div>
      </HoverBox>
    </Link>
  );
}
