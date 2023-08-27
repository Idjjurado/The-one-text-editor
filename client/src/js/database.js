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

export const putDb = async (id, textentry) => {
  console.log('PUT to database');
  try {
    const theOnetext = await openDB('theOneDB', 1);
    const tx = theOnetext.transaction('theOneDB', 'readwrite');
    const store = tx.objectStore('theOneDB');
    const request = store.add({ id: id, textentry: textentry });
    const result = await request;
    console.log('Your words are now written in the stars', result);
  } catch (error) {
    console.error('Error putting data into database:', error);
  }
};

export const getDb = async () => {
  console.log('GET from database');
  try {
    const theOnetext = await openDB('theOneDB', 1);
    const tx = theOnetext.transaction('theOneDB', 'readonly');
    const store = tx.objectStore('theOneDB');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (error) {
    console.error('Error getting data from database:', error);
    return [];
  }
};

initdb();
