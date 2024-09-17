const keys = require('dotenv');

keys.config();

console.groupCollapsed("Is your .env file set up correctly?");
console.log(process.env.DISCORD_APP_ID);
console.log(process.env.DISCORD_PUBLIC_KEY);
console.log(process.env.DISCORD_TOKEN);
console.groupEnd();