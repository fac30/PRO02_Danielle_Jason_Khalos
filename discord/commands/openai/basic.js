const { SlashCommandBuilder } = require('discord.js');

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
        // the bot must export the message that the user has written
        // the bot must import a response from elsewhere in my server
        await interaction.followUp(`I have thought.`);
    },
};