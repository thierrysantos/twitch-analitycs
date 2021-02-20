import pino from 'pino'

export default (app: string) => pino({
  name: app,
  nestedKey: 'data',
  formatters: {
    level: label => ({ level: label }),
  },
  messageKey: 'message',
  timestamp: pino.stdTimeFunctions.isoTime,
})
