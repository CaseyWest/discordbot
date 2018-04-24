import dotenv from 'dotenv'
import Discord from 'discord.js'
import WowTokenService from './blizzard/tokenservice'

dotenv.load()

const commandPrefix = process.env.COMMAND_PREFIX
const client = new Discord.Client()
const tokenService = new WowTokenService()

client.on('ready', () => {
  console.log('ready')
})

client.on('message', (message) => {
  if (message.author.bot) return
  if (message.content.indexOf(commandPrefix) !== 0) return

  const args = message.content.slice(commandPrefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (command === 'ping') {
    message.channel.send('pong')
  }

  if (command === 'token') {
    tokenService
      .getPrice()
      .then((price) => {
        message.channel.send(`the current price of a wow token is ${price}`)
      })
  }

  if (command === 'price') {
    message.channel.send('usage: !price <itemId>')
  }
})

client.login(process.env.DISCORD_TOKEN)
