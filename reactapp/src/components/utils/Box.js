export function HoverBox({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      className={
        style +
        " cursor-pointer rounded-xl bg-white dark:bg-midnight p-2 duration-200 hover:bg-slate-100 dark:hover:bg-midnight2"
      }
    >
      {children}
    </div>
  );
}

export function LoadingBox({ children, style }) {
  return (
    <div
      className={
        style + " animate-pulse rounded-full bg-slate-200 dark:bg-midnight2"
      }
    >
      {children}
    </div>
  );
}
