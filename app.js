const dotenv = require('dotenv').config();

const openAiKey = process.env.OPENAI_TOKEN;
console.log(OPENAI_TOKEN);

const discord = require('./discord/app');
const openai = require('./openai/app');

// Listen for Discord messages
discord.listenToMessages(async (message, reply) => {
  // Pass the message to OpenAI and get a response
  const openAIResponse = await openai.chatPrompt(message);

  // Send the OpenAI response back to Discord
  reply(openAIResponse);
});