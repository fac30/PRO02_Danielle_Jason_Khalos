const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('linger')
        .setDescription(
            'Peer through windows at user'
        ),
    async execute(interaction) {
        await interaction.reply(
            `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`
        );
    },
};