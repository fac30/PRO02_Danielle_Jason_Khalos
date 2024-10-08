const dotenv = require('dotenv').config();

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN
});


let conversationHistory = [
  { role: "system", content: "You are a helpful assistant." }
];

async function chatPrompt(message) {

  conversationHistory.push({"role": "user", "content": message})

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
      temperature: 0.7,
    });

    const chatResponse = completion.choices[0].message.content;

    conversationHistory.push({"role": "assistant", "content": chatResponse});

    console.log("Assistant Response:", chatResponse);
    return chatResponse;

  } catch (error) {
    console.error("OpenAI Error:", error);
    return "I'm sorry, I encountered an error while processing your request.";
  }
}

module.exports = { chatPrompt };