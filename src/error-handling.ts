import { Logger } from 'pino';

export const uncaughtException = (logger: Logger) => (error: Error): void => {
  logger.fatal(
    {
      name: 'UNCAUGHT_EXCEPTION',
      stack: error.stack,
      message: error.message,
    },
    'uncaughtException',
  );
  process.exit(1);
};

export const unhandledRejection = (
  reason: unknown | null | undefined,
): void => {
  throw reason;
};

export const gracefullyShutdown = (
  logger: Logger,
  database: typeof import('mongoose'),
) => async (): Promise<void> => {
  logger.info('SIGTERM signal received');
  await database.disconnect();
  process.exit(0);
};
