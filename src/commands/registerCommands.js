import { REST, Routes } from "discord.js";
import { commandsList } from "./commandsList.js";

const commands = (await commandsList()).map((command) => command.data.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

try {
  console.log(
    `Started refreshing ${commands.length} application (/) commands.`
  );

  // The put method is used to fully refresh all commands in the guild with the current set
  const data = await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  );

  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
  // And of course, make sure you catch and log any errors!
  console.error(error);
}
