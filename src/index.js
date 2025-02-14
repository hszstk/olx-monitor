import cron from 'node-cron';

import config from '#config.js';
import { initializeCycleTLS } from '#components/CycleTls.js';
import $logger from '#components/Logger.js';
import { scraper } from '#components/Scraper.js';
import { createTables } from '#database/database.js';

const { searches } = config;
let searchsArray = [];
for (const [key, search] of Object.entries(searches)) {
  const _searchsArray = search.searchTerms.reduce((accumulator, currentValue) => {
    const test = config.baseUrls.map((baseUrl) => baseUrl + currentValue);
    return [...accumulator, ...test];
  }, []);

  searchsArray.push({
    key,
    messageThreadId: search.messageThreadId,
    urls: _searchsArray,
  });
}

const runScraper = async () => {
  for (const [, currentSearch] of Object.entries(searchsArray)) {
    try {
      $logger.info(
        `Starting to search: ${currentSearch.key} with ${currentSearch.urls.length} URLs`,
      );

      currentSearch.urls.forEach((url) => {
        $logger.info(`${currentSearch.messageThreadId}: ${url}`);
        scraper({
          url,
          telegramThreadId: currentSearch.messageThreadId,
        });
      });
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
