import * as cheerio from 'cheerio';
import $logger from '#components/Logger.js';
import $httpClient from '#components/HttpClient.js';
import * as scraperRepository from '#repositories/scrapperRepository.js';

import Ad from '#components/Ad.js';

let page = 1;
let maxPrice = 0;
let minPrice = 99999999;
let validAds = 0;
let adsFound = 0;
let nextPage = true;

const scraper = async (url) => {
  page = 1;
  maxPrice = 0;
  minPrice = 99999999;
  adsFound = 0;
  validAds = 0;
  nextPage = true;

  const parsedUrl = new URL(url);
  const searchTerm = parsedUrl.searchParams.get('q') || '';
  const notify = await urlAlreadySearched(url);
  $logger.info(`Will notify: ${notify}`);

  const currentUrl = setUrlParam(url, 'o', page);
  try {
    const response = await $httpClient(currentUrl);
    const $ = cheerio.load(response);
    nextPage = await scrapePage($, searchTerm, notify, url);
  } catch (error) {
    $logger.error(error);
    return;
  }

  $logger.info('Page: ' + page);
  $logger.info('NextPage: ' + nextPage);
  $logger.info('Valid ads: ' + validAds);

  if (validAds) {
    const scrapperLog = {
      url,
      adsFound: validAds,
      minPrice,
      maxPrice,
    };

    await scraperRepository.saveLog(scrapperLog);
  }
};

const scrapePage = async ($, searchTerm, notify) => {
  try {
    const script = $('script[id="__NEXT_DATA__"]').text();

    if (!script) {
      $logger.info('__NEXT_DATA__ Script not found when scrapping page');
      return false;
    }

    const adList = JSON.parse(script).props.pageProps.ads;

    if (!Array.isArray(adList) || !adList.length) {
      $logger.info('adList is invalid');
      return false;
    }

    adsFound += adList.length;

    $logger.info(`Checking new ads for: ${searchTerm}`);
    $logger.info('Ads found: ' + adsFound);

    for (let i = 0; i < adList.length; i++) {
      $logger.debug('Checking ad: ' + (i + 1));

      const advert = adList[i];
      const title = advert.subject;
      const id = advert.listId;
      const url = advert.url;
      const price = parseInt(advert.price?.replace('R$ ', '')?.replace('.', '') || '0');

      const result = {
        id,
        url,
        title,
        searchTerm,
        price,
        notify,
      };

      const ad = new Ad(result);
      ad.process();

      if (ad.valid) {
        validAds++;
        minPrice = checkMinPrice(ad.price, minPrice);
        maxPrice = checkMaxPrice(ad.price, maxPrice);
      }
    }

    return false;
  } catch (error) {
    $logger.error(error);
    throw new Error('Scraping failed');
  }
};

const urlAlreadySearched = async (url) => {
  try {
    const ad = await scraperRepository.getLogsByUrl(url, 1);
    if (ad.length) {
      return true;
    }
    $logger.info('First run, no notifications');
    return false;
  } catch (error) {
    $logger.error(error);
    return false;
  }
};

const setUrlParam = (url, param, value) => {
  const newUrl = new URL(url);
  let searchParams = newUrl.searchParams;
  searchParams.set(param, value);
  newUrl.search = searchParams.toString();
  return newUrl.toString();
};

const checkMinPrice = (price, minPrice) => {
  if (price < minPrice) return price;
  else return minPrice;
};

const checkMaxPrice = (price, maxPrice) => {
  if (price > maxPrice) return price;
  else return maxPrice;
};

export { scraper };
