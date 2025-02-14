import fetch from 'node-fetch';

import config from '#config.js';
import $logger from '#components/Logger.js';

const sendNotification = async (msg) => {
  const encodedMsg = encodeURIComponent(msg);

  const apiUrl = `https://api.telegram.org/bot${config.telegramToken}/sendMessage?chat_id=${config.telegramChatID}&message_thread_id=5&text=${encodedMsg}`;
  const response = await fetch(apiUrl);
  const body = await response.json();
  $logger.info(`SendNotification was succesful: ${body.ok}`);
};

export default sendNotification;
