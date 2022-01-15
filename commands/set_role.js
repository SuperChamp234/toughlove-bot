const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set_role")
    .setDescription("Sets role which has access to admin commands")
    .setDefaultPermission(false)
    .addRoleOption((option) =>
      option.setName("role").setDescription("Name of role").setRequired(true)
    ),

  async execute(settings, interaction) {
    await interaction.deferReply();
    const role = await interaction.options.getRole("role");
    if (role && role.id) {
      await settings.setRoleId(role.id);
      await interaction.editReply(`✅ Role set to ${role.name}!`);
    }
  },
};
