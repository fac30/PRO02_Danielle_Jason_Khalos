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
        /* const question = interaction.options.getString('question');
        await interaction.reply(`Okay, let me think.`);
        const response = await server.bridge(question);
        await interaction.followUp(response); */
        const question = Promise.resolve(interaction.options.getString('question'))
            .then(interaction.reply(`Okay, let me think.`))
            .then(response = await bridge(question))
            .then(interaction.followUp(response));
    },
};
console.log(`askbot.js: post export`)