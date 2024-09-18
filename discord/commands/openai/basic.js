const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('askbot')
        .setDescription(
            'ask a question, get an answer, ignore the void within'
        ),
    async execute(interaction) {
        await interaction.reply(`Okay, let me think.`);
        await interaction.followUp(`I have thought.`);
    },
};