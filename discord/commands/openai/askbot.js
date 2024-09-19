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
        await interaction.deferReply();
        const question = interaction.options.getString('question');
        const reply = await bridge(question);
        await interaction.editReply(reply);
    },
};