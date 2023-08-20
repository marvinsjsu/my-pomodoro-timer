import { useState, useEffect } from "react";

import { initLocalStorage } from "../utils/storage";
import { getFocusItems } from "../utils/focus-item";
import { getCountdown } from "../utils/countdown";
import { defaultDuration } from "../constants";

import { TFocusItem } from "../types";

export default function useCachedData(): [boolean, TFocusItem[], number] {
  const [ isLoadingDone, setIsLoadingDone ] = useState<boolean>(false);
  const [ focusItems, setFocusItems ] = useState<TFocusItem[]>([]);
  const [ countdown, setCountdown ] = useState<number>(defaultDuration);

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        await initLocalStorage();
      } catch(error) {
        console.warn(error);
      } finally {
        const focusItems = await getFocusItems();
        const countdown = await getCountdown();
        setFocusItems(focusItems);
        setCountdown(countdown);
        setIsLoadingDone(true);
      }
    }

    loadResourcesAndData();
  }, []);

  return [isLoadingDone, focusItems, countdown];
}

