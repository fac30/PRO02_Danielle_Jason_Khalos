//h1 IMPORTS & DECLARATIONS
const fs = require('node:fs'); // allows file to read other files
const path = require('node:path'); // interprets & constructs filepaths
const dotenv = require('dotenv');
const {
    Client,
    Collection, // extends Map class for Discord
    Events,
    GatewayIntentBits
} = require('discord.js');

//h2 Configure .env
dotenv.config();
const keys = {
    discord: {
        id: process.env.DISCORD_APP_ID,
        public: process.env.DISCORD_PUBLIC_KEY,
        token: process.env.DISCORD_TOKEN,
    },
    openai: { token: process.env.OPENAI_TOKEN, }
};

//h1 CLIENT
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.login(keys.discord.token);

//h1 Command Handler
client.commands = new Collection();

//h2 Build Command Collection
const comPath = path.join(__dirname, 'commands');
// return this directory + "commands"

const comSubs = fs.readdirSync(comPath);
// return array of subfolders

for (const sub of comSubs) { /* return Collection of all files within /discord/commands */
	const subPath = path.join(comPath, sub);
    const subFiles = fs.readdirSync(subPath).filter(
        file => file.endsWith('.js')
    );
	for (const file of subFiles) {
		const filePath = path.join(subPath, file);
		const com = require(filePath);
		if ('data' in com && 'execute' in com) {
			client.commands.set(com.data.name, com);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
};

console.log(client.commands);