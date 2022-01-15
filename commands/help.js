const fs = require("fs");
const path = require("path");

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Display available commands")
    .setDefaultPermission(false),

  async execute(settings, interaction) {
    const __parentDir = path.dirname(process.mainModule.filename);
    const commandFiles = fs
      .readdirSync(__parentDir + "/commands")
      .filter((file) => file.endsWith(".js"));

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Available Commands")
      .setDescription("");

    for (const file of commandFiles) {
      const command = require(path.join(__parentDir, "commands", file));
      embed.addFields({
        name: `/${command.data.name}`,
        value: command.data.description,
      });
    }

    const payload = {
      embeds: [embed],
    };

    await interaction.reply(payload);
  },
};
