import { FC } from "react";

import { countdownDisplay } from "../../utils";

import { TFocusItem } from "../../types";

import "./ticket-tape.modules.css";

type TTickerTapeProps = {
  focusItem?: TFocusItem;
  countdown: number;
};

const TickerTape:FC<TTickerTapeProps> = ({ focusItem, countdown }) => {
  return (
    <div className="ticker-tape-container">
      <p>
        <span className="ticker-tape-focus-item-name">{focusItem?.name}</span>
        <span className="ticker-tape-focus-item-countdown">{countdownDisplay(countdown)}</span>
      </p>
    </div>
  );
};

export default TickerTape;
