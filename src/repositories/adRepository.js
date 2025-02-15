import { db } from '#database/database.js';
import $logger from '#components/Logger.js';

const getAd = async (id) => {
  $logger.debug('adRepositorie: getAd');

  const query = `SELECT * FROM ads WHERE id = ?`;
  const values = [id];

  return new Promise(function (resolve, reject) {
    try {
      const row = db.prepare(query).get(values);
      if (!row) {
        reject('No ad with this ID was found');
        return;
      }

      resolve(row);
    } catch (error) {
      reject(error);
    }
  });
};

const getAdsBySearchTerm = async (term, limit) => {
  $logger.debug('adRepositorie: getAd');

  const query = `SELECT * FROM ads WHERE searchTerm = ? LIMIT ?`;
  const values = [term, limit];

  return new Promise(function (resolve, reject) {
    try {
      const rows = db.prepare(query).all(values);
      if (!rows) {
        reject('No ad with this term was found');
        return;
      }

      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};

const getAdsBySearchId = async (id, limit) => {
  $logger.debug('adRepositorie: getAd');

  const query = `SELECT * FROM ads WHERE searchId = ? LIMIT ?`;
  const values = [id, limit];

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

const createAd = async (ad) => {
  $logger.debug('adRepositorie: createAd');

  const query = `
        INSERT INTO ads( id, url, title, searchTerm, price, created, lastUpdate )
        VALUES( ?, ?, ?, ?, ?, ?, ? )
    `;

  const now = new Date().toISOString();

  const values = [ad.id, ad.url, ad.title, ad.searchTerm, ad.price, now, now];

  return new Promise(function (resolve, reject) {
    try {
      const rows = db.prepare(query).run(values);

      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};

const updateAd = async (ad) => {
  $logger.debug('adRepositorie: updateAd');

  const query = `UPDATE ads SET price = ?, lastUpdate = ?  WHERE id = ?`;
  const values = [ad.price, new Date().toISOString(), ad.id];

  return new Promise(function (resolve, reject) {
    try {
      const rows = db.prepare(query).run(values);

      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};

export { getAd, getAdsBySearchTerm, getAdsBySearchId, createAd, updateAd };
