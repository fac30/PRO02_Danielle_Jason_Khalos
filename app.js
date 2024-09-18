const dotenv = require('dotenv').config();

const openAiKey = process.env.OPENAI_TOKEN;
console.log('OpenAI Token:', OPENAI_TOKEN);

const discord = require('./discord/app');
const openai = require('./openai/app');

// Listen for Discord messages
discord.listenToMessages(async (message, reply) => {
  try {
  // Pass the message to OpenAI and get a response
  const openAIResponse = await openai.chatPrompt(message);

  // Send the OpenAI response back to Discord
  reply(openAIResponse);
  } catch (error) {
    console.error("Error while processing OpenAI request:", error);
  }
});