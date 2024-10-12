const linkPrefix = process.env.TASK_LINK_PREFIX;
const projectPrefixes = process.env.PROJECT_PREFIXES

export function generateTaskLink(description) {
  const prefixies = projectPrefixes?.split(',');
  const regex = new RegExp(`\\b(${prefixies.join('|')})-\\d+\\b`, 'g');
  const matches = description.match(regex);

  if (matches) {
    return matches.map(match => `[${match}](${linkPrefix}${match})`).join('\n');
  }

  return '';
}