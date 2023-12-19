import { useEffect, useState } from "react";

import Footer from "./Footer.js";

export default function Page({ children, style }) {
  return (
    <>
      <div class={style + " bg-white dark:bg-midnight"}>
        {children}
        <Footer></Footer>
      </div>
    </>
  );
}
