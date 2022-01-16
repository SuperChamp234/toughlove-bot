# ToughLove Bot

A discord bot written to assist with Potential Central's ToughLove program.

### Current Features

1. Accept Applications for ToughLove


### Planned Features

TBD

### Requirements
1. Node.js 16.9.0 or newer
2. Redis
3. A discord bot token


### Discord Bot Setup
1. Visit https://discord.com/developers and create a 'New Application'
2. Add A 'Bot' to this application from the 'Settings' menu on the left.
3. Copy/save the token from this page.
4. From the 'Settings' menu click on Oauth2 -> URL Generator.
5. In the 'Scopes' section select 'bot' and 'applications.commands'
6. In the 'Bot Permissions' section select all 'Text Permissions'
7. Copy the 'Generated URL' at the bottom and visit that URL to invite the bot to your server.

### Config
The bot requires the following environment variables set

`DISCORD_TOKEN` - The Discord bot application token obtained in the `Discord Bot Setup` section.

`GUILD_ID` - The ID of your server (https://discord.com/channels/<guidId>/XXXX)

`ROLE_ID` - The ID of the Role which has access to 'admin' commands

`BUGSNAG_API_KEY` (optional) - API Key for Bugsnag error tracking

### Deploying with Docker

1. Create a `.env` file (env.sample provided) and make sure the above environment variables are set.

2. Run `docker-compose up` to build the containers.

#### Post deployment one-time setup

3. Run `docker-compose run bot node deploy_commands.js` once to Register the application commands with discord

### Development
To build and run the bot in a development environment:

1. Clone the code and run `npm install` to fetch dependencies.
2. Create a `.env` file and set it up with the above config entries.
3. Run `node index.js` to start the bot.
4. Run `node deploy_commands.js` to register Application Commands with discord
