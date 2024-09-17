const { SlashCommandBuilder } = require('discord.js');

const com = new SlashCommandBuilder().setName(
    'ping'
).setDescription(
    'Replies with Pong!'
);
    
const rep = async function execute(interaction) {
    await interaction.reply('Pong!')
};

module.exports = { data: com, execute: rep };

/* module.exports = {
    data: new SlashCommandBuilder().setName(
        'user'
    ).setDescription(
        'Provides information about the user.'
    ),
    execute: rep
} */