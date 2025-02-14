import querystring from 'querystring';
import fetch from 'node-fetch';

import config from '#config.js';
import $logger from '#components/Logger.js';

const sendNotification = async ({ msg, telegramThreadId }) => {
  try {
    const queryString = querystring.stringify({
      chat_id: config.telegramChatID,
      message_thread_id: telegramThreadId,
      text: msg,
    });

    const base_url = process.env.IS_BOT_LOCAL
      ? 'http://localhost:8081'
      : 'https://api.telegram.org';

    const apiUrl = `${base_url}/bot${config.telegramToken}/sendMessage?${queryString}`;
    const response = await fetch(apiUrl);
    const body = await response.json();
    $logger.info(`SendNotification was succesful: ${body.ok}`);
  } catch (error) {}
};

export default sendNotification;
