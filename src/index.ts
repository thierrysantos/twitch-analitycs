import 'dotenv/config'
import { createConnection as createTwitchConnection } from './twitch-connection'
import { createConnection as createDatabaseConnection } from './database/connection'
import { multiChannelProcessing } from './multi-channel-processing'
import createLogger from './logger'

const {
  TOKEN,
  USERNAME
} = process.env

const logger = createLogger('application')

process.on("uncaughtException", (error) => {
  logger.fatal("uncaughtException", {
    name: "UNCAUGHT_EXCEPTION",
    stack: error.stack,
    message: error.message,
  });
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  throw reason;
});

export const start = async () => {
  const token = TOKEN || ''
  const username = USERNAME || ''

  const [{ chat }, database] = await Promise.all([
    createTwitchConnection({ token, username }),
    createDatabaseConnection()
  ])

  await multiChannelProcessing({
    chat,
    channels: ['#gaules', '#ale_apoka', '#ziGueira', '#baiano', '#riotgamesbrazil']
  })

  process.on("SIGTERM", async () => {
    logger.info("SIGTERM signal received");
    await database.disconnect();
    process.exit(0);
  });
}

(async () => {
  await start()
})()