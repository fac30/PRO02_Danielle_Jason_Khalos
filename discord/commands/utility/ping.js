const { SlashCommandBuilder } = require('discord.js');

const com = new SlashCommandBuilder().setName(
    'ping'
).setDescription(
    'Replies with Pong!'
);
    
const rep = async function execute(interaction) {
	await interaction.reply('Pong!')
}

module.exports = { com, rep };