import { useState } from "react";
import { LoadingBox } from "./Box";
export default function Banner({ children, style, src, isLoading }) {
  const [error, setError] = useState(false);

  if (isLoading || error) {
    return (
      <LoadingBox
        style={style + " rounded-xl object-cover object-center aspect-video"}
      />
    );
  }
  return (
    <>
      <img
        class={style + " rounded-xl object-cover object-center aspect-video"}
        src={src}
        alt="Banner image"
        onError={() => setError(true)}
      />
    </>
  );
}
