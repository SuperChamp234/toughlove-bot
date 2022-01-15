const { SlashCommandBuilder } = require("@discordjs/builders");

const TLApplication = require("../tl_application.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("Apply for ToughLove"),

  async execute(settings, interaction) {
    const tlApp = new TLApplication({
      userId: interaction.member.user.id,
      client: interaction.client,
      settings: settings,
    });

    if (await tlApp.hasExistingSubmission()) {
      await interaction.reply(
        "📑 Your existing application is being processed."
      );
    } else {
      tlApp.welcome();

      await interaction.reply(
        "📫 Please check your DM for instructions to apply!"
      );
    }
  },
};
