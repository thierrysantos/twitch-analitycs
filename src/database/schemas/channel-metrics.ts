import { Schema, model, Document } from 'mongoose';

export interface ChannelMetrics {
  username: string;
  channel: string;
  date: Date;
  bits: number;
  subs: number;
  isSub: boolean;
  isPrime: boolean;
  isMod: boolean;
  isVip: boolean;
}

export const ChannelMetricsSchema = new Schema<Document<ChannelMetrics>>(
  {
    username: String,
    channel: String,
    date: Date,
    bits: Number,
    subs: Number,
    isSub: Boolean,
    isPrime: Boolean,
    isMod: Boolean,
    isVip: Boolean,
  },
  {
    timestamps: true,
  },
);

export const ChannelMetricsModel = model(
  'ChannelMetrics',
  ChannelMetricsSchema,
);
