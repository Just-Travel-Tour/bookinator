import { SlashCommandBuilder } from "discord.js";
import { createBookModal } from "../../views/createBookModal.js";

export const data = new SlashCommandBuilder()
  .setName("book_homol1")
  .setDescription(
    "Preenchimento das informações para reservar o ambiente de homol"
  );

export async function execute(interaction) {
  await interaction.showModal(createBookModal("1"));
}
