import {
  ChannelMetrics,
  ChannelMetricsModel,
} from '../../database/schemas/channel-metrics';
import { Chat, UserStateTags } from 'twitch-js';
import createLogger from '../../logger';

const logger = createLogger('channel-processing');

type MultiChannelProcessingRequest = {
  chat: Chat;
  channels: string[];
};

type ChannelProcessingRequest = {
  chat: Chat;
  channel: string;
};

const channelProcessing = async ({
  chat,
  channel,
}: ChannelProcessingRequest) => {
  logger.info(
    {
      channel,
    },
    'connecting to channel',
  );
  const { roomState } = await chat.join(channel);
  logger.info(
    {
      channel,
      roomState,
    },
    'connected to channel',
  );

  chat.on('PRIVMSG', async ({ tags, channel, timestamp }) => {
    const userState = tags as UserStateTags;

    const payload: ChannelMetrics = {
      channel,
      username: userState.username,
      date: new Date(timestamp.setHours(0, 0, 0, 0)),
      bits: Number(userState.badges.bits) || 0,
      subs: Number(userState.badges.subscriber) || 0,
      isSub: Number(userState.subscriber) > 0,
      isPrime: Boolean(userState.badges.premium),
      isMod: userState.isModerator,
      isVip: Boolean(userState.badges.vip),
    };

    await ChannelMetricsModel.findOneAndUpdate(
      {
        channel: payload.channel,
        username: payload.username,
        date: payload.date,
      },
      payload,
      { upsert: true, useFindAndModify: false },
    );
  });
};

export const multiChannelProcessing = async ({
  chat,
  channels,
}: MultiChannelProcessingRequest): Promise<void> => {
  await Promise.all(
    channels.map(async channel => {
      await channelProcessing({ chat, channel });
    }),
  );
};
