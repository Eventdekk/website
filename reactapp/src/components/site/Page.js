import { useEffect, useState } from "react";

import Footer from "./Footer.js";

export default function Page({ children, style }) {
  return (
    <>
      <div class={style + " bg-white dark:bg-midnight w-full"}>
        {children}
        <Footer></Footer>
      </div>
    </>
  );
}
