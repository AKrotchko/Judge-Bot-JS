const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');

/// Any slash commands must be deployed before being used. To do so, run
/// 
/// node deploy-commands.js
///
/// This is currently configured for a specific guild. Will need to make global commmands

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);


/// Global commands (May take up to an hour to register, use when ready)
rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

/// Guild commands (Instant, use for development)
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
//     .then(() => console.log('Successfully registered guild commands.'))
//     .catch(console.error);