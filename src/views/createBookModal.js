import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { getCurrentDate } from "../utils/index.js";

export function createBookModal(environment = "1") {
  const currentDate = getCurrentDate();

  const modal = new ModalBuilder()
    .setCustomId("createBookModal" + environment)
    .setTitle("Informações sobre o agendamento");

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("taskCode")
        .setLabel("Codigo da atividade (Ou descrição)")
        .setPlaceholder("JTV2-000")
        .setValue("JTV2-")
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("date")
        .setLabel("Data")
        .setPlaceholder("DD/MM/AAAA")
        .setValue(currentDate)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("startTime")
        .setLabel("Expectativa de início (- = Em fila)")
        .setPlaceholder("HH:MM | -")
        .setRequired(false)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("endTime")
        .setLabel("Expectativa de término (- = Nenhuma)")
        .setPlaceholder("HH:MM | -")
        .setRequired(false)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("taskTester")
        .setLabel("Quem irá testar? (+ onde irá testar)")
        .setPlaceholder("(Tech | Produto | Usuário) + ( V1 | V2 )")
        .setStyle(TextInputStyle.Short)
    )
  );

  return modal;
}
