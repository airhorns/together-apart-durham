import React from "react";
import { Hit } from "react-instantsearch-core";
import { Highlight } from "react-instantsearch-dom";
import { BusinessDoc } from "../BusinessDoc";
import { useStyletron } from "baseui";
import { Heading } from "baseui/heading";
import { CallToActionButton } from "./CallToActionButton";

export const BusinessCardHeader = (props: {
  hit: Hit<BusinessDoc>;
  isExpanded: boolean;
  toggleExpanded: () => void;
  highlight: boolean;
}) => {
  const [css, $theme] = useStyletron();
  const hasCallsToAction =
    props.hit["gift-card-link"] ||
    props.hit["online-store-link"] ||
    props.hit["online-order-link"] ||
    props.hit["order-groceries-link"] ||
    props.hit["donations-link"];
  return (
    <>
      <div className={css({ position: "relative" })}>
        <p className={css({ textTransform: "uppercase", marginRight: "0px", marginBottom: "0px" })}>
          {props.hit.category ? props.hit.category[0] : "Uncategorized"}
        </p>
        <Heading
          $style={{
            marginTop: $theme.sizing.scale200,
            marginBottom: $theme.sizing.scale200,
            letterSpacing: ($theme.typography.font1050 as any).letterSpacing,
            ":hover": props.isExpanded ? undefined : { textDecoration: "underline" },
          }}
        >
          {props.highlight ? <Highlight attribute="name" hit={props.hit} tagName="mark" /> : props.hit.name}
        </Heading>
        <p className={css({ color: $theme.colors.mono100 })}>{props.hit.location}</p>
        {hasCallsToAction && (
          <div
            className={css({
              display: "flex",
              marginTop: $theme.sizing.scale600,
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "wrap",
            })}
          >
            {props.hit["gift-card-link"] && (
              <CallToActionButton
                name="gift-card"
                href={props.hit["gift-card-link"]}
                icon={require("../../../assets/images/Gift-Card-black.svg")}
              >
                Buy a Gift Card
              </CallToActionButton>
            )}
            {props.hit["online-store-link"] && (
              <CallToActionButton
                name="online-store"
                href={props.hit["online-store-link"]}
                icon={require("../../../assets/images/order-online-black.svg")}
              >
                Shop Online
              </CallToActionButton>
            )}
            {props.hit["online-order-link"] && (
              <CallToActionButton
                name="order-food-online"
                href={props.hit["online-order-link"]}
                icon={require("../../../assets/images/Order-To-Go-black.svg")}
              >
                Order Food
              </CallToActionButton>
            )}
            {props.hit["order-groceries-link"] && (
              <CallToActionButton
                name="order-groceries-online"
                href={props.hit["order-groceries-link"]}
                icon={require("../../../assets/images/cart.svg")}
              >
                Order Groceries
              </CallToActionButton>
            )}
            {props.hit["donations-link"] && (
              <CallToActionButton
                name="donate"
                href={props.hit["donations-link"]}
                icon={require("../../../assets/images/donate-black.svg")}
              >
                Donate Online
              </CallToActionButton>
            )}
            {!props.isExpanded && (
              <a
                href={`/businesses/${props.hit.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  props.toggleExpanded();
                }}
                className={css({
                  marginTop: $theme.sizing.scale700,
                  textAlign: "center",
                  textDecoration: "none",
                  ":hover": { textDecoration: "underline" },
                })}
              >
                More info
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
};
