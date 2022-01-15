const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view_questions")
    .setDescription("View current application questions")
    .setDefaultPermission(false),

  async execute(settings, interaction) {
    const questions = await settings.getQuestions();

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Application Questions")
      .setDescription("");

    for (let i = 0; i < questions.length; i++) {
      embed.addFields({ name: `${i + 1}. ${questions[i]}`, value: "\u200b" });
    }

    const payload = {
      embeds: [embed],
    };

    await interaction.reply(payload);
  },
};
