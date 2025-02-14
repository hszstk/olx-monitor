import querystring from 'querystring';
import fetch from 'node-fetch';

import config from '#config.js';
import $logger from '#components/Logger.js';

const sendNotification = async ({ msg, telegramThreadId }) => {
  const queryString = querystring.stringify({
    chat_id: config.telegramChatID,
    message_thread_id: telegramThreadId,
    text: msg,
  });

  const apiUrl = `https://api.telegram.org/bot${config.telegramToken}/sendMessage?${queryString}`;
  const response = await fetch(apiUrl);
  const body = await response.json();
  $logger.info(`SendNotification was succesful: ${body.ok}`);
};

export default sendNotification;
