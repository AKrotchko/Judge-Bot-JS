# Judge-Bot-JS
 Recreating Judge Bot in javascript

Step 1. Setting up your config.json
You will need to set up all of the variables that belong in the config.json. Client ID and token are required for the application to run. For help finding this info, check the [Discord Developer Portal][1]

Step 1. Installing your slash commands

In order to get the new slash commands to work correctly, they need to be installed. this will need to be done any time that you update or add any new slash commands. From the project root, simply run `node src/deploy-commands.js`. This command file will update dynamically as long as you put every command into that root folder.

Step 2. Running the bot

To run the bot from the project root, run `node src/index.js`.


[1]: https://discord.com/developers/docs/intro