export function PendingNotifications({ children }) {
  return (
    <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-secondary bg-blue-100 rounded-full dark:bg-secondary dark:text-blue-200">
      {children}
    </span>
  );
}
