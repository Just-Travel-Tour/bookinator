import { handleUpdateEnvironment } from "../utils/environment.js";
import {
  createButtons,
  createEmbed,
  embedTitlePrefix,
} from "../views/index.js";

export async function updateEmbedHandler(interaction, updateData) {
  try {
    const prevEmbed = interaction.message.embeds[0];

    const prevEmbedData = prevEmbed.toJSON();

    function findDataFromField(fieldName, title) {
      return (
        updateData[fieldName] ||
        prevEmbedData.fields.find((field) => field.name === title)?.value
      );
    }

    const updatedFields = {
      taskCode:
        updateData?.taskCode ||
        prevEmbedData.title.replace(embedTitlePrefix, ""),
      taskTimeStart: findDataFromField(
        "taskTimeStart",
        "Expectativa de início"
      ),
      taskTimeEnd: findDataFromField("taskTimeEnd", "Expectativa de término"),
      taskTester: findDataFromField(
        "taskTester",
        "Testador & Projeto"
      ),
      stateLabel: findDataFromField("stateLabel", "Estado"),
      embedColor: updateData?.embedColor || prevEmbedData.color,
      link: findDataFromField("link", "Link(s) da atividade"),
      environment: handleUpdateEnvironment(
        findDataFromField("environment", "Ambiente"),
        updateData.changeEnvironment
      ),
    };

    // get reason from footer if it has one
    if (
      updateData?.reason ||
      prevEmbedData.footer.text.includes("Motivo de reagendamento: ")
    ) {
      const reason =
        updateData?.reason ||
        prevEmbedData.footer.text
          .replace("Motivo de reagendamento: ", "")
          .split("\n")[0];

      updatedFields.reason = reason;
    }

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
