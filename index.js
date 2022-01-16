#!/usr/bin/env node

const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const Redis = require("redis");
const { Client, Intents } = require("discord.js");
const Bugsnag = require("@bugsnag/js");

const Settings = require("./settings.js");

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost",
});

if (process.env.BUGSNAG_API_KEY) {
  Bugsnag.start({ apiKey: process.env.BUGSNAG_API_KEY });
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

          if (process.env.BUGSNAG_API_KEY) {
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

          if (process.env.BUGSNAG_API_KEY) {
            Bugsnag.notify(e);
          }
        }
      });
    }
  }

  if (process.env.DISCORD_TOKEN) {
    discordClient.login(process.env.DISCORD_TOKEN);
  } else {
    throw new Error("DISCORD_TOKEN environment variable not found");
  }
});
