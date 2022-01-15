const { MessageActionRow, MessageButton } = require("discord.js");

const TLApplication = require("../tl_application.js");

module.exports = {
  data: {
    name: "start_application",
  },

  async execute(settings, interaction) {
    //interaction.deferUpdate();

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("start_application")
          .setLabel("Get Started!")
          .setStyle("SUCCESS")
          .setDisabled(true)
      )
      .addComponents(
        new MessageButton()
          .setCustomId("cancel_application")
          .setLabel("Cancel")
          .setStyle("DANGER")
      );

    interaction.update({ components: [row] });

    const tlApp = new TLApplication({
      userId: interaction.user.id,
      client: interaction.client,
      settings: settings,
    });

    await tlApp.start();
  },
};
