export function normalizeHourView(hour, isStart) {
  if (isStart && hour === '-') {
    return "Em fila aguardando outros testes";
  }
  if (!isStart && hour === '-') {
    return "Sem expectativa de hora para finalização";
  }
  if (!isStart) {
    return hour;
  }
  return `às ${hour}`;
}