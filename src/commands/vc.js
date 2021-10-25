const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// ToDo - Update this to work dynamically with VCs
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vc')
        .setDescription('Replies with a vision card')
        .addStringOption(option => option.setName('input').setDescription('Enter the name of the vc or the unit it belongs to')),
    async execute(interaction) {
        const searchTerm = interaction.options.getString('input');

        if (!searchTerm || searchTerm === '') {
            await interaction.reply('Please enter a search term to search for a vision card');
            return;
        }

        const vcEmbed = getVCEmbed('A New Journey', 'https://exvius.gamepedia.com/A_New_Journey', 'https://i.imgur.com/L4Tr6rM.gif', 'https://i.imgur.com/QKwghEX.png', 'Obtainable from a limited-time bundle');

        await interaction.reply({embeds: [vcEmbed]});
        // await interaction.
    },
};

// ToDo - Move the VC Embed builder to a separate file. Couldn't figure out how to reference this properly.
function getVCEmbed(title, url, imageUrl, thumbnailUrl, note) {
    const vcEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${title}`)
        .setURL(`${url}`)
        .setImage(`${imageUrl}`)
        .setThumbnail(`${thumbnailUrl}`)
        .addFields(
            { name: 'Stats:', value: '__Lv 1:__', inline: false },
            { name: 'Abilities:', value: '__Lv 1:__', inline: false }
        )
        .setFooter(`${note}`);

    return vcEmbed;
}