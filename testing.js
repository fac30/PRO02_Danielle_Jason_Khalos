const dotenv = require('dotenv').config();

const serverBridge = require('app.js');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN
});


module.exports = {
  // Simulates Discord messages and the response function
  listenToMessages: async (handleMessage) => {
    const testMessage = "What is the capital of Japan?"; // Example test message
    
    // Simulate a reply function
    const reply = (response) => {
      console.log("Replying with:", response);
    };

    // Call the handler function with the test message and reply function
    await handleMessage(testMessage, reply);
  }
};