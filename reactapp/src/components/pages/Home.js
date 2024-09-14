import Page from "../site/Page.js";
import { Event, LoadingEvent } from "../utils/Event.js";
import { Text, Title } from "../utils/Text.js";
import { useQuery } from "react-query";
import { fetchEvents } from "../query/query.js";

export default function Home() {
  const { data, isLoading, error } = useQuery("events", fetchEvents);

  if (isLoading)
    return (
      <Page>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 min-h-screen items-center justify-center">
          {[...Array(9)].map((_, index) => (
            <LoadingEvent key={index} />
          ))}
        </div>
      </Page>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Page>
      <Title style="hidden font-bold text-center text-2xl">
        Upcoming Events:
      </Title>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 min-h-screen items-center justify-center">
        {data.map((event, index) => (
          <Event key={index} data={event}></Event>
        ))}
      </div>
    </Page>
  );
}
