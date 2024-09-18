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

function bridge(question) {
  // send question to openAI/app.js
  // await response
  // return response
  reply(openAIResponse);
}

const { Client, Events, GatewayIntentBits } = require('discord.js');

const discord = require('./discord/discord');
const openai = require('./openai/app');
const tests = require('./testing');

//h1 Starts Bot - DO NOT TOUCH
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, readyClient => {
  console.log(`${readyClient.user.tag} ready`);
});
client.login(keys.discord.token);

//h1 Listen for Discord messages
tests.listenToMessages(async (message, reply) => {
  try {
    // Pass the message to OpenAI and get a response
    const openAIResponse = await openai.chatPrompt(message);

    // Send the OpenAI response back to Discord
    reply(openAIResponse);
  } catch (error) {
    console.error("Error while processing OpenAI request:", error);
  }
});

module.exports = { discordString };