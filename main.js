const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const token = process.env.token;
const options = {
  polling: true,
};
const pajarBot = new TelegramBot(token, options);

// pajarBot.on("message", (callbakc) => {
//   const id = callbakc.from.id;
//   pajarBot.sendMessage(id, callbakc.text);
// });

const prefix = "/";
const adviceEndpoint = "https://api.adviceslip.com/advice";
const regexMessage = new RegExp(`^${prefix}advice$`);
pajarBot.onText(regexMessage, async (callback) => {
  const apiCall = await fetch(adviceEndpoint);
  const response = await apiCall.json();
  pajarBot.sendMessage(callback.from.id, response.slip.advice);
});
