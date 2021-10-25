const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the collection
    // With the key as the command name, and the value as the exported module
    client.commands.set(command.data.name, command)
}

const config = require('../config.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


/// Discord will be deprecating this for bots on over 75 servers starting April 2022. In order to pre-empt this,
/// I am going to try to remove any/all of the commands here, and convert them to interactions.
client.on('messageCreate', msg => {
    let prefix = '$';
    if (msg.author.bot) return;

    // Joke command. Only allowed on certain servers.
    if(msg.content === 'pls respond') {
        msg.reply('pls respond');
    }

    if (!msg.content.startsWith(config.prefix)) return;
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (e) {
        console.error(e);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.login(`${config.token}`);