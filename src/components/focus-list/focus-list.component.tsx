import { FC, useState } from "react";

import Quote from "../quote/quote.component";

import { TFocusItem } from '../../types';

import './focus-list.modules.css';

const MAX_FOCUS_ITEM_COUNT = 5;

type TFocusListProps = {
  show: boolean;
  focusList: TFocusItem[];
  addFocusItem: (itemName: string) => void;
  removeFocusItem: (itemId: number) => void;
};

const FocusList:FC<TFocusListProps> = ({ show, focusList, addFocusItem, removeFocusItem }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const showInputField = focusList.length < MAX_FOCUS_ITEM_COUNT;

  const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setInputVal(evt.target.value);
  }

  const inputKeyDownHandler = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    if (evt.key === 'Enter') {
      addFocusItemHandler();
    }
  }

  const addFocusItemHandler = () => {
    if (inputVal.length) {
      addFocusItem(inputVal.trim());
      setInputVal('');
    }
  }

  const removeFocusItemHandler = (focusItemId: number) => {
    removeFocusItem(focusItemId);
  }

  return (
    <div className={`focus-list-container ${!show && 'hidden'}`}>
      <ul className="focus-list">
        {focusList.length === 0 && (
          <div className="focus-list-empty">
            <Quote />
          </div>
        )}
        {focusList.map(focusItem => (
          <li key={focusItem.id}>
            <span className="focus-list-item-name">
              {focusItem.name}
            </span>
            <button
              type="button"
              onClick={() => removeFocusItemHandler(focusItem.id)}
            >
              <i className="fa-solid fa-circle-minus" />
            </button>
          </li>
        ))}
      </ul>
      {showInputField && (
        <div className="focus-list-input-container">
          <input
            type="text"
            value={inputVal}
            onChange={inputChangeHandler}
            onKeyDown={inputKeyDownHandler}
          />
          <button
            type="button"
            onClick={addFocusItemHandler}
          >
            <i className="fa-solid fa-plus" />
          </button>
        </div>  
      )}        
    </div>
  );
};

export default FocusList;
