// src/utils/indexedDB.ts
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
        store.createIndex("key", "key"); // Create an index for querying by key
      }
    },
  });
};

// Store a key-value pair
export const setItem = async (key: string, value: any) => {
  const db = await initializeDB();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.put(value, key);
  await tx.done;
};

// Get a value by key
export const getItem = async (key: string) => {
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
  await setItem("theme", "blue");

  const storedTheme = await getItem("theme");
  const storedUserInfo = await getItem("userInfo");

  console.log({ storedTheme });
}
