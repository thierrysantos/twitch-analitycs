import 'dotenv/config'
import { createConnection as createTwitchConnection } from './twitch-connection'
import { createConnection as createDatabaseConnection } from './database-connection'
import { UserStateTags } from 'twitch-js'
import { format } from 'date-fns'

let cache = {}

const {
  TOKEN,
  USERNAME
} = process.env

export const start = async () => {
  const token = TOKEN || ''
  const username = USERNAME || ''

  const [{ chat }] = await Promise.all([
    createTwitchConnection({ token, username }),
    createDatabaseConnection()
  ])

  await chat.join('#gaules')

  chat.on('PRIVMSG', ({ tags, channel, timestamp }) => {
    const userState = tags as UserStateTags
    const today = format(timestamp, 'yyyy-MM-dd')

    const key = `${channel}:${userState.username}:${today}`

    const payload = {
      channel,
      username: userState.username,
      date: today,
      bits: Number(userState.badges.bits) || 0,
      isSub: !!Number(userState.subscriber),
      isPrime: Boolean(userState.badges.premium),
      isMod: userState.isModerator,
      isVip: Boolean(userState.badges.vip),
    }

    cache = {
      ...cache,
      [key]: payload
    }

    console.log(cache)
  })
}

start()