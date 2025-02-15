import { db } from '#database/database.js';
import $logger from '#components/Logger.js';

const saveLog = async (data) => {
  $logger.debug('scrapperRepository: saveLog');

  const query = `
        INSERT INTO logs(  url, adsFound, minPrice, maxPrice, created )
        VALUES( ?, ?, ?, ?, ? )
    `;

  const now = new Date().toISOString();

  const values = [data.url, data.adsFound, data.minPrice, data.maxPrice, now];

  return new Promise(function (resolve, reject) {
    try {
      const rows = db.prepare(query).run(values);
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};

const getLogsByUrl = async (url, limit) => {
  $logger.debug('scrapperRepository: getLogsByUrld');

  const query = `SELECT * FROM logs WHERE url = ? LIMIT ?`;
  const values = [url, limit];

  return new Promise(function (resolve, reject) {
    try {
      const rows = db.prepare(query).all(values);
      if (!rows) {
        reject('No ad with this id was found');
        return;
      }

      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};

export { saveLog, getLogsByUrl };
