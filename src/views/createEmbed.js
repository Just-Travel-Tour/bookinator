import { EmbedBuilder } from "discord.js";
import { generateTaskLink } from "../utils/generateLink.js";
import { environmentToEmoji } from "../utils/environment.js";

export const embedTitlePrefix = "Teste Homol: ";
const emptyField = { name: "\t", value: "\t" };

export function createEmbed({
  taskCode,
  taskTimeStart,
  taskTimeEnd,
  taskTester,
  modifiedBy,
  modifiedByIcon,
  stateLabel,
  embedColor,
  reason,
  link = "",
  environment = "",
}) {
  const embed = new EmbedBuilder()
    .setTitle(embedTitlePrefix + taskCode)
    .setColor(embedColor)
    .setDescription(
      "*Ao reagendar ou finalizar a tarefa, avise aos próximos da fila que homol liberou*"
    )
    .setTimestamp();

  const taskLink = link || generateTaskLink(taskCode);

  embed.addFields({ name: "Estado", value: stateLabel, inline: true });

  embed.addFields({
    name: "Ambiente",
    value: environmentToEmoji(environment),
    inline: true,
  });

  if (taskLink) {
    embed.addFields({
      name: "Link(s) da atividade",
      value: taskLink,
      inline: true,
    });
  }

  embed.addFields(
    emptyField,
    { name: "Expectativa de início", value: taskTimeStart, inline: true },
    { name: "Expectativa de término", value: taskTimeEnd, inline: true },
    emptyField
  );

  embed.addFields({
    name: "Quem irá utilizar o ambiente",
    value: taskTester,
    inline: false,
  });

  let footerText = "";

  if (reason) {
    footerText += `Motivo de reagendamento: ${reason}\n`;
  }

  if (modifiedBy) {
    footerText += `Modificado por: ${modifiedBy}`;
  }

  if (footerText) {
    embed.setFooter({
      text: footerText,
      iconURL: modifiedByIcon,
    });
  }

  return embed;
}
