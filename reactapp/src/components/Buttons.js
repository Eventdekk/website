import "../App.css";
import CounterButton from "./utils/CounterButton.js";

export default function Buttons() {
  return (
    <>
      <section class="text-center p-4">
        <h1 class="text-3xl">Buttons:</h1>
        <div class="mt-2">
          <CounterButton message="Clicked" style="bg-blue-500">
            Increment
          </CounterButton>
        </div>
        <div class="mt-2">
          <CounterButton message="Clicked" style="bg-red-500 hover:bg-red-700">
            Increment Red
          </CounterButton>
        </div>
      </section>
    </>
  );
}
