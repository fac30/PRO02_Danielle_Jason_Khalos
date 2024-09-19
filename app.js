console.group(`========= app.js: imports =========`);
console.log(`app.js: require keys`);

const { chatPrompt } = require('./openai/app');
const tests = require('./testing');

async function bridge(question) {
  const reply = await chatPrompt(question);
  return reply;
}

module.exports = { bridge };