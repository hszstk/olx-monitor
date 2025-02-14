import fetch from 'node-fetch';

import config from '#config.js';

const sendNotification = async (msg) => {
  const apiUrl = `https://api.telegram.org/bot${config.telegramToken}/sendMessage?chat_id=${config.telegramChatID}&message_thread_id=5&text=`;
  const encodedMsg = encodeURIComponent(msg);
  return await fetch(apiUrl + encodedMsg, { timeout: 8000 });
};

export default sendNotification;
