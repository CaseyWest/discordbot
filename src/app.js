import dotenv from 'dotenv'
import Discord from 'discord.js'
import WowTokenService from './blizzard/wowTokenService'
import AuctionService from './blizzard/auctionService'

dotenv.load()

const commandPrefix = process.env.COMMAND_PREFIX
const client = new Discord.Client()
const wowTokenService = new WowTokenService()
const auctionService = new AuctionService()

client.on('ready', () => { })

client.on('message', (message) => {
  if (message.author.bot) return
  if (message.content.indexOf(commandPrefix) !== 0) return

  const args = message.content.slice(commandPrefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (command === 'ping') {
    message.channel.send('pong')
  }

  if (command === 'token') {
    wowTokenService
      .getPrice()
      .then((price) => {
        price = price.toString()
        var copper = price.substring(price.length, price.length - 2)
        var silver = price.substring(price.length - 2, price.length - 4)
        var gold = Number(price.substring(0, price.length - 4)).toLocaleString(undefined, {maximumFractionDigits: 0})

        message.channel.send(`${message.author.toString()} :moneybag: ${gold}g ${silver}s ${copper}c`)
      })
  }

  if (command === 'price') {
    message.channel.send('usage: !price <itemId>')
  }

  if (command === 'ah-scan') {
    message.channel.send('this may take a few minutes')
    auctionService
      .scan()
      .then((msg) => {
        message.channel.send(msg)
      })
      .then(() => {
        message.channel.send('loading db')
        auctionService
          .loadDb()
          .then((msg) => {
            message.channel.send(msg)
          })
          .catch((err) => {
            message.channel.send(err)
          })
      })
  }

  if (command === 'ah-dbload') {
    message.channel.send('loading db')
    auctionService
      .loadDb()
      .then((msg) => {
        message.channel.send(msg)
      })
      .catch((err) => {
        message.channel.send(err)
      })
  }

  if (command === 'cmds') {
    message.author.send('ping, token, price')
  }

  if (command === 'die') {
    process.exit(0)
  }
})

client.login(process.env.DISCORD_TOKEN)
