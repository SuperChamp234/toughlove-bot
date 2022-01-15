const TLApplication = require("../tl_application.js");

module.exports = {
  data: {
    name: "cancel_application",
  },

  async execute(settings, interaction) {
    await interaction.deferReply();
    await interaction.message.edit({ components: [] });

    const tlApp = new TLApplication({
      userId: interaction.user.id,
      client: interaction.client,
      settings: settings,
    });

    await tlApp.cancel(interaction);
  },
};
