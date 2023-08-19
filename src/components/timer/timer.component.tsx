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
const maxDuration = fiveMinutesInSeconds * 5;

type TTimerProps = {
  show: boolean;
  focusList: TFocusItem[];
  addFocusItem: (itemName: string) => void;
  removeFocusItem: (itemId: number) => void;
  updateFocusItem: (focusItem: TFocusItem) => void;
};

const Timer:FC<TTimerProps> = ({ show, focusList, addFocusItem, updateFocusItem, removeFocusItem }) => {
  const [{ countDown, isStarted, isPaused, hasEnded }, { start, pause, reset }] = useCountdown(defaultDuration);
  const [currDuration, setCurrDuration] = useState<number>(defaultDuration);
  const currFocusItem = focusList.length > 0 ? focusList.filter(fl => !fl.done)[0] : null;
  const nextFocusItem = focusList.length > 1 ? focusList.filter(fl => !fl.done)[1] : null;
  
  const minusBtnIsDisabled = countDown < fiveMinutesInSeconds;
  const addBtnIsDisabled = currDuration > maxDuration;

  useEffect(() => {
    pause();
  }, []);

  const startTimerHandler = () => {
    if (currFocusItem) {
      currFocusItem.start = Date.now();
    }
    start();
  };

  const pauseTimerHandler = () => pause();

  const resetTimerHandler = () => {
    reset(defaultDuration, true);
  }

  const addFiveMinutesHandler = () => {
    const newCountdown = isStarted
      ? countDown + fiveMinutesInSeconds
      : defaultDuration + fiveMinutesInSeconds;

    const newCurrDuration = currDuration + fiveMinutesInSeconds;
    setCurrDuration(newCurrDuration);
    reset(newCountdown, true);
  };

  const minusFiveMinutesHandler = () => {
    const newCountdown = isStarted
      ? countDown - fiveMinutesInSeconds
      : defaultDuration - fiveMinutesInSeconds;

    const newCurrDuration = currDuration - fiveMinutesInSeconds;
    setCurrDuration(newCurrDuration);
    reset(newCountdown, true);
  };

  const doneTaskHandler = () => {
    console.log('doneTaskHandler: ', { currFocusItem });
    if (currFocusItem) {
      currFocusItem.end = Date.now();
      currFocusItem.done = true;
      updateFocusItem(currFocusItem);
    }
  }

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
        <>
          <h4 className="timer-current-focus-item">
            {currFocusItem.name}
          </h4>
          <button type="button" onClick={doneTaskHandler}>
            done
          </button>
        </>
      )}
      <ProgressBar
        value={countDown}
        targetValue={currDuration}
      >
        <div className="timer-countdown-container">
          {countdownDisplay(countDown)}
        </div>
        {renderStartBtn()}
        {/* {renderPauseBtn()} */}
        {/* {renderResetBtn()}    */}
      </ProgressBar>
      <div className="timer-cta-container">
        <button
          type="button"
          disabled={minusBtnIsDisabled}
          onClick={minusFiveMinutesHandler}
        >
          <i className="fa-solid fa-circle-minus" /> 5
        </button>
        <button
          type="button"
          disabled={addBtnIsDisabled}
          onClick={addFiveMinutesHandler}
        >
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
