export type TAction = {
  type: string;
  payload?: any;
};

export type TActionTypes = {
  ADD: "ADD";
  DELETE: "DELETE";
};

export type TFocusItem = {
  id: number;
  name: string;
};
