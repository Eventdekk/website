import Page from "./site/Page.js";
import Event from "./utils/Event.js";
import { Text, Title } from "./utils/Text.js";

export default function Home() {
  const myArray = Array.from({ length: 9 }, (_, index) => index);

  return (
    <Page>
      <Title style="hidden font-bold text-center text-2xl">
        Upcoming Events:
      </Title>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 min-h-screen items-center justify-center">
        {myArray.map((item, index) => (
          <Event key={index}></Event>
        ))}
      </div>
    </Page>
  );
}
