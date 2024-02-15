import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
	// connection to the database
	const jateDb = await openDB("jate", 1);
	// new transaction 
	const tx = jateDb.transaction("jate", "readwrite");
	// object store
	const store = tx.objectStore("jate");
	// .put() method to update data 
	const request = store.put({ id: 1, value: content });
	// confirmation of the request
	const result = await request;
	console.log("content added", result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");
	// connection to the database
	const jateDb = await openDB("jate", 1);
	// new transaction 
	const tx = jateDb.transaction("jate", "readonly");
	// object store
	const store = tx.objectStore("jate");
	// .get() method to get the one text editor entry from the database
	const request = store.get(1);
	// confirmation of the request
	const result = await request;
	// text editor entry return
	result
		? console.log("data retrieved", result.value)
		: console.log("data not found");
	return result?.value;
};

initdb();
