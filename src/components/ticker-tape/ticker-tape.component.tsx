import { FC } from "react";

import { useCountdown } from "../../hooks/useCountdown";
import { countdownDisplay } from "../../utils";

import { TFocusItem } from "../../types";

import "./ticket-tape.modules.css";

type TTickerTapeProps = {
  focusItem?: TFocusItem;
};

const TickerTape:FC<TTickerTapeProps> = ({ focusItem }) => {
  const [{ countDown }] = useCountdown(20);
  return (
    <div className="ticker-tape-container">
      <p>
        <span className="ticker-tape-focus-item-name">{focusItem?.name}</span>
        <span className="ticker-tape-focus-item-countdown">{countdownDisplay(countDown)}</span>
      </p>
    </div>
  );
};

export default TickerTape;
