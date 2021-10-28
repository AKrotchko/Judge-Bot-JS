const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { execute } = require('./vc');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nv')
        .setDescription('Replies with a NV unit')
        .addStringOption(option => option.setName('input').setDescription('Enter the name of the unit you want to find')),
    async execute(interaction) {
        const searchTerm = interaction.options.getString('input');

        /// Grab the NV unit list from local json
        var nvFile = require('../data/neoVisions.json');
        var neoVisions = nvFile.Units;

        /// If the searchTerm is empty, send an error
        if (!searchTerm || searchTerm === '') {
            await interaction.reply('Please enter a search term to search for a NV unit');
            return;
        }

        var nvEmbed;

        /// Checking if the aliases match the searchterm for a partial or perfect match
        neoVisions.forEach((nv) => {
            nv.Aliases.forEach((alias) => {

                /// If a perfect match was found, generate the NV embed
                if (searchTerm.toLowerCase() === alias.toLowerCase()) {

                    nvEmbed = getNVEmbed(
                        nv.Aliases[0],
                        nv.wikiURL,
                        nv.spriteURL,
                        nv.TMRName,
                        nv.TMRDescription,
                        nv.STMRName,
                        nv.STMRDescription
                    );
                }
            });
        });

        /// If a perfect match was found, send the embed
        if (nvEmbed) {
            await interaction.reply({ embeds: [nvEmbed] });
            return;
        } else {

            /// If a perfect match was not already found, look for the first partial match.
            neoVisions.forEach((nv) => {
                nv.Aliases.forEach((alias) => {

                    /// If a partial match was found, create the embed
                    if (alias.toLowerCase().includes(searchTerm.toLowerCase())) {
                        nvEmbed = getNVEmbed(
                            nv.Aliases[0],
                            nv.wikiURL,
                            nv.spriteURL,
                            nv.TMRName,
                            nv.TMRDescription,
                            nv.STMRName,
                            nv.STMRDescription
                        );
                    }
                });
            });

            /// Check if a partial match was found, and send the embed if it exists
            if (nvEmbed) {
                await interaction.reply({ embeds: [nvEmbed] });
                return;
            }

            /// If no perfect or partial match was found, send an error response
            await interaction.reply(`I couldn't find a Neo Vision unit with the name \`${searchTerm}\`. Please try again.`);
            return;
        }
    }
}

// ToDo - Move the NV embed builder to a separate file
function getNVEmbed(title, unitUrl, thumbnailUrl, tmrName, tmrDescription, stmrName, stmrDescription) {
    var nvEmbed = new MessageEmbed()
        .setColor('#57F287')
        .setTitle(`${title}`)
        .setURL(`${unitUrl}`)
        .setThumbnail(`${thumbnailUrl}`)
        .addFields(
            { name: `TMR - ${tmrName}`, value: `${tmrDescription}`, inline: false },
            { name: `STMR - ${stmrName}`, value: `${stmrDescription}`, inline: false }
        );

    return nvEmbed;

}