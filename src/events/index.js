import { onModalSubmit } from "./onModalSubmit.js";
import { onSlashCommand } from './onSlashCommand.js'
import { onButtonInteraction } from './onButtonInteraction.js'
import { onReady } from './onReady.js'

export async function onInteraction(interaction) {
  printInteraction(interaction)

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

function printInteraction(interaction) {
  let interactionType = "Unknown";
  let interactionCommand = "";
  
  if (interaction.isButton()) {
    interactionType = "Button";
    interactionCommand = interaction.customId
  }
  if (interaction.isChatInputCommand()) {
    interactionType = "Slash Command";
    interactionCommand = interaction.commandName
  }
  if (interaction.isModalSubmit()) {
    interactionType = "Modal Submit";
  }

  console.log({
    type: interactionType,
    command: interactionCommand,
  })
}

export { onReady }