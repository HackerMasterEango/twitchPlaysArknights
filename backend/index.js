const tmi = require('tmi.js')
const arknightsAutomationFn = require('./arknightsAutomation')

const { parse } = require('./parser')

const map = require(process.argv[2])

const twitchChannelName = process.argv[3]

// add authentication?
const client = new tmi.Client({
  channels: [twitchChannelName]
})

client.connect()

client.on('message', (channel, tags, message, self) => {
  if (self) return true
  console.log(`${tags['display-name']}: ${message}`)
  const result = parse(message)

  console.log(arknightsAutomationFn[result.fn])
  console.log(process.argv[2])

  result && arknightsAutomationFn[result.fn](...result.args, map)
})
