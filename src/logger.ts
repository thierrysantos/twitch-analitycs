import pino, { Logger } from 'pino';

export default (app: string): Logger =>
  pino({
    name: app,
    nestedKey: 'data',
    formatters: {
      level: label => ({ level: label }),
    },
    messageKey: 'message',
    timestamp: pino.stdTimeFunctions.isoTime,
  });
