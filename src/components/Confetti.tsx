import React from "react";
import Confetti from "react-confetti";

export default (props: { numberOfPieces?: number }) => {
  return <Confetti numberOfPieces={props.numberOfPieces || 200} recycle={false} />;
};
