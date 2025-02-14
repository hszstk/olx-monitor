import cron from 'node-cron';
import '@dotenvx/dotenvx/config';

import config from '#config.js';
import { initializeCycleTLS } from '#components/CycleTls.js';
import $logger from '#components/Logger.js';
import { scraper } from '#components/Scraper.js';
import { createTables } from '#database/database.js';

const runScraper = async () => {
  const searchsArray = config.searchTerms.reduce((accumulator, currentValue) => {
    const test = config.baseUrls.map((baseUrl) => baseUrl + currentValue);
    return [...accumulator, ...test];
  }, []);

  // for (const [key, value] of Object.entries(object1)) {
  //   console.log(`${key}: ${value}`);
  // }

  // const test = config.searches;

  console.log(searchsArray);

  for (let i = 0; i < searchsArray.length; i++) {
    try {
      scraper(searchsArray[i]);
    } catch (error) {
      $logger.error(error);
    }
  }
};

const main = async () => {
  $logger.info('Program started');
  await createTables();
  await initializeCycleTLS();
  runScraper();
};

main();

cron.schedule(config.interval, () => {
  runScraper();
});
