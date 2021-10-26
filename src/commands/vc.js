const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const vcEmbed = require('../embeds/vc-embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vc')
        .setDescription('Replies with a vision card')
        .addStringOption(option => option.setName('input').setDescription('Enter the name of the vc or the unit it belongs to')),
    async execute(interaction) {
        const searchTerm = interaction.options.getString('input');

        /// Grab the VC list from local json
        var vcFile = require('../data/visionCards.json');
        var visionCards = vcFile.visionCards;

        /// If the searchterm is empty, send an error
        if (!searchTerm || searchTerm === '') {
            await interaction.reply('Please enter a search term to search for a vision card');
            return;
        }

        var vcEmbed;

        /// Checking the aliases for the searchterm to match an alias perfectly
        visionCards.forEach((vc) => {
            vc.Aliases.forEach((alias) => {

                /// If a perfect match was found, create the VC Embed
                if (searchTerm.toLowerCase() === alias.toLowerCase()) {

                    vcEmbed = getVCEmbed(
                        vc.Aliases[0],
                        vc.CardURL,
                        vc.AnimationURL,
                        vc.ArtURL,
                        vc.Level1Stats,
                        vc.Level10Stats,
                        vc.Level4Abilities,
                        vc.Level7Abilities,
                        vc.Level10Abilities,
                        vc.Note
                    );
                }
            });
        });

        /// If the VC embed was created, send it. Otherwise, reply with an error message
        if (vcEmbed) {
            await interaction.reply({ embeds: [vcEmbed] });
            return;
        } else {
            await interaction.reply(`I couldn't find a Vision Card with the name \`${searchTerm}\`. Please try again.`);
            return;
        }
    },
};

// ToDo - Move the VC Embed builder to a separate file. Couldn't figure out how to reference this properly.
function getVCEmbed(title, url, animationUrl, imageUrl, level1Stats, level10Stats, level4Abilities, level7Abilities, level10Abilities, note) {

    var vcEmbed;

    /// Format for premium vision cards
    if (level4Abilities.toLowerCase() === 'premium') {
        vcEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${title}`)
            .setURL(`${url}`)
            .setImage(`${animationUrl}`)
            .setThumbnail(`${imageUrl}`)
            .addFields(
                { name: 'Stats:', value: `__Lv 1:__ ${level1Stats}`, inline: false },
                { name: 'Abilities:', value: `__Lv 1:__ ${level10Abilities}`, inline: false }
            )
            .setFooter(`${note}`);
    } else {
        /// Format for normal vision cards
        vcEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${title}`)
            .setURL(`${url}`)
            .setImage(`${animationUrl}`)
            .setThumbnail(`${imageUrl}`)
            .addFields(
                { name: 'Stats:', value: `__Lv 1:__ ${level1Stats}\n__Lv 10:__ ${level10Stats}`, inline: false },
                { name: 'Abilities:', value: `__Lv 4:__${level4Abilities}\n__Lv 7:__ ${level7Abilities}\n__Lv 10:__ ${level10Abilities}`, inline: false }
            )
            .setFooter(`${note}`);
    }

    return vcEmbed;
}