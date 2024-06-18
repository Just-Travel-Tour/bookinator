import { Collection } from 'discord.js';
import { commandsList } from './commandsList.js';

export async function buildCommands() {
  const commands = new Collection();
  const buildedCommands = await commandsList()

  for (const command of buildedCommands) {
    commands.set(command.data.name, command);
  }

  return commands;
}

