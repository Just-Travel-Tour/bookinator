import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function createButtons() {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("change_environment")
      .setEmoji("🔁")
      .setLabel("Trocar ambiente")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("deploy_test")
      .setEmoji("⬆")
      .setLabel("Em homol")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("reschedule")
      .setEmoji("📅")
      .setLabel("Reagendar")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("run_test")
      .setEmoji("▶️")
      .setLabel("Iniciar")
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId("complete_test")
      .setEmoji("✅")
      .setLabel("Concluir")
      .setStyle(ButtonStyle.Primary)
  );
  return row;
}
