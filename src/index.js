const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const config = require("./config.js");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', msg => {
    if (msg.author.bot) return;

    if (!msg.content.startsWith(config.prefix)) return;

    if (msg.content.startsWith(`${config.prefix}ping`)) {
        msg.reply('Pong!');
    }
});

client.login(config.token);