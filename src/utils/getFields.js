import { normalizeHourView } from "./normalizeHourView.js";
import { getState } from "./states.js";

export function getFields(fields, state, rest = {}) {
  const taskCode = fields.get("taskCode")?.value || null
  const date = fields.get("date")?.value || null
  const startTime = fields.get("startTime")?.value || "-"
  const endTime = fields.get("endTime")?.value || "-"
  const taskTester = fields.get("taskTester")?.value || null
  const reason = fields.get("reason")?.value || null

  const taskTimeStart = `${date} ${normalizeHourView(startTime, true)}`
  const taskTimeEnd = normalizeHourView(endTime, false)

  return {
    ...(taskCode && { taskCode }),
    taskTimeStart,
    taskTimeEnd,
    ...(taskTester && { taskTester }),
    ...(reason && { reason }),
    ...rest,
    ...getState(state)
  }
}