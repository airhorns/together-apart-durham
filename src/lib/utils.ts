const brokenImageReplacement =
  "https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7d424eac246521da95b870_together-apart-white-logo-p-500.png";

export const imgixURL = (src?: string | null) => {
  if (src) {
    if (src.startsWith("/")) {
      return `https://togetherapart.imgix.net${src}`;
    } else {
      return src
        .replace("https://global-uploads.webflow.com/", "https://ta-wf-global-uploads.imgix.net/")
        .replace("https://uploads-ssl.webflow.com/", "https://ta-wf-uploads-ssl.imgix.net/");
    }
  } else {
    return brokenImageReplacement;
  }
};

export function assert<T>(value: T | undefined | null, message?: string): T {
  if (!value) {
    throw new Error("assertion error" + (message ? `: ${message}` : ""));
  }
  return value;
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
