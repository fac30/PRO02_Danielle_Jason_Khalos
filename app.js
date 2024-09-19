console.group(`========= app.js: imports =========`);
console.log(`app.js: require keys`);
const dotenv = require('dotenv').config();
const openAiKey = process.env.OPENAI_TOKEN;
const keys = { //discord keys
  discord: {
    id: process.env.DISCORD_APP_ID,
    public: process.env.DISCORD_PUBLIC_KEY,
    server: process.env.DISCORD_SERVER,
    token: process.env.DISCORD_TOKEN,
  }
};

console.log(`app.js: require discord`);
const { Client, Events, GatewayIntentBits } = require('discord.js');

console.log(`app.js: require files`);
const openai = require('./openai/app');
const tests = require('./testing');

console.log(`app.js: finished imports`);
console.groupEnd();

function bridge(question) {
  console.group(`========= bridge =========`);
  // send question to openAI/app.js
  // await response
  // return response
  console.log(`app.js: about to call openai`);
  reply(openAIResponse);
  console.groupEnd();
}

//h1 Starts Bot - DO NOT TOUCH
/* console.group(`========= app.js discord setup =========`);
console.log(`app.js ABOUT TO CREATE CLIENT`);
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
console.log(`app.js CREATED CLIENT`);
client.once(Events.ClientReady, readyClient => {
  console.log(`${readyClient.user.tag} ready`);
});
console.log(`app.js ABOUT TO LOG IN`);
client.login(keys.discord.token);
console.log(`app.js LOGGED IN`);
console.groupEnd(); */

//h1 Listen for Discord messages
/* tests.listenToMessages(async (message, reply) => {
  console.group(`========= app.js: tests.listenToMessages =========`);
  try {
    // Pass the message to OpenAI and get a response
    const openAIResponse = await openai.chatPrompt(message);

    // Send the OpenAI response back to Discord
    reply(openAIResponse);
  } catch (error) {
    console.error("Error while processing OpenAI request:", error);
  }
  console.groupEnd();
}); */

module.exports = { bridge };