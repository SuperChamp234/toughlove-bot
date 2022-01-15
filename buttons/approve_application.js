const TLApplication = require("../tl_application.js");

module.exports = {
  data: {
    name: "approve_application",
  },

  async execute(settings, interaction) {
    await interaction.deferReply();

    const tlApp = new TLApplication({
      client: interaction.client,
      settings: settings,
      threadId: interaction.channelId,
    });

    tlApp.approve(interaction);
  },
};
