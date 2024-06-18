// Require the necessary discord.js classes
import { Client, Events, Partials, GatewayIntentBits } from "discord.js";
import { buildCommands } from "./commands/buildCommands.js";
import { onInteraction, onReady } from "./events/index.js";
import "./keep_alive.js"

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = await buildCommands()

client.once(Events.ClientReady, onReady);

client.on(Events.InteractionCreate, onInteraction);

client.login(process.env.DISCORD_TOKEN);