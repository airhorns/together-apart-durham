import { assert } from "./utils";

export interface SiteConfig {
  logoImageURL: string;
  regionName: string;
  webflowID: string;
}

export const CurrentSiteName = process.env.CURRENT_SITE || "ottawa";
export const Sites: { [key: string]: SiteConfig } = {
  ottawa: {
    logoImageURL: "/images/together-apart-white-logo.png",
    regionName: "Ottawa",
    webflowID: "5e9b8391feaebda50a6468b9",
  },
  outaouais: {
    logoImageURL: "https://uploads-ssl.webflow.com/5e8b7cd1b6d262ea8ff09537/5e8cca37a6472a91af952652_logo-no-bkgrnd-sml-p-500.png",
    regionName: "Outaouais",
    webflowID: "5e9b83a33ef6dfdaabf72437",
  },
};

export const CurrentSite: SiteConfig = assert(Sites[CurrentSiteName]);

console.log(`Building for ${CurrentSite.regionName} region.`, { currentSite: process.env.CURRENT_SITE });
