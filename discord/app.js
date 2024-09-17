//h1 IMPORTS & DECLARATIONS
const dotenv = require('dotenv').config();
const keys = {
    discord: {
        id: process.env.DISCORD_APP_ID,
        public: process.env.DISCORD_PUBLIC_KEY,
        token: process.env.DISCORD_TOKEN,
    },
    openai: { token: process.env.OPENAI_TOKEN, }
};
const { Client, Events, GatewayIntentBits } = require('discord.js');

//h1 SETUP
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, readyClient => { // n1 Confirm client is ready in terminal
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.login(keys.discord.token); // n1 Login using discord token

//h1 LISTENERS

/* Set up a message event listener
    - client.on('messageCreate', callback)
    1. individual command files
    2. command handler
    3. command deployment script
*/