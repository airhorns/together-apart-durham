import { assert } from "./utils";

export interface SiteConfig {
  logoImageURL: string;
  regionName: string;
  webflowID: string;
  algoliaAPIKey: string; // generated via /api/algoliaKeys
}

export const CurrentSiteName = assert(process.env.CURRENT_SITE, "CURRENT_SITE environment variable needs to be set");
export const Sites: { [key: string]: SiteConfig } = {
  ottawa: {
    logoImageURL: "/images/together-apart-white-logo.png",
    regionName: "Ottawa",
    webflowID: "5e9b8391feaebda50a6468b9",
    algoliaAPIKey:
      "MjA2ZmRjMWQxZTliNThkMGM1ZDcyMTMzY2MyZmQ3ZWI2ODRiODMxODRjMDdhMDNiZWUwNGU1Y2ZlYmQyNmNmN2ZpbHRlcnM9c2l0ZSUzQTVlOWI4MzkxZmVhZWJkYTUwYTY0NjhiOQ==",
  },
  outaouais: {
    logoImageURL: "https://uploads-ssl.webflow.com/5e8b7cd1b6d262ea8ff09537/5e8cca37a6472a91af952652_logo-no-bkgrnd-sml-p-500.png",
    regionName: "Outaouais",
    webflowID: "5e9b83a33ef6dfdaabf72437",
    algoliaAPIKey:
      "ZjdiNmI1MGMwMGM3NGY1ZjJiZWY4ZTcwOGY5OGQxNGUzYWUwMjJhNGY3NGRhMTUxODc2YWM4NTg2ZDZkMDg3ZWZpbHRlcnM9c2l0ZSUzQTVlOWI4M2EzM2VmNmRmZGFhYmY3MjQzNw==",
  },
};

export const CurrentSite: SiteConfig = assert(Sites[CurrentSiteName]);
