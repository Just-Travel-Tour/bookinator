import { EmbedBuilder } from "discord.js";
import { generateTaskLink } from "../utils/generateLink.js";

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
  link = ''
}) {
  const embed = new EmbedBuilder()
    .setTitle("Testes em ambiente de homol")
    .setColor(embedColor)
    .setDescription("*Em caso de reagendamento ou finalização da tarefa, avise aos outros da fila que seu teste já finalizou.*")
    .addFields(
      { name: "Estado", value: stateLabel, inline: true }
    );

  const taskLink = link || generateTaskLink(taskCode);

  if (taskLink) {
    embed.addFields(
      { name: "Link(s) da atividade", value: taskLink, inline: true }
    );
  }

  embed.addFields(
    { name: "Codigo da atividade / Descrição", value: taskCode, inline: false },
    { name: "Expectativa de início", value: taskTimeStart, inline: true },
    { name: "Expectativa de término", value: taskTimeEnd, inline: true },
    { name: "Quem irá utilizar o ambiente", value: taskTester, inline: false }
  );

  if (reason) {
    embed.addFields(
      { name: "Motivo de reagendamento", value: reason, inline: false }
    );
  }

  if (modifiedBy) {
    embed.setFooter({ text: `Modificado por: ${modifiedBy}`, iconURL: modifiedByIcon });
  }

  return embed;
}
