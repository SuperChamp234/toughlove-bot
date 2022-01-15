const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set_channel")
    .setDescription("Sets channels where applications are posted")
    .setDefaultPermission(false)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Name of channel")
        .setRequired(true)
    ),

  async execute(settings, interaction) {
    await interaction.deferReply();
    const channel = await interaction.options.getChannel("channel");
    if (channel && channel.id) {
      await settings.setChannelId(channel.id);
      await interaction.editReply(`✅ Channel set to <#${channel.id}>!`);
    }
  },
};
