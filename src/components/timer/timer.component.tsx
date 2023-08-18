import { FC, useState, useEffect } from "react";

import ProgressBar from "../progress-bar/progress-bar.component";
import { useCountdown } from "../../hooks/useCountdown";
import { countdownDisplay } from "../../utils";

import { TFocusItem } from "../../types";

import './timer.modules.css';

// twenty minutes of focus
// five minutes of break
const defaultDuration = 20 * 60; 
const fiveMinutesInSeconds = 5 * 60;

type TTimerProps = {
  show: boolean;
  focusList: TFocusItem[];
  addFocusItem: (itemName: string) => void;
  removeFocusItem: (itemId: number) => void;
};

const Timer:FC<TTimerProps> = ({ show, focusList, addFocusItem, removeFocusItem }) => {
  const [{ countDown, isStarted, isPaused }, { start, pause, reset }] = useCountdown(defaultDuration);
  const currFocusItem = focusList.length > 0 ? focusList[0] : null;
  const nextFocusItem = focusList.length > 1 ? focusList[1] : null;

  useEffect(() => {
    pause();
  }, []);

  const startTimerHandler = () => start();

  const pauseTimerHandler = () => pause();

  const resetTimerHandler = () => {
    reset(defaultDuration, true);
  }

  const addFiveMinutesHandler = () => {
    const newCountdown = isStarted
      ? countDown + fiveMinutesInSeconds
      : defaultDuration + fiveMinutesInSeconds;

    reset(newCountdown, true);
  };

  const minusFiveMinutesHandler = () => {
    const newCountdown = isStarted
      ? countDown - fiveMinutesInSeconds
      : defaultDuration - fiveMinutesInSeconds;

    reset(newCountdown, true);
  };

  const renderStartBtn = () => (
    <button type="button" onClick={startTimerHandler}>
      <i className="fa-solid fa-play" />
    </button>
  );

  const renderPauseBtn = () => (
    <button type="button" onClick={pauseTimerHandler}>
      <i className="fa-solid fa-pause" />
    </button>
  );

  const renderResetBtn = () => (
    <button type="button" onClick={resetTimerHandler}>
      <i className="fa-solid fa-arrows-rotate" />
    </button>
  );

  return (
    <div className={`timer-container ${!show && 'hidden'}`}>
      {currFocusItem && (
        <h4 className="timer-current-focus-item">
          {currFocusItem.name}
        </h4>
      )}
      <ProgressBar
        value={countDown}
        targetValue={defaultDuration}
      >
        <div className="timer-countdown-container">
          {countdownDisplay(countDown)}
        </div>
        {renderStartBtn()}
        {/* {renderPauseBtn()} */}
        {/* {renderResetBtn()}    */}
      </ProgressBar>
      <div className="timer-cta-container">
        <button type="button" onClick={minusFiveMinutesHandler}>
          <i className="fa-solid fa-circle-minus" /> 5
        </button>
        <button type="button" onClick={addFiveMinutesHandler}>
          <i className="fa-solid fa-circle-plus" /> 5
        </button>
      </div>

      {nextFocusItem && (
        <h5 className="timer-next-focus-item">
          {nextFocusItem.name}
        </h5>
      )}
    </div>
  );
}

export default Timer;
