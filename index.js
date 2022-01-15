#!/usr/bin/env node

const fs = require("fs");
const { Client, Intents } = require("discord.js");
const { token, bugsnagApiKey } = require("./config.json");
const Redis = require("redis");
const Bugsnag = require("@bugsnag/js");

const Settings = require("./settings.js");

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost",
});

if (bugsnagApiKey) {
  Bugsnag.start({ apiKey: bugsnagApiKey });
}

const intents = new Intents();
intents.add(
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS
);

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
const discordClient = new Client({
  intents: intents,
  partials: ["CHANNEL", "MESSAGE"],
});

redisClient.connect().then(async () => {
  const settings = new Settings(redisClient);

  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    console.log("Registering Event - ", event.name);
    if (event.once) {
      discordClient.once(event.name, (...args) => {
        try {
          event.execute(settings, ...args);
        } catch (e) {
          console.error(e);

          if (bugsnagApiKey) {
            Bugsnag.notify(e);
          }
        }
      });
    } else {
      discordClient.on(event.name, (...args) => {
        try {
          event.execute(settings, ...args);
        } catch (e) {
          console.error(e);

          if (bugsnagApiKey) {
            Bugsnag.notify(e);
          }
        }
      });
    }
  }

  discordClient.login(token);
});
