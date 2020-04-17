import React from "react";
import classnames from "classnames";
import { Hit } from "react-instantsearch-core";
import { Highlight } from "react-instantsearch-dom";
import Imgix from "react-imgix";
import { webflowToImgixURL } from "../../lib/utils";
import { BusinessDoc } from "../../lib/types";
import { RichTextHighlight } from "./RichTextHighlight";

const DeliveryApps: { key: keyof BusinessDoc; label: string }[] = [
  { key: "uber-eats", label: "UberEATS" },
  { key: "grubhub", label: "Grubhub" },
  { key: "postmates", label: "Skip the Dishes" },
  { key: "door-dash", label: "Door Dash" },
  { key: "seamless", label: "Seamless" },
];

export const BusinessCard = (props: { hit: Hit<BusinessDoc> }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const hasMethods =
    props.hit["gift-card-link"] || props.hit["online-store-link"] || props.hit["online-order-link"] || props.hit["dontations-link"];

  const hasDeliveryApps = DeliveryApps.some(({ key }) => !!props.hit[key]);

  return (
    <div className="business-item w-dyn-item">
      <div className="card-parent">
        <Imgix
          src={webflowToImgixURL(props.hit.header_image)}
          className="card-image"
          sizes="100vw"
          htmlAttributes={{ alt: `Goods or services from ${props.hit.name}` }}
        />
        <div className="card-content">
          <div className="div-block-2">
            <div className="name-and-category">
              <div className="basic-info-wrap">
                <p className="category">{props.hit.category}</p>
                <img
                  src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd99493ef4fbcf4_dot.svg"
                  alt=""
                  className="separator"
                />
                <p
                  className={classnames("category green", {
                    "w-condition-invisible": props.hit.hours !== "regular",
                  })}
                >
                  <strong>Regular Hours</strong>
                </p>
                <p
                  className={classnames("category yellow", {
                    "w-condition-invisible": props.hit.hours !== "limited",
                  })}
                >
                  <strong>Limited Hours</strong>
                </p>
                <p
                  className={classnames("category red", {
                    "w-condition-invisible": props.hit.hours !== "online_only",
                  })}
                >
                  <strong>Retail Temporarily Closed</strong>
                </p>
              </div>
              <div className="div-block-3">
                <h2 className="business-name">
                  <Highlight attribute="name" hit={props.hit} tagName="mark" />
                </h2>
                <p className="location">{props.hit.location}</p>
                {props.hit.story && <RichTextHighlight attribute="story" hit={props.hit} />}
              </div>
              <img
                src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd994117d4fbd0e_i.svg"
                alt="Information Icon"
                data-w-id="0149737f-095e-3262-cf45-023fb14261a6"
                className={classnames("info-icon", {
                  "w-condition-invisible": props.hit["special-instructions"],
                })}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              <div
                className="popover"
                style={{
                  display: showTooltip ? "auto" : "none",
                }}
              >
                <p className="special-instructions-paragraph">{props.hit["special-instructions"]}</p>
              </div>
            </div>
            {hasMethods && (
              <div className="support-methods">
                {props.hit["gift-card-link"] && (
                  <a href={props.hit["gift-card-link"]} target="_blank" rel="noopener" className="method gift-card-method w-inline-block">
                    <img
                      src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e8507072b9389f28bb3ea8f_Gift%20Card%20black.svg"
                      alt=""
                      className="icon-image"
                    />
                    <div className="method-text-wrapper">
                      <div className="method-text gc">Buy a Gift Card</div>
                    </div>
                  </a>
                )}
                {props.hit["online-store-link"] && (
                  <a
                    href={props.hit["online-store-link"]}
                    target="_blank"
                    rel="noopener"
                    className="method shop-online-method w-inline-block"
                  >
                    <img
                      src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e850708db1f6e2a6d8bdcc1_order-online%20black.svg"
                      alt=""
                      className="icon-image"
                    />
                    <p className="method-text">Shop Online</p>
                  </a>
                )}
                {props.hit["online-order-link"] && (
                  <a
                    href={props.hit["online-order-link"]}
                    target="_blank"
                    rel="noopener"
                    className="method order-food-method w-inline-block"
                  >
                    <img
                      src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e8507079550ef265edc1c40_Order%20To%20Go%20black.svg"
                      alt=""
                      className="icon-image"
                    />
                    <p className="method-text">Order Food</p>
                  </a>
                )}
                {props.hit["dontations-link"] && (
                  <a href={props.hit["dontations-link"]} target="_blank" rel="noopener" className="method donate-method w-inline-block">
                    <img
                      src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e8508fcf6f6ed08173c5ddb_donate-black%3F.svg"
                      alt=""
                      className="icon-image"
                    />
                    <p className="method-text">Donate Online</p>
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="delivery-options">
            <div className="information-wrap">
              {props.hit["website"] && (
                <div className="website-wrap">
                  <div className="icon-wrapper">
                    <img
                      src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd99487574fbcfc_Website.svg"
                      width="20"
                      alt=""
                    />
                  </div>
                  <div className="info-text-wrapper">
                    <a
                      href={props.hit["website"]}
                      target="_blank"
                      rel="noopener"
                      className="info-link url"
                      style={{ textOverflow: "ellipsis", maxWidth: "225px", whiteSpace: "nowrap", overflow: "hidden" }}
                    >
                      {props.hit["website"]}
                    </a>
                  </div>
                </div>
              )}
              {props.hit["phone-number"] && (
                <div className="website-wrap">
                  <div className="icon-wrapper">
                    <img
                      src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd994d0aa4fbd03_Phone.svg"
                      width="20"
                      alt=""
                    />
                  </div>
                  <div className="info-text-wrapper">
                    <a href={`tel:${props.hit["phone-number"]}`} className="info-link">
                      {props.hit["phone-number"]}
                    </a>
                  </div>
                </div>
              )}
              <div className="website-wrap">
                <div className="icon-wrapper">
                  <img
                    src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd99467364fbcf7_Delivery%20Truck.svg"
                    width="20"
                    alt=""
                  />
                </div>
                <div className="info-text-wrapper app-wrapper">
                  {props.hit["takeout"] && (
                    <span className="info-link app-tile no-pointer">
                      {props.hit.category === "restaurant" ? "Takeout" : "In Store Pickup"}
                    </span>
                  )}
                  {props.hit.delivery && <span className="info-link app-tile no-pointer">Home Delivery</span>}
                  {props.hit.curbside && <span className="info-link app-tile no-pointer">Curbside Pickup</span>}
                </div>
              </div>
              {hasDeliveryApps && (
                <div className="website-wrap">
                  <div className="icon-wrapper">
                    <img
                      src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd9943d5f4fbd05_Phone.svg"
                      width="20"
                      alt=""
                    />
                  </div>
                  <div className="info-text-wrapper app-wrapper">
                    {DeliveryApps.map(
                      ({ key, label }) =>
                        props.hit[key] && (
                          <span key={key} className="info-link app-tile no-pointer">
                            {label}
                          </span>
                        )
                    )}
                  </div>
                </div>
              )}
              <div className="website-wrap socials-wrap">
                {props.hit["twitter-profile"] && (
                  <div className="icon-wrapper">
                    <a href={props.hit["twitter-profile"]} className="w-inline-block" target="_blank" rel="noopener">
                      <img
                        src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7bac53bdd045c2eac6e495_twitter_white.svg"
                        width="20"
                        alt=""
                        className="image-3"
                      />
                    </a>
                  </div>
                )}
                {props.hit["facebook-page"] && (
                  <div className="icon-wrapper">
                    <a href={props.hit["facebook-page"]} className="w-inline-block" target="_blank" rel="noopener">
                      <img
                        src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7bacc673c49866459268aa_facebook.svg"
                        width="20"
                        alt=""
                        className="image-3"
                      />
                    </a>
                  </div>
                )}
                {props.hit["instagram-profile"] && (
                  <div className="icon-wrapper">
                    <a href={props.hit["instagram-profile"]} className="w-inline-block" target="_blank" rel="noopener">
                      <img
                        src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7bad3dd6833502eba9dc9b_instagram.svg"
                        width="20"
                        alt=""
                        className="image-3"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="special-instructions-mobile w-condition-invisible">
            <p className="special-instructions-mobile-paragraph w-dyn-bind-empty"></p>
          </div>
        </div>
      </div>
      <div className="w-embed">
        <input type="hidden" className="jetboost-list-item" value="the-prescott" />
      </div>
    </div>
  );
};
