const TLApplication = require("../tl_application.js");

module.exports = {
  data: {
    name: "submit_application",
  },

  async execute(settings, interaction) {
    const msg = await settings.getMessage("received");
    await interaction.message.edit({ components: [] });
    await interaction.reply(msg);

    const tlApp = new TLApplication({
      userId: interaction.user.id,
      client: interaction.client,
      settings: settings,
    });

    await tlApp.submit(interaction.user);
  },
};
