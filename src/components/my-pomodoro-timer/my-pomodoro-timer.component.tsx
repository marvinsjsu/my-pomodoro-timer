import { FC, useState, useEffect, useReducer } from "react";

import Timer from "../timer/timer.component";
import FocusList from "../focus-list/focus-list.component";
import focusListActionType from "../../actions/focus-list";
import TickerTape from "../ticker-tape/ticker-tape.component";
import focusListReducer from "../../reducers/focus-list";
import { saveFocusItem, removeFocusItem, updateFocusItem, resetFocusItems } from "../../utils/focus-item";

import { TFocusItem } from "../../types";

import './my-pomodoro-timer.modules.css';

type TMyPomodoroTimerProps = {
  initialFocusItems: TFocusItem[];
};

const MyPomodoroTimer:FC<TMyPomodoroTimerProps> = ({ initialFocusItems }) => {
  const [focusList, dispatch] = useReducer(focusListReducer, initialFocusItems);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [hideAll, setHideAll] = useState<boolean>(false);
  const currFocusItem = focusList[0];

  const toggleDisplayHandler = () => {
    setShowTimer(!showTimer);
  };

  const toggleHideAllHandler = () => {
    setHideAll(!hideAll);
  };

  const addFocusItemHandler = async (itemName: string) => {
    const newFocusItem = {
      id: Date.now(),
      name: itemName,
      done: false,
    };

    dispatch({
      type: focusListActionType.ADD,
      payload: newFocusItem,
    });
    saveFocusItem(newFocusItem);
  };

  const removeFocusItemHandler = (itemId: number) => {
    dispatch({
      type: focusListActionType.DELETE,
      payload: { id: itemId },
    });
    removeFocusItem(itemId);
  };

  const updateFocusItemHandler = (focusItem: TFocusItem) => {
    dispatch({
      type: focusListActionType.UPDATE,
      payload: focusItem,
    });
    updateFocusItem(focusItem);
  };

  const resetFocusListHandler = () => {
    dispatch({
      type: focusListActionType.RESET,
    });
    resetFocusItems();
  };

  const renderToggleUIDisplay = () => {
    return !hideAll && (
      <button
        type="button"
        onClick={toggleDisplayHandler}
      >
        {showTimer 
          ? <i className="fa-solid fa-list-ul" />
          : <i className="fa-solid fa-clock" />
        }
      </button>
    );
  }

  useEffect(() => {
    if (hideAll) {
      document.body.style.height = "40px";
    } else {
      document.body.style.height = "300px";
    }
  }, [hideAll]);

  return (
    <div className="my-pomodoro-timer-container">
      <div className="app-cta-container">
        {hideAll && (<TickerTape focusItem={currFocusItem} />)}
        {renderToggleUIDisplay()}
        <button
          type="button"
          onClick={toggleHideAllHandler}
        >
          {hideAll 
            ? <i className="fa-solid fa-eye" />
            : <i className="fa-solid fa-eye-slash" />
          }
        </button>
      </div>
      <div className={`app-ui-container ${hideAll && 'hidden'}`}>
        <Timer
          show={showTimer}
          focusList={focusList}
          addFocusItem={addFocusItemHandler}
          updateFocusItem={updateFocusItemHandler}
          removeFocusItem={removeFocusItemHandler}
        />
        <FocusList
          show={!showTimer}
          focusList={focusList}
          addFocusItem={addFocusItemHandler}
          resetFocusList={resetFocusListHandler}
          removeFocusItem={removeFocusItemHandler}
        />
      </div>
    </div>
  );
};

export default MyPomodoroTimer;
