import { initLocalStorage, containsKey, storeData, getData } from "./storage";
import { localStorageKey, dataKeys } from "../constants";

export const initCountdown = async () => {
  const localStorageData = await containsKey(localStorageKey);

  if (!localStorageData) {
    await initLocalStorage();
    return true;
  }

  return false;
};

export const storeCountdown = async (countdown: number) => {
  const localStorageData = await getData(localStorageKey);
  const newLocalStorageData = {
    ...localStorageData,
    [dataKeys.Countdown]: countdown,
  };
  await storeData(localStorageKey, newLocalStorageData);
};

export const getCountdown = async (): Promise<number> => {
  const localStorageData = await getData(localStorageKey);
  return localStorageData.Countdown;
};