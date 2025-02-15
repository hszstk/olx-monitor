import '@dotenvx/dotenvx/config';
let config = {};

config.baseUrls = [
  'https://www.olx.com.br/brasil?pe=400&sf=1&opst=2&q=',
  'https://www.olx.com.br/estado-sc/florianopolis-e-regiao?pe=400&sf=1&q=',
];

config.searches = {
  'qualquer-key': {
    searchTerms: ['termo-de-pesquisa'],
    messageThreadId: 1, // ID used to send the message to an specific group topic
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
