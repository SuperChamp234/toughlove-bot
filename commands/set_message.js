const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set_message")
    .setDescription("Set a message shown to applicants")
    .setDefaultPermission(false)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("welcome")
        .setDescription("First message shown to applicant")
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("Message text")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("confirm_submission")
        .setDescription("Prompt shown before application is submitted")
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("Message text")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("received")
        .setDescription(
          "Message shown to user confirming application submission"
        )
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("Message text")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("approved")
        .setDescription("Message shown to user when application is approved")
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("Message text")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("declined")
        .setDescription("Message shown to user when application is declined")
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("Message text")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("canceled")
        .setDescription("Message shown to user when application is canceled")
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("Message text")
            .setRequired(true)
        )
    ),

  async execute(settings, interaction) {
    const name = await interaction.options.getSubcommand();
    const message = await interaction.options.getString("message");

    await settings.setMessage(name, message);
    await interaction.reply("✅ Message set!");
  },
};
