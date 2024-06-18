import { onModalSubmit } from "./onModalSubmit.js";
import { onSlashCommand } from './onSlashCommand.js'
import { onButtonInteraction } from './onButtonInteraction.js'
import { onReady } from './onReady.js'

export async function onInteraction(interaction) {
  if (interaction.isButton()) {
    onButtonInteraction(interaction);
    return
  }

  if (interaction.isChatInputCommand()) {
    onSlashCommand(interaction);
    return
  }

  if (interaction.isModalSubmit()) {
    onModalSubmit(interaction)
    return
  }
}

export { onReady }