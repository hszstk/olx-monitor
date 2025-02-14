'use strict';

const config = require('../config');
const axios = require('axios');

exports.sendNotification = async (msg) => {
  const apiUrl = `https://api.telegram.org/bot${config.telegramToken}/sendMessage?chat_id=${config.telegramChatID}&message_thread_id=5&text=`;
  const encodedMsg = encodeURIComponent(msg);
  return await axios.get(apiUrl + encodedMsg, { timeout: 8000 });
};
