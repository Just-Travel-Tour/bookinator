import { embedTitlePrefix } from "../views/index.js";

export async function doneUsageReply(interaction) {
  const newStateId = interaction.customId;
  const prevEmbed = interaction.message.embeds[0];
  const prevEmbedData = prevEmbed.toJSON();
  const oldState = prevEmbedData.fields.find(
    (field) => field.name === "Estado"
  ).value;
  const taskCode = prevEmbedData.title.replace(embedTitlePrefix, "");

  if (
    oldState === "🔴 Em teste" &&
    (newStateId === "complete_test" || newStateId === "reschedule")
  ) {
    await interaction.channel.send(
      `📢 A atividade "${taskCode}" saiu de homologação`
    );
  }
}
