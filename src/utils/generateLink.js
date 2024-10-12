const linkPrefix = process.env.TASK_LINK_PREFIX;
const projectPrefixes = process.env.PROJECT_PREFIXES.split(',');

export function generateTaskLink(description) {
  const regex = new RegExp(`\\b(${projectPrefixes.join('|')})-\\d+\\b`, 'g');
  const matches = description.match(regex);

  if (matches) {
    return matches.map(match => `[${match}](${linkPrefix}${match})`).join('\n');
  }

  return '';
}