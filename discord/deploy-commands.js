//h1 IMPORTS & DECLARATIONS
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

function buildComArr() {
	const commands = [];

	const comPath = path.join(__dirname, 'commands');
	const comSubs = fs.readdirSync(comPath);

	for (const sub of comSubs) {
		const subPath = path.join(comPath, sub);
		const subFiles = fs.readdirSync(subPath)
			.filter(file => file.endsWith('.js'));
		for (const file of subFiles) {
			const filePath = path.join(subPath, file);
			const com = require(filePath);
			if ('data' in com && 'execute' in com) {
				commands.push(com.data.toJSON());
			} else {
				console.log(`${filePath} lacks "data"/"execute" property.`);
			}
		}
	}

	return commands;
}

const commands = buildComArr();

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();