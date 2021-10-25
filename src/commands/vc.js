const { SlashCommandBuilder } = require('@discordjs/builders');

// ToDo - Update this to work dynamically with VCs
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong2!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};