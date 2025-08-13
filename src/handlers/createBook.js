import { createButtons, createEmbed } from '../views/index.js';

export async function createBookHandler(interaction, updateData) {
  try {
    const embed = createEmbed(updateData)

    const components = updateData.isFinished ? [] : [createButtons()];

    await interaction.reply({ embeds: [embed], components });
  } catch (error) {
    console.error("Error creating book:", error);
  }
}