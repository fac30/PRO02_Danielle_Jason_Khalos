//h1 IMPORTS & DECLARATIONS
console.group(`========= deploy-commands.js: imports ======`);
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

const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
console.log(`deploy-commands.js: imports done`);
console.groupEnd();

function buildComArr() {
	console.group(`============ deploy-commands.js: buildComArr ============`);
	const commands = [];

	const comPath = path.join(__dirname, 'commands');
	const comSubs = fs.readdirSync(comPath);

	for (const sub of comSubs) {
		console.group(`============ deploy-commands.js: ${sub} subfolder ============`);
		const subPath = path.join(comPath, sub);
		const subFiles = fs.readdirSync(subPath)
			.filter(file => file.endsWith('.js'));
		for (const file of subFiles) {
			console.group(`============== deploy-commands.js: ${file} command ==============`);
			const filePath = path.join(subPath, file);
			console.log(`deploy-commands.js: found? ${filePath != null}`);
			console.log(`askbot.js: breadcrumb`)
			const com = require(filePath);
			console.log(`deploy-commands.js: ${com}`);
			if ('data' in com && 'execute' in com) {
				commands.push(com.data.toJSON());
				console.log(`deploy-commands.js: Pushed`)
			} else {
				console.log(`deploy-commands.js: ${file} lacks "data"/"execute" property.`);
			}
			console.groupEnd();
		}
		console.groupEnd();
	}
	console.groupEnd();
	return commands;
}

/* const commands = buildComArr(); */
console.group(`========= deploy-commands.js: create REST =========`);
console.log(`deploy-commands.js: about to create new REST`);
const rest = new REST().setToken(keys.discord.token);
console.log(`deploy-commands.js: REST created`);
console.groupEnd();

(async () => {
	console.group(`============ deploy-commands.js: async function ============`);
	try {
		console.group(`============ deploy-commands.js: try branch ============`);
		const data = await rest.put(
			Routes.applicationGuildCommands(keys.discord.id, keys.discord.server),
			{ body: buildComArr() },
		);
		console.log(`deploy-commands.js: Successfully reloaded ${data.length} application (/) commands.`);
		console.groupEnd();
	} catch (error) {
		console.group(`============ deploy-commands.js: catch branch ============`);
		console.error(error);
		console.groupEnd();
	}
})();