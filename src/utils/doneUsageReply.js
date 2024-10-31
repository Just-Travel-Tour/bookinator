export async function doneUsageReply(interaction) {
  const newStateId = interaction.customId
  const prevEmbed = interaction.message.embeds[0];
  const prevEmbedData = prevEmbed.toJSON();
  const oldState = prevEmbedData.fields.find((field) => field.name === "Estado").value;
  const taskCode = prevEmbedData.fields.find(field => field.name === "Codigo da atividade / Descrição").value

  if (
    oldState === "🔴 Em teste" &&
    (newStateId === "complete_test" || newStateId === "reschedule")
  ) {
    await interaction.channel.send(
      `📢 @Tecnologia, a atividade "${taskCode}" saiu de homologação`
    );
  }
}
