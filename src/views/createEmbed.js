import { EmbedBuilder } from "discord.js";

export function createEmbed({
  taskCode,
  taskTimeStart,
  taskTimeEnd,
  taskTester,
  modifiedBy,
  modifiedByIcon,
  stateLabel,
  embedColor
}) {
  const embed = new EmbedBuilder()
    .setTitle("Testes em ambiente de homol")
    .setColor(embedColor)
    .setDescription("*Em caso de reagendamento ou finalização da tarefa, avise aos outros da fila que seu teste já finalizou.*")
    .addFields(
      { name: "Estado", value: stateLabel, inline: true },
      { name: "Codigo da atividade / Descrição", value: taskCode, inline: false },
      { name: "Expectativa de início", value: taskTimeStart, inline: true },
      { name: "Expectativa de término", value: taskTimeEnd, inline: true },
      { name: "Quem irá utilizar o ambiente", value: taskTester, inline: false }
    );

  if (modifiedBy) {
    embed.setFooter({ text: `Modificado por: ${modifiedBy}`, iconURL: modifiedByIcon });
  }

  return embed;
}