
import { initLocalStorage, containsKey, storeData, getData } from "./storage";
import { localStorageKey, dataKeys } from "../constants";

import { TFocusItem } from "../types";

export const initFocusItems = async (): Promise<Boolean> => {
  const localStorageData = await containsKey(localStorageKey);

  if (!localStorageData) {
    await initLocalStorage();
    return true;
  }

  return false;
};

export const getFocusItems = async (): Promise<TFocusItem[]> => {
  const localStorageData = await getData(localStorageKey);
  console.log({ localStorageData });
  return localStorageData.FocusItems;
};

export const storeFocusItems = async (focusItems: TFocusItem[]) => {
  const localStorageData = await getData(localStorageKey);
  localStorageData[dataKeys.FocusItems] = focusItems;
  const newLocalStorageData = {
    ...localStorageData,
    [dataKeys.FocusItems]: focusItems,
  };
  await storeData(localStorageKey, newLocalStorageData);
};

export const saveFocusItem = async (newFocusItem: TFocusItem) => {
  const focusItems = await getFocusItems();
  const newFocusItems = focusItems.concat(newFocusItem);
  await storeFocusItems(newFocusItems);
};

export const removeFocusItem = async (focusItemId: number) => {
  const focusItems = await getFocusItems();
  const newFocusItems = focusItems.filter(focusItem => focusItem.id !== focusItemId);
  await storeFocusItems(newFocusItems);
};

export const updateFocusItem = async (updatedFocusItem: TFocusItem) => {
  const focusItems = await getFocusItems();
  const newFocusItems = focusItems.map(focusItem => focusItem.id === updatedFocusItem.id
    ? updatedFocusItem
    : focusItem
  );
  await storeFocusItems(newFocusItems);
};
