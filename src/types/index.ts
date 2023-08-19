export type TAction = {
  type: string;
  payload?: any;
};

export type TActionTypes = {
  ADD: "ADD";
  UPDATE: "UPDATE";
  DELETE: "DELETE";
  RESET: "RESET";
};

export type TFocusItem = {
  id: number;
  name: string;
  done: boolean;
  start?: number;
  end?: number;
};
