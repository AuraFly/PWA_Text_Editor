import { openDB } from "idb";

const initdb = async () =>
  openDB("atom", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("atom")) {
        console.log("atom database already exists");
        return;
      }
      db.createObjectStore("atom", { keyPath: "id", autoIncrement: true });
      console.log("atom database created");
    },
  });

// Borrowed from activity 24, but to explain this, this is creating a connection to the DB, creating a new transaction (work performed by the sys to the DB),
// opening a defined objectstore, and lastly implementing the transaction which is a put/update action
export const putDb = async (content) => {
  console.log("PUT to the database");
  const atomDb = await openDB("atom", 1);
  const tx = atomDb.transaction("atom", "readwrite");
  const store = tx.objectStore("atom");
  const request = store.put({ id: 1, value: content });
  const result = await request;
};

// Borrowed from activity 24, but to explain this, this is creating a connection to the DB, creating a new transaction (work performed by the sys to the DB),
// opening a defined objectstore, and lastly implementing the transaction which is a get action
export const getDb = async () => {
  console.log("GET all content from the database");
  const atomDb = await openDB("atom", 1);
  const tx = atomDb.transaction("atom", "readonly");
  const store = tx.objectStore("atom");
  const request = store.get(1);
  const result = await request;
  return result?.value;
};

initdb();
