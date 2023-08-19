import { useState, useEffect } from "react";

import { initLocalStorage } from "../utils/storage";
import { getFocusItems } from "../utils/focus-item";

import { TFocusItem } from "../types";

export default function useCachedData(): [boolean, TFocusItem[]] {
  const [ isLoadingDone, setIsLoadingDone ] = useState<boolean>(false);
  const [ focusItems, setFocusItems ] = useState<TFocusItem[]>([]);

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        await initLocalStorage();
      } catch(error) {
        console.warn(error);
      } finally {
        const focusItems = await getFocusItems();
        setFocusItems(focusItems);
        setIsLoadingDone(true);
      }
    }

    loadResourcesAndData();
  }, []);

  return [isLoadingDone, focusItems];
}

