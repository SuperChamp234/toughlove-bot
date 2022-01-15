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
The bot requires the following configuration keys set in `config.json`

`token` - The Discord bot application token obtained in the `Discord Bot Setup` section.

`guildId` - The ID of your server (https://discord.com/channels/<guidId>/XXXX)

`roleId` - The ID of the Role which has access to 'admin' commands
