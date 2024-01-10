export default function Calender({ children, style, month, day }) {
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
