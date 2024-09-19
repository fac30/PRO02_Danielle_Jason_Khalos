//h1 IMPORTS & DECLARATIONS
console.group(`========= Deploy: imports ======`);
console.log(`Deploy: require keys`);
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

console.log(`Deploy: require discord`);
const { REST, Routes } = require('discord.js');
console.log(`Deploy: require node stuff`);
const fs = require('node:fs');
const path = require('node:path');
console.log(`Deploy: imports done`);
console.groupEnd();

function buildComArr() {
	console.group(`============ Deploy: buildComArr() ============`);
	const commands = [];

	const comPath = path.join(__dirname, 'commands');
	const comSubs = fs.readdirSync(comPath);

	for (const sub of comSubs) {
		console.group(`============ Deploy: commands/${sub} ============`);
		const subPath = path.join(comPath, sub);
		const subFiles = fs.readdirSync(subPath)
			.filter(file => file.endsWith('.js'));
		for (const file of subFiles) {
			console.group(`============== Deploy: commands/${sub}/${file} ==============`);
			const filePath = path.join(subPath, file);
			console.log(`Deploy: found? ${filePath != null}`);
			/* console.log(`FILE SWITCH BASTARD`); */
			const com = require(filePath);
			console.group(`Deploy: ${file} Info`);
			console.info(com);
			console.groupEnd();
			if ('data' in com && 'execute' in com) {
				commands.push(com.data.toJSON());
				console.log(`Deploy: commands/${sub}/${file} Pushed`)
			} else {
				console.log(`Deploy: ${file} lacks "data"/"execute" property.`);
			}
			console.groupEnd();
		}
		console.groupEnd();
	}
	console.groupEnd();
	return commands;
}

/* const commands = buildComArr(); */
console.group(`========= Deploy: create REST =========`);
console.log(`Deploy: about to create new REST`);
const rest = new REST().setToken(keys.discord.token);
console.log(`Deploy: REST created`);
console.groupEnd();

(async () => {
	console.group(`============ Deploy: async function ============`);
	try {
		console.group(`============ Deploy: try branch ============`);
		const data = await rest.put(
			Routes.applicationGuildCommands(keys.discord.id, keys.discord.server),
			{ body: buildComArr() },
		);
		console.log(`Deploy: Successfully reloaded ${data.length} application (/) commands.`);
		console.groupEnd();
	} catch (error) {
		console.group(`============ Deploy: catch branch ============`);
		console.error(error);
		console.groupEnd();
	}
	console.log(`Deploy: async done`);
	console.groupEnd();
})();