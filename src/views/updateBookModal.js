import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { getCurrentDate } from '../utils/index.js';

export function updateBookModal() {
  const currentDate = getCurrentDate()

  const modal = new ModalBuilder()
    .setCustomId('updateBookModal')
    .setTitle('Informações sobre o agendamento');

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('date')
        .setLabel('Data')
        .setPlaceholder('DD/MM/AAAA')
        .setValue(currentDate)
        .setRequired(false)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('startTime')
        .setLabel('Expectativa de início (- = Em fila)')
        .setPlaceholder('HH:MM | -')
        .setRequired(false)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('endTime')
        .setLabel('Expectativa de término (- = Nenhuma)')
        .setPlaceholder('HH:MM | -')
        .setRequired(false)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('reason')
        .setLabel('Justificativa')
        .setPlaceholder('Motivo para o reagendamento')
        .setRequired(false)
        .setStyle(TextInputStyle.Short)
    ),
  );

  return modal;
}