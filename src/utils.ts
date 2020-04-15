const brokenImageReplacement =
  "https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7d424eac246521da95b870_together-apart-white-logo-p-500.png";

export const webflowToImgixURL = (src?: string | null) => {
  if (src) {
    return src
      .replace(
        "https://global-uploads.webflow.com/",
        "https://ta-wf-global-uploads.imgix.net/"
      )
      .replace(
        "https://uploads-ssl.webflow.com/",
        "https://ta-wf-uploads-ssl.imgix.net/"
      );
  } else {
    return brokenImageReplacement;
  }
};
