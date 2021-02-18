import io from 'socket.io-client'

export const start = () => {
  const socket = io('wss://irc-ws.chat.twitch.tv', {
    secure: true, 
    reconnection: true, 
    rejectUnauthorized: false
  })

  socket.on("connect_error", (err: any) => {
    console.log({
      messagem: err.message,
      stack: err.stack
    })
  });

  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
}

start()