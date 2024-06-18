import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function createButtons() {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('run_test')
        .setEmoji('▶️')
        .setLabel('Iniciar teste')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('reschedule')
        .setEmoji('📅')
        .setLabel('Reagendar tarefa')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('complete_test')
        .setEmoji('✅')
        .setLabel('Concluir teste')
        .setStyle(ButtonStyle.Primary)
    );
  return row;
}