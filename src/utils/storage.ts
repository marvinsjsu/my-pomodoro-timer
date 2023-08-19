import store from "store2";

export const storeData = async (key: string, data: any) => {
  try {
    await store(key, data);
  } catch(error) {
    console.error('Error storing data in localStorage - ', error);
  }
};

export const getData = async (key: string) => {
  try {
    const data = await store(key);
    return data;
  } catch(error) {
    console.error('Error retrieving data from localStorage - ', error);
  }
};

export const removeData = async () => {
  try {
    const data = await store(false);
    return data;
  } catch(error) {
    console.error('Error deleting data from localStorage - ', error);
  }
};
