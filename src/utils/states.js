const states = {
  schedule: { isFinished: false, stateLabel: '🟡 Agendado', embedColor: 0xF7CA18 },
  reschedule: { isFinished: false, stateLabel: '🟡 Reagendado', embedColor: 0xF7CA18 },
  run_test: { isFinished: false, stateLabel: '🔴 Em teste', embedColor: 0xFF0000 },
  complete_test: { isFinished: true, stateLabel: '🔵 Concluído', embedColor: 0x5539CC }
}

export function getState(state) {
  return states[state] || {}
}
