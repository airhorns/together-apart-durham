import React from "react";
import { Hit } from "react-instantsearch-core";
import { Highlight } from "react-instantsearch-dom";
import { BusinessDoc } from "../BusinessDoc";
import { useStyletron } from "baseui";
import { Heading } from "baseui/heading";

export const BusinessCardHeader = (props: {
  hit: Hit<BusinessDoc>;
  isSelected: boolean;
  toggleSelected: () => void;
  highlight: boolean;
}) => {
  const [css, $theme] = useStyletron();

  return (
    <>
      <div className="name-and-category">
        <div className="basic-info-wrap">
          <p className="category">{props.hit.category ? props.hit.category[0] : "Uncategorized"}</p>
        </div>
        <div>
          <Heading
            $style={{
              marginTop: $theme.sizing.scale200,
              marginBottom: $theme.sizing.scale200,
              ":hover": props.isSelected ? undefined : { textDecoration: "underline" },
            }}
          >
            {props.highlight ? <Highlight attribute="name" hit={props.hit} tagName="mark" /> : props.hit.name}
          </Heading>
          <p className={css({ color: $theme.colors.mono100 })}>{props.hit.location}</p>
        </div>
      </div>
      <div className="support-methods">
        {props.hit["gift-card-link"] && (
          <a href={props.hit["gift-card-link"]} target="_blank" rel="noopener" className="method gift-card-method w-inline-block">
            <img
              src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e8507072b9389f28bb3ea8f_Gift%20Card%20black.svg"
              alt=""
              className="icon-image"
            />
            <div className="method-text-wrapper">
              <div className="method-text">Buy a Gift Card</div>
            </div>
          </a>
        )}
        {props.hit["online-store-link"] && (
          <a href={props.hit["online-store-link"]} target="_blank" rel="noopener" className="method shop-online-method w-inline-block">
            <img
              src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e850708db1f6e2a6d8bdcc1_order-online%20black.svg"
              alt=""
              className="icon-image"
            />
            <p className="method-text">Shop Online</p>
          </a>
        )}
        {props.hit["online-order-link"] && (
          <a href={props.hit["online-order-link"]} target="_blank" rel="noopener" className="method order-food-method w-inline-block">
            <img
              src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e8507079550ef265edc1c40_Order%20To%20Go%20black.svg"
              alt=""
              className="icon-image"
            />
            <p className="method-text">Order Food</p>
          </a>
        )}
        {props.hit["order-groceries-link"] && (
          <a
            href={props.hit["order-groceries-link"]}
            target="_blank"
            rel="noopener"
            className="method order-groceries-method w-inline-block"
          >
            <img src={require("../../../assets/images/cart.svg")} alt="cart" className="icon-image" />
            <p className="method-text">Order Groceries</p>
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
        {!props.isSelected && (
          <a
            href={`/businesses/${props.hit.slug}`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              props.toggleSelected();
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
    </>
  );
};
