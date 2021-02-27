import 'dotenv/config';
import { createConnection as createTwitchConnection } from './twitch-connection';
import { createConnection as createDatabaseConnection } from '../../database/connection';
import { multiChannelProcessing } from './multi-channel-processing';
import createLogger from '../../logger';
import {
  gracefullyShutdown,
  uncaughtException,
  unhandledRejection,
} from '../../error-handling';

const { TOKEN, USERNAME } = process.env;

const logger = createLogger('worker');

process.on('uncaughtException', uncaughtException(logger));
process.on('unhandledRejection', unhandledRejection);

export const start = async (): Promise<void> => {
  const token = TOKEN || '';
  const username = USERNAME || '';

  const [{ chat }, database] = await Promise.all([
    createTwitchConnection({ token, username }),
    createDatabaseConnection(),
  ]);

  await multiChannelProcessing({
    chat,
    channels: [
      '#gaules',
      '#ale_apoka',
      '#ziGueira',
      '#baiano',
      '#riotgamesbrazil',
    ],
  });

  process.on('SIGTERM', gracefullyShutdown(logger, database));
};

(async () => {
  await start();
})();
