const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view_messages")
    .setDescription("View copy sent to users")
    .setDefaultPermission(false),

  async execute(settings, interaction) {
    //await interaction.deferReply();

    const commands = [
      "welcome",
      "confirm_submission",
      "received",
      "approved",
      "declined",
      "canceled",
    ];

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Messages")
      .setDescription("");

    for (let c of commands) {
      embed.addFields({ name: c, value: await settings.getMessage(c) });
    }

    const payload = {
      embeds: [embed],
    };

    await interaction.reply(payload);
  },
};
