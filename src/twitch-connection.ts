import TwitchJs from 'twitch-js'

type CreateConnectionRequest = {
  token: string
  username: string
}

export const createConnection = async ({ token, username }: CreateConnectionRequest) => {
  const client = new TwitchJs({ 
    username, 
    token, 
    log: {
      enabled: false
    }
  })

  await client.chat.connect()

  return client
}