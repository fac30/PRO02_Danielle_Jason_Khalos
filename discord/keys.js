const dotenv = require('dotenv');
dotenv.config();

const discord = {
    id: process.env.DISCORD_APP_ID,
    public: process.env.DISCORD_PUBLIC_KEY,
    server: process.env.DISCORD_SERVER,
    token: process.env.DISCORD_TOKEN,
};

const openai = {
    token: process.env.OPENAI_TOKEN,
};

module.exports = { discord, openAI };