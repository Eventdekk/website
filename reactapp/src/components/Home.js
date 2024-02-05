import Page from "./site/Page.js";
import Event from "./utils/Event.js";
import { Text, Title } from "./utils/Text.js";
import { useQuery } from "react-query";
import { fetchEvents } from "./query/query.js";

export default function Home() {
  //const myArray = Array.from({ length: 9 }, (_, index) => index);

  const { data, isLoading, error } = useQuery("events", fetchEvents);

  if (isLoading) return <p>Loading...</p>;
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
