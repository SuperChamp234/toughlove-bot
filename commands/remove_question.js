const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove_question")
    .setDescription("Remove an application question")
    .setDefaultPermission(false)
    .addIntegerOption((option) =>
      option
        .setName("id")
        .setDescription("Position of the question to be removed")
        .setRequired(true)
    ),

  async execute(settings, interaction) {
    await interaction.deferReply();
    const id = await interaction.options.getInteger("id");
    await settings.removeQuestion(id);

    const questions = await settings.getQuestions();

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Application Questions")
      .setDescription("");

    for (let i = 0; i < questions.length; i++) {
      embed.addFields({ name: `${i + 1}. ${questions[i]}`, value: "\u200b" });
    }

    const payload = {
      content: "✅ Question removed!",
      embeds: [embed],
    };

    interaction.editReply(payload);
  },
};
