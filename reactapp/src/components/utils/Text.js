export function Text({ children, style }) {
  return (
    <>
      <div class={style + " text-black dark:text-slate-100 "}>{children}</div>
    </>
  );
}

export function SecondaryText({ children, style }) {
  return (
    <>
      <div class={style + " text-slate-900 dark:text-slate-300"}>
        {children}
      </div>
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

export function ClickableText({ children, style }) {
  return (
    <Text
      style={
        style + " hover:text-primary dark:hover:text-secondary duration-300"
      }
    >
      {children}
    </Text>
  );
}
