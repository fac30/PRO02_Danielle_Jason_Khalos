const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('froth')
        .setDescription(
            'Shout at clouds.'
        ),
    async execute(interaction) {
        await interaction.reply(
            'Pong!'
        )
    },
};