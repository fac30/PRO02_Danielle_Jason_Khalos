const { SlashCommandBuilder } = require('discord.js');
const { server } = require('../../../app');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('askbot')
        .setDescription('ask a question, get an answer, ignore the void within')
        .addStringOption(option => option.setName('question')
            .setDescription('The question you want to ask')
            .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        await interaction.reply(`Okay, let me think.`);
        const response = await server.bridge(question);
        await interaction.followUp(response);
    },
};