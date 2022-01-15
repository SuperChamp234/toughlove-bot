const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_question")
    .setDescription("Add an application question")
    .setDefaultPermission(false)
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Question to ask")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("id")
        .setDescription("Insert question into a specific position")
        .setRequired(false)
    ),

  async execute(settings, interaction) {
    await interaction.deferReply();
    const question = await interaction.options.getString("question");
    const id = await interaction.options.getInteger("id");
    await settings.addQuestion(question, id);

    const questions = await settings.getQuestions();

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Application Questions")
      .setDescription("");

    for (let i = 0; i < questions.length; i++) {
      embed.addFields({ name: `${i + 1}. ${questions[i]}`, value: "\u200b" });
    }

    const payload = {
      content: "✅ Question added!",
      embeds: [embed],
    };

    interaction.editReply(payload);
  },
};
