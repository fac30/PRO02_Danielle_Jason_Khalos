// h1 IMPORTS & DECLARATIONS

// n1 Secrets
const dotenv = require('dotenv').config();
const keys = {
    discord: {
        id: process.env.DISCORD_APP_ID,
        public: process.env.DISCORD_PUBLIC_KEY,
        token: process.env.DISCORD_TOKEN,
    },
    openai: { token: process.env.OPENAI_TOKEN, }
};

// n1 Libraries
const { Client, Events, GatewayIntentBits } = require('discord.js');

// h1 SETUP

// n1 Create Client
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// n1 Confirm client is ready in terminal
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// n1 Login using discord token
client.login(keys.discord.token);