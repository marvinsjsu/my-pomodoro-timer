
import FocusListActionType from "../actions/focus-list";

import { TFocusItem, TAction } from "../types";

export const initialFocusItems: TFocusItem[] = [];

const reducer= (state = initialFocusItems, action: TAction) => {
  switch (action.type) {
    case FocusListActionType.ADD: {
      return [
        ...state,
        action.payload,
      ];
    }
    case FocusListActionType.UPDATE: {
      return state.map(focusItem => focusItem.id === action.payload.id
        ? action.payload
        : focusItem);
    }
    case FocusListActionType.DELETE: {
      return state.filter(focusItem => focusItem.id !== action.payload.id);
    }
    case FocusListActionType.RESET: {
      return initialFocusItems;
    }
    default:
      return state;
  }
};

export default reducer;
