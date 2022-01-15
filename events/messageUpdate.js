const TLApplication = require("../tl_application.js");

module.exports = {
  name: "messageUpdate",
  async execute(settings, oldMessage, newMessage) {
    // Ignore messages sent by us.
    if (newMessage.author.id === newMessage.client.user.id) return;

    // if message is a DM
    if (newMessage.guild === null) {
      const tlApp = new TLApplication({
        userId: newMessage.author.id,
        client: newMessage.client,
        settings: settings,
      });

      tlApp.onUserMessageUpdate(oldMessage, newMessage);

      // if message is in channel
    } else {
      const tlApp = new TLApplication({
        threadId: newMessage.channelId,
        client: newMessage.client,
        settings: settings,
      });

      tlApp.onThreadMessageUpdate(oldMessage, newMessage);
    }
  },
};
