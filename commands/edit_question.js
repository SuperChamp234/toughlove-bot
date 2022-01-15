const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("edit_question")
    .setDescription("Edit an application question")
    .setDefaultPermission(false)

    .addIntegerOption((option) =>
      option
        .setName("id")
        .setDescription("Position of the question to be edited")
        .setRequired(true)
    )

    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("New question to be asked")
        .setRequired(true)
    ),

  async execute(settings, interaction) {
    await interaction.deferReply();
    const question = await interaction.options.getString("question");
    const id = await interaction.options.getInteger("id");
    await settings.editQuestion(id, question);

    const questions = await settings.getQuestions();

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Application Questions")
      .setDescription("");

    for (let i = 0; i < questions.length; i++) {
      embed.addFields({ name: `${i + 1}. ${questions[i]}`, value: "\u200b" });
    }

    const payload = {
      content: "✅ Question edited!",
      embeds: [embed],
    };

    interaction.editReply(payload);
  },
};
