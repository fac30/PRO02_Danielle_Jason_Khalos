const { SlashCommandBuilder } = require('discord.js');
const { bridge } = require('../../../app');

console.log(`askbot.js: pre export`)
module.exports = {
    data: new SlashCommandBuilder()
        .setName('askbot')
        .setDescription(
            'ask a question, get an answer, ignore the void within'
        )
        .addStringOption(option => option
            .setName('question')
            .setDescription('The question you want to ask')
            .setRequired(true)
        ),
    async execute(interaction) {
        /* interaction.reply(`Okay, let me think.`); */
        const question = await interaction.options.getString('question');
        await interaction.followUp(bridge(question));
    },
};