import { useEffect, useState } from "react";

export function PendingNotifications({ children }) {
  return (
    <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-secondary bg-blue-100 rounded-full dark:bg-secondary dark:text-blue-200">
      {children}
    </span>
  );
}

export function Error({ children, time = 3000 }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, time);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {show ? (
        <div
          className={
            "fixed z-40 top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-3 rounded-lg shadow-md"
          }
        >
          Error! {children}
        </div>
      ) : null}
    </>
  );
}
