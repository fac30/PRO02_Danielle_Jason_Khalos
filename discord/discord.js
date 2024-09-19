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
console.group(`========= discord.js: commands =========`)
console.log(`discord.js: ABOUT TO CREATE COLLECTION `);
client.commands = new Collection();

const comPath = path.join(__dirname, 'commands');
const comSubs = fs.readdirSync(comPath);

console.group(`============ discord.js: Command Pathbuilder ============`);
for (const sub of comSubs) {
    console.group(`============ discord.js: ${sub} Subfolder ============`);
	const subPath = path.join(comPath, sub);
    const subFiles = fs.readdirSync(subPath)
        .filter(file => file.endsWith('.js'));
    console.log(`discord.js 47: Commands: ${subFiles}`);
    for (const file of subFiles) {
        console.group(`============ discord.js: ${sub}/${file} ============`);
        const filePath = path.join(subPath, file);
		const com = require(filePath);
		if ('data' in com && 'execute' in com) {
            client.commands.set(com.data.name, com);
        } else {
            const d = 'data' in com;
            const e = 'execute' in com;
            console.group(`========= discord.js: ${file} =========`);
            console.log(`has data: ${d}`);
            console.log(`has execute: ${e}`);
            console.groupEnd();
        }
        console.groupEnd();
    }
    console.groupEnd();
};
console.log(`discord.js: Paths Built`);
console.groupEnd();
console.groupEnd();

//h1 EVENTS
const evePath = path.join(__dirname, 'events');
const eveFiles = fs.readdirSync(evePath)
    .filter(file => file.endsWith('.js'));

console.group(`============ discord.js: Event Handler ============`);
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
console.log(`discord.js: Events compiled`);
console.groupEnd();

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