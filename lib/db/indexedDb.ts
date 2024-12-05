import { openDB } from "idb";

const DB_NAME = "appDatabase";
const DB_VERSION = 1;

// Define the object store and its schema
const OBJECT_STORE_NAME = "vdata";

const initializeDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        const store = db.createObjectStore(OBJECT_STORE_NAME);
        store.createIndex("key", "key");
      }
    },
  });
};

// Store a key-value pair
export const storeItem = async (key: string, value: any) => {
  const db = await initializeDB();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  const store = tx.objectStore(OBJECT_STORE_NAME);
  console.log(value, 'yxjlkfsdlkfds')
  await store.put(value, key);
  await tx.done;
};

// Get a value by key
export const getStorageItem = async (key: string) => {
  const db = await initializeDB();
  const tx = db.transaction(OBJECT_STORE_NAME, "readonly");
  const store = tx.objectStore(OBJECT_STORE_NAME);
  const value = await store.get(key);
  await tx.done;
  return value;
};

// Delete a value by key
export const removeItem = async (key: string) => {
  const db = await initializeDB();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.delete(key);
  await tx.done;
};

export async function initIDB() {
  // Initialize the database
  await storeItem("theme", "blue");

  const storedTheme = await getStorageItem("theme");
  const storedUserInfo = await getStorageItem("userInfo");

  console.log({ storedUserInfo });
}
