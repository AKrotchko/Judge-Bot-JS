# Judge-Bot-JS
 Recreating Judge Bot in javascript

 Judge Bot is the pet project of Roy from the FFBE Discord server. It has had a lot of growing pains throughout the years, and the project is finally transitioning to javascript because dart is annoying as fuck to use for a command-line application. Who would've thought. Anyway, I'll be updating the bot piece-by-piece here, and I'll try to chronicle the change made as time goes on.

## Step 1. Setting up your config.json
You will need to set up all of the variables that belong in the config.json. Client ID and token are required for the application to run. For help finding this info, check the [Discord Developer Portal][1]

## Step 2. Registering your slash commands

In order to get the new slash commands to work correctly, they need to be registered. This will need to be done any time that you update or add any new slash commands. You can either update slash commands for a specific server (this happens instantly), or you may do them globally (this may take up to an hour for them to appear). 

For the time being, all commands are global*, so registering commands for a guild is mostly done for development purposes. You can switch between the two code blocks in the `deploy-commands.js` file by commenting one out, and leaving the other one uncommented. I've left comments to explain which is which. The guild ID should be put into your `config.json`. Eventually, I will migrate to an environment file instead of this config setup.

From the project root, simply run 

`node src/deploy-commands.js`

 This command file will update dynamically as long as you put every command into that root folder.


 *The one command that is not global has a special check for guild ID to prevent it being used anywhere else. This is the old way of doing things, and will be changed.

## Step 3. Running the bot

To run the bot from the project root, run 

`node src/index.js`.


[1]: https://discord.com/developers/docs/intro


## Current Commands

#### VC (Global, Slash)

Allows a user to search for a vision card by alias based on the visionCards.json file. Currently only accepts perfect matches to aliases. Formats the data, and responds with an embed that contains the information requested. Also provides wiki links and images for said vision card.

#### NV (Global, Slash)

Allows a user to search for a neo vision unit (NV awakening, or NV base) based on the neoVisions.json file. Accepts perfect or partial matches to aliases. Formats data, and responds with an embed that contains the information requested. 