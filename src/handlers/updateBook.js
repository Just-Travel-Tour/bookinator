import {
  createButtons,
  createEmbed,
  embedTitlePrefix,
} from "../views/index.js";

export async function updateEmbedHandler(interaction, updateData) {
  try {
    const prevEmbed = interaction.message.embeds[0];

    const prevEmbedData = prevEmbed.toJSON();

    const updatedFields = {
      taskCode:
        updateData?.taskCode ||
        prevEmbedData.title.replace(embedTitlePrefix, ""),
      taskTimeStart:
        updateData?.taskTimeStart ||
        prevEmbedData.fields.find(
          (field) => field.name === "Expectativa de início"
        ).value,
      taskTimeEnd:
        updateData?.taskTimeEnd ||
        prevEmbedData.fields.find(
          (field) => field.name === "Expectativa de término"
        ).value,
      taskTester:
        updateData?.taskTester ||
        prevEmbedData.fields.find(
          (field) => field.name === "Quem irá utilizar o ambiente"
        ).value,
      stateLabel:
        updateData?.stateLabel ||
        prevEmbedData.fields.find((field) => field.name === "Estado").value,
      embedColor: updateData?.embedColor || prevEmbedData.color,
      reason:
        updateData?.reason ||
        prevEmbedData.fields.find(
          (field) => field.name === "Motivo de reagendamento"
        )?.value ||
        undefined,
      link:
        prevEmbedData.fields.find(
          (field) => field.name === "Link(s) da atividade"
        )?.value || "",
    };

    const embed = createEmbed({
      ...updatedFields,
      modifiedBy: interaction.user.username,
      modifiedByIcon: interaction.user.displayAvatarURL(),
    });

    const components = updateData.isFinished ? [] : [createButtons()];

    await interaction.update({ embeds: [embed], components });
  } catch (error) {
    console.error("Erro ao atualizar o embed:", error);
  }
}
