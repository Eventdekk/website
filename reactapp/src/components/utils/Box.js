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
