import { updateEmbedHandler } from "../handlers/updateBook.js";
import { doneUsageReply, getState } from "../utils/index.js";
import { updateBookModal } from "../views/updateBookModal.js";

export async function onButtonInteraction(interaction) {
  if (!interaction.isButton()) return;

  if (
    ["run_test", "complete_test", "deploy_test"].includes(interaction.customId)
  ) {
    updateEmbedHandler(interaction, getState(interaction.customId));
  }

  if (interaction.customId === "reschedule") {
    await interaction.showModal(updateBookModal());
  }

  if (interaction.customId === "change_environment") {
    updateEmbedHandler(interaction, { changeEnvironment: true });
  }

  // await doneUsageReply(interaction);
}
