import { assert } from "./utils";

export interface SiteConfig {
  rootURL: string;
  logoImageURL: string;
  regionName: string;
  webflowID: string;
  algoliaAPIKey: string; // generated via /api/algoliaKeys
  googleAnalyticsID: string;
  instagram: string;
}

export const CurrentSiteName = assert(process.env.CURRENT_SITE, "CURRENT_SITE environment variable needs to be set");
export const Sites: { [key: string]: SiteConfig } = {
  ottawa: {
    rootURL: "https://together-apart.ca",
    logoImageURL: "/images/together-apart-white-logo.png",
    regionName: "Ottawa",
    webflowID: "5e9b8391feaebda50a6468b9",
    algoliaAPIKey:
      "MjA2ZmRjMWQxZTliNThkMGM1ZDcyMTMzY2MyZmQ3ZWI2ODRiODMxODRjMDdhMDNiZWUwNGU1Y2ZlYmQyNmNmN2ZpbHRlcnM9c2l0ZSUzQTVlOWI4MzkxZmVhZWJkYTUwYTY0NjhiOQ==",
    googleAnalyticsID: "UA-161950128-1",
    instagram: "https://www.instagram.com/togetherott/",
  },
  outaouais: {
    rootURL: "https://outaouais.together-apart.ca",
    logoImageURL: "/images/outaouais-logo.png",
    regionName: "Outaouais",
    webflowID: "5e9b83a33ef6dfdaabf72437",
    algoliaAPIKey:
      "ZjdiNmI1MGMwMGM3NGY1ZjJiZWY4ZTcwOGY5OGQxNGUzYWUwMjJhNGY3NGRhMTUxODc2YWM4NTg2ZDZkMDg3ZWZpbHRlcnM9c2l0ZSUzQTVlOWI4M2EzM2VmNmRmZGFhYmY3MjQzNw==",
    googleAnalyticsID: "UA-161950128-2",
    instagram: "https://www.instagram.com/togetherott/",
  },
  durham: {
    rootURL: "https://durham.together-apart.ca",
    logoImageURL: "/images/durham-logo.png",
    regionName: "Durham",
    webflowID: "5ea5c7bf52344847b530de6c",
    algoliaAPIKey:
      "ZDY0ZmEyMzI2MDdjNzQwMmEzZjliN2YyMWIyMjhkMDZjMjYwNzljOGZjYjBiNDBjNTUwYjQ4NWIxYTZiZGM2ZWZpbHRlcnM9c2l0ZSUzQTVlYTVjN2JmNTIzNDQ4NDdiNTMwZGU2Yw==",
    googleAnalyticsID: "UA-161950128-3",
    instagram: "https://www.instagram.com/togetherdurham/",
  },
};

export const CurrentSite: SiteConfig = assert(Sites[CurrentSiteName]);
