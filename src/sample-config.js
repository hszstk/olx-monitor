import '@dotenvx/dotenvx/config';
let config = {};

config.baseUrls = ['https://www.olx.com.br/brasil?pe=400&sf=1&opst=2&q='];

config.searches = {
  'gameboy': {
    searchTerms: ['nintendo', 'gameboy', 'game%20boy'],
    messageThreadId: 5,
  },
  'pokemon': {
    searchTerms: ['pokemon'],
    messageThreadId: 47,
  },
  'ipod': {
    searchTerms: ['ipod'],
    messageThreadId: 46,
  },
};

// this tool can help you create the interval string:
// https://tool.crontap.com/cronjob-debugger

config.interval = '*/3 * * * *';
config.telegramChatID = process.env.TELEGRAM_CHAT_ID;
config.telegramToken = process.env.TELEGRAM_TOKEN;
config.dbFile = '../data/ads.db';

config.logger = {
  logFilePath: '../data/scrapper.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss',
};

export default config;
