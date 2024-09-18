const dotenv = require('dotenv').config();

const OpenAI = require('openai');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN
});

async function chatPrompt() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the Capital of France?"}
      ],
      temperature: 0.7,
    });

    const chatResponse = completion.choices[0].message.content;
    console.log("Assistant Response:", chatResponse);
  } catch (error) {
    console.error("Error:", error);
  }
}

chatPrompt();

module.exports = {chatPrompt}