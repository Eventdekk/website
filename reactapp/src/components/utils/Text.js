export function Text({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      className={style + " text-black dark:text-slate-100 align-middle"}
    >
      {children}
    </div>
  );
}

export function SecondaryText({ children, style }) {
  return (
    <>
      <div className={style + " text-slate-900 dark:text-slate-300"}>
        {children}
      </div>
    </>
  );
}

export function InvertedText({ children, style, onClick }) {
  return (
    <>
      <Text
        onClick={onClick}
        style={style + " text-slate-100 dark:text-black "}
      >
        {children}
      </Text>
    </>
  );
}

export function Title({ children, style }) {
  return (
    <>
      <Text style={style + " text-xl"}>{children}</Text>
    </>
  );
}

export function TruncatedText({ children, style }) {
  return (
    <Text style={style + " truncate whitespace-nowrap overflow-hidden"}>
      {children}
    </Text>
  );
}

export function ClippedText({ children, style }) {
  return (
    <Text
      style={style + " overflow-ellipsis whitespace-nowrap overflow-hidden"}
    >
      {children}
    </Text>
  );
}

export function ClickableText({ children, style, onClick }) {
  return (
    <Text
      style={
        style + " hover:text-primary hover:dark:text-secondary duration-300"
      }
      onClick={onClick}
    >
      {children}
    </Text>
  );
}

export function ICAOText({ children, style, onClick }) {
  return (
    <Text
      style={
        style +
        " px-1 text-xs font-semibold text-slate-600 dark:text-slate-300 rounded border border-solid border-slate-400 dark:border-slate-500"
      }
      onClick={onClick}
    >
      {children}
    </Text>
  );
}
