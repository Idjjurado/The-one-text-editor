import { openDB } from 'idb';

const initdb = async () =>
  openDB('theOneDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('theOneDB')) {
        console.log('theOneDB database already exists');
        return;
      }
      db.createObjectStore('theOneDB', { keyPath: 'id', autoIncrement: true });
      console.log('theOneDB database created');
    },
  });

export const putDb = async (id, content) => {
  console.log('PUT to database');
    const theOnetext = await openDB('theOneDB', 1);
    const tx = theOnetext.transaction('theOneDB', 'readwrite');
    const store = tx.objectStore('theOneDB');
    const request = store.put({ id: id, content: content });
    const result = await request;
    console.log('Your words are now written in the stars', result);
};

export const getDb = async () => {
  console.log('GET from database');
    const theOnetext = await openDB('theOneDB', 1);
    const tx = theOnetext.transaction('theOneDB', 'readonly');
    const store = tx.objectStore('theOneDB');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb();
