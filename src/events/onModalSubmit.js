import { createBookHandler } from "../handlers/createBook.js";
import { updateEmbedHandler } from "../handlers/updateBook.js";
import { getFields } from "../utils/getFields.js";

export async function onModalSubmit(interaction) {
  if (!interaction.isModalSubmit()) return;

  const modificationData = {
    modifiedBy: interaction.user.username,
    modifiedByIcon: interaction.user.displayAvatarURL(),
  };

  if (interaction.customId.startsWith("createBookModal")) {
    const environment = interaction.customId.replace("createBookModal", "");
    modificationData.environment = environment;

    const updateData = getFields(
      interaction.fields.fields,
      "schedule",
      modificationData
    );
    await createBookHandler(interaction, updateData);
  }

  if (interaction.customId === "updateBookModal") {
    const updateData = getFields(
      interaction.fields.fields,
      "reschedule",
      modificationData
    );
    await updateEmbedHandler(interaction, updateData);
  }
}
