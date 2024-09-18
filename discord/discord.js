//h1 IMPORTS & DECLARATIONS
const fs = require('node:fs'); // allows file to read other files
const path = require('node:path'); // interprets & constructs filepaths

//h2 Configure .env
const dotenv = require('dotenv');
dotenv.config();
const keys = {
    discord: {
        id: process.env.DISCORD_APP_ID,
        public: process.env.DISCORD_PUBLIC_KEY,
        server: process.env.DISCORD_SERVER,
        token: process.env.DISCORD_TOKEN,
    },
    openai: { token: process.env.OPENAI_TOKEN, }
};

//h2 Configure Discord
const {
    Client,
    Collection, // extends Map class for Discord
    Events,
    GatewayIntentBits
} = require('discord.js');

// h1 SETUP
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(keys.discord.token);

//h1 COMMANDS
client.commands = new Collection();

const comPath = path.join(__dirname, 'commands');
const comSubs = fs.readdirSync(comPath);

for (const sub of comSubs) {
	const subPath = path.join(comPath, sub);
    const subFiles = fs.readdirSync(subPath)
        .filter(file => file.endsWith('.js'));
    console.log(`Commands: ${subFiles}`);
	for (const file of subFiles) {
        const filePath = path.join(subPath, file);
		const com = require(filePath);
		if ('data' in com && 'execute' in com) {
            client.commands.set(com.data.name, com);
		} else {
            console.log(`${filePath} lacks "data"/"execute" property.`);
		}
	}
};
console.group(`Discord Command Handler`);
console.info(client.commands);
console.log(`Commands compiled`);
console.groupEnd();

//h1 EVENTS
const evePath = path.join(__dirname, 'events');
const eveFiles = fs.readdirSync(evePath)
    .filter(file => file.endsWith('.js'));

console.log(`Events: ${eveFiles}`);

for (const file of eveFiles) {
	const filePath = path.join(evePath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
console.log(`Events compiled`);

//h1 EXPORTS
module.exports = {
    listenToMessages: (onMessage) => {
        client.on(Events.MessageCreate, (message) => {
            if (!message.author.bot) {
                // Send the message content to the central handler
                onMessage(message.content, (response) => {
                    message.reply(response);  // Send the response back to the Discord channel
                });
            }
        });
    }
};