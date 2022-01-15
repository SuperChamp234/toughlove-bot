const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping the bot"),

  async execute(settings, interaction) {
    await interaction.reply(
      `🏓 Pong! (Bot:${
        Date.now() - interaction.createdTimestamp
      }ms, API:${Math.round(interaction.client.ws.ping)}ms)`
    );
  },
};
