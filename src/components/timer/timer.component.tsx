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
const minDuration = fiveMinutesInSeconds * 2;
const maxDuration = fiveMinutesInSeconds * 5;
const maxBreaktime = fiveMinutesInSeconds * 6;

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
  const [finishedFocusMoments, setFinishedFocusMoments] = useState<number>(0);
  const [isBreaktime, setIsBreaktime] = useState<boolean>(false);
  
  const minusBtnIsDisabled = (countDown < minDuration) || isBreaktime;
  const addBtnIsDisabled = (currDuration > maxDuration) || isBreaktime;

  console.log({ countDown, isStarted, isPaused, hasEnded });

  useEffect(() => {
    pause();
  }, []);

  useEffect(() => {
    if (isStarted && countDown === -1) {
      if (!isBreaktime) {
        setFinishedFocusMoments(finishedFocusMoments + 1);
        setCurrDuration(fiveMinutesInSeconds);
        reset(fiveMinutesInSeconds, true);
      } else {
        if (finishedFocusMoments === 4) {
          setFinishedFocusMoments(0);
          setCurrDuration(maxBreaktime);
          reset(maxBreaktime, true);
        } else {
          setCurrDuration(defaultDuration);
          reset(defaultDuration, true);
        }
      }
      setIsBreaktime(!isBreaktime);
    }
  }, [countDown, isBreaktime, isStarted, reset, finishedFocusMoments]);

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
    <button type="button" onClick={pauseTimerHandler} disabled={isBreaktime}>
      <i className="fa-solid fa-pause" />
    </button>
  );

  return (
    <div className={`timer-container ${!show && 'hidden'}`}>
      <div className="timer-focus-item-container">
        {isBreaktime && (
            <h4 className="timer-current-focus-item breaktime">
              Let's take a break!
            </h4>
        )}
        {currFocusItem && !isBreaktime && (
          <>
            <h4 className="timer-current-focus-item">
              {currFocusItem.name}
            </h4>
            <button type="button" onClick={doneTaskHandler}>
              <i className="fa-regular fa-circle-check" />
            </button>          
          </> 
        )}
      </div>
      <ProgressBar
        value={countDown}
        targetValue={currDuration}
        color={isBreaktime ? "#981eb7" : undefined}
      >
        <div className="timer-countdown-container">
          {countdownDisplay(countDown)}
        </div>
        {isPaused ? renderStartBtn() : renderPauseBtn()}
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
