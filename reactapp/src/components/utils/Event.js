import { Text, TruncatedText, SecondaryText } from "./Text.js";
import Profile from "./Profile.js";
import Calender from "./Calender.js";
import Banner from "./Banner.js";

export default function Event({}) {
  return (
    <>
      <div class="p-3">
        <div class="cursor-pointer rounded-xl bg-white dark:bg-midnight p-2 hover:shadow-lg shadow-slate-100 dark:shadow-midnight2 duration-200 hover:bg-slate-100 dark:hover:bg-midnight2">
          <div class="flex">
            <div class="mr-2">
              <Profile style="h-8"></Profile>
            </div>
            <div class="mb-1 flex items-center">
              <SecondaryText>Qatari Virtual</SecondaryText>
            </div>
          </div>

          <TruncatedText style="dark:text-slate-100 mb-2 text-lg font-semibold	">
            Christmas In New York! By Qatari Virtual
          </TruncatedText>

          <div class="relative">
            <Banner src="https://images-ext-2.discordapp.net/external/A6xyp9sMfTBBCTSwsgbUa5dFDKu3cEmWMp_Tek68tE4/https/global.discourse-cdn.com/infiniteflight/optimized/4X/0/a/6/0a646d555e58ed792705ee22089c894854b812ab_2_1024x576.jpeg?format=webp&width=1014&height=570"></Banner>
            <Calender style="absolute" month="dec" day="23"></Calender>
          </div>
        </div>
      </div>
    </>
  );
}
