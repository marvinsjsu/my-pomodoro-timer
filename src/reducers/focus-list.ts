
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
    case FocusListActionType.DELETE: {
      return state.filter(focusItem => focusItem.id !== action.payload.id);
    }
    default:
      return state;
  }
};

export default reducer;
