const dotenv = require('dotenv').config();

const serverBridge = require('./app');

module.exports = {
  // Simulates Discord messages and the response function
  listenToMessages: async (handleMessage) => {
    const testMessage = ["What is the capital of France?",
      "What is its population?",
      "What are its main attractions"
    ]; // Example test message
    
    // Simulate a reply function
    
    const reply = (chatResponse) => {
      // console.log(typeof reply());
      console.log('Replying with:', chatResponse);
    }

    // Call the handler function with the test message and reply function
    for (message of testMessage) {
    await handleMessage(message, reply);
  }
}
};