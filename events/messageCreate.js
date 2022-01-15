const TLApplication = require("../tl_application.js");

module.exports = {
  name: "messageCreate",
  async execute(settings, message) {
    // Ignore messages sent by us.
    if (message.author.id === message.client.user.id) return;

    // if message is a DM
    if (message.guild === null) {
      // TODO Check redis to see if user is a current_applicant.
      // Ignore DMs from all other users.

      const tlApp = new TLApplication({
        userId: message.author.id,
        client: message.client,
        settings: settings,
      });

      tlApp.onUserMessage(message);

      // every other message
    } else {
      // Listen only to messages from threads in our channel.
      const thread = await message.client.channels.fetch(message.channelId);
      const channelId = await settings.getChannelId();

      if (thread.isThread() && channelId == thread.parentId) {
        const tlApp = new TLApplication({
          threadId: message.channelId,
          client: message.client,
          settings: settings,
        });

        tlApp.onThreadMessage(message);
      }
    }
  },
};
