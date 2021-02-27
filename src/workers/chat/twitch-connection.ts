import TwitchJs from 'twitch-js';
import createLogger from '../../logger';

const logger = createLogger('twitch-client');

type CreateConnectionRequest = {
  token: string;
  username: string;
};

export const createConnection = async ({
  token,
  username,
}: CreateConnectionRequest): Promise<TwitchJs> => {
  const client = new TwitchJs({
    username,
    token,
    log: {
      enabled: false,
    },
  });

  logger.info('connect to twitch');
  await client.chat.connect();
  logger.info('connect to twitch successful');

  return client;
};
