import { createButtons, createEmbed } from '../views/index.js';

export async function updateEmbedHandler(interaction, updateData) {
  try {
    const prevEmbed = interaction.message.embeds[0];

    const prevEmbedData = prevEmbed.toJSON();

    const updatedFields = {
      taskCode: updateData?.taskCode || prevEmbedData.fields.find(field => field.name === "Codigo da atividade / Descrição").value,
      taskTimeStart: updateData?.taskTimeStart || prevEmbedData.fields.find(field => field.name === "Expectativa de início").value,
      taskTimeEnd: updateData?.taskTimeEnd || prevEmbedData.fields.find(field => field.name === "Expectativa de término").value,
      taskTester: updateData?.taskTester || prevEmbedData.fields.find(field => field.name === "Quem irá utilizar o ambiente").value,
      stateLabel: updateData?.stateLabel || prevEmbedData.fields.find(field => field.name === "Estado").value,
      embedColor: updateData?.embedColor || prevEmbedData.color
    };

    const embed = createEmbed({
      ...updatedFields,
      modifiedBy: interaction.user.username,
      modifiedByIcon: interaction.user.displayAvatarURL()
    });

    const components = updateData.isFinished ? [] : [createButtons()];

    await interaction.update({ embeds: [embed], components });

  } catch (error) {
    console.error('Erro ao atualizar o embed:', error);
  }
}
