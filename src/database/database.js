import path from 'path';
import Database from 'better-sqlite3';
import config from '#config.js';

const db = new Database(path.join(import.meta.dirname, '../', config.dbFile), {
  verbose: console.log,
});
db.pragma('journal_mode = WAL');

const createTables = () => {
  // Define separate SQL statements for each table creation
  const queries = [
    `
    CREATE TABLE IF NOT EXISTS "ads" (
        "id"            INTEGER NOT NULL UNIQUE,
        "searchTerm"    TEXT NOT NULL,
        "title"	        TEXT NOT NULL,
        "price"         INTEGER NOT NULL,
        "url"           TEXT NOT NULL,
        "created"       TEXT NOT NULL,
        "lastUpdate"    TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS "logs" (
        "id"            INTEGER NOT NULL UNIQUE,
        "url"           TEXT NOT NULL,  
        "adsFound"      INTEGER NOT NULL, 
        "minPrice"      NUMERIC NOT NULL,
        "maxPrice"      NUMERIC NOT NULL, 
        "created"       TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    );`,
  ];

  const executeQuery = (index) => {
    if (index === queries.length) {
      return true; // All queries have been executed
    }

    try {
      db.prepare(queries[index]).run();
      // Execute the next query in the array
      executeQuery(index + 1);
    } catch (error) {
      return error;
    }
  };

  // Start executing the queries from index 0
  executeQuery(0);
};

export { db, createTables };
