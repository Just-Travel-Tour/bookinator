export function normalizeHourView(hour, isStart) {
  if (isStart && hour === '-') {
    return "Em fila";
  }
  if (!isStart && hour === '-') {
    return "Sem expectativa";
  }
  if (!isStart) {
    return hour;
  }
  return `às ${hour}`;
}