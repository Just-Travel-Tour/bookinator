export function environmentToEmoji(environment) {
  if (environment === "1") return "1️⃣";
  if (environment === "2") return "2️⃣";
  return environment;
}

export function handleUpdateEnvironment(prevEnvironment, changeEnvironment) {
  if (!changeEnvironment) return prevEnvironment;
  const newEnvironment = prevEnvironment === "1️⃣" ? "2️⃣" : "1️⃣";
  return newEnvironment;
}
