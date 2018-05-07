import dotenv from 'dotenv'
import _ from 'lodash'
import Discord from 'discord.js'
import Helper from './helpers'
import WowTokenService from './blizzard/wowTokenService'
import AuctionService from './blizzard/auctionService'
import ItemService from './blizzard/itemService'

dotenv.load()

const commandPrefix = process.env.COMMAND_PREFIX
const client = new Discord.Client()
const helper = new Helper()
const wowTokenService = new WowTokenService()
const auctionService = new AuctionService()
const itemService = new ItemService()

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
      .then((unformattedPrice) => {
        let price = helper.getFormattedPrice(unformattedPrice)
        message.channel.send(`${message.author.toString()} :moneybag: ${price.gold}g ${price.silver}s ${price.copper}c`)
      })
  }

  if (command === 'price') {
    if (args.length === 0) {
      message.channel.send('usage: !price <itemId>')
      return
    }

    auctionService
      .price(args[0])
      .then((items) => {
        if (items.length === 0) {
          message.channel.send('i did not find that item on the AH')
        }

        _.forEach(items, (ahItem) => {
          itemService
            .getItemById(ahItem.item)
            .then((item) => {
              let bid = helper.getFormattedPrice(ahItem.bid)
              let buyout = helper.getFormattedPrice(ahItem.buyout)

              message.channel.send(`${item.name} - ${ahItem.owner} \n quantity: ${ahItem.quantity} \n bid: ${bid.gold}g ${bid.silver}s ${bid.copper}c \n buyout: ${buyout.gold}g ${buyout.silver}s ${buyout.copper}c`)
            })
            .catch((err) => {
              console.log(err)
              message.channel.send(err)
            })
        })
      })
      .catch((err) => {
        message.channel.send(err)
      })
  }

  if (command === 'ah-scan') {
    if (message.author.toString() !== process.env.BOT_ADMIN) {
      message.channel.send('you do not have permission to execute that command')
    }

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
    if (message.author.toString() !== process.env.BOT_ADMIN) {
      message.channel.send('you do not have permission to execute that command')
    }

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
    if (message.author.toString() !== process.env.BOT_ADMIN) {
      message.channel.send('you do not have permission to execute that command')
    }

    process.exit(0)
  }
})

client.login(process.env.DISCORD_TOKEN)
