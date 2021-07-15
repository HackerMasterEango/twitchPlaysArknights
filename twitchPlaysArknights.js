const arknightsAutomationFn = require('./arknightsAutomation')
const tmi = require('tmi.js');
const { parse } = require('./parser');

const client = new tmi.Client({
	channels: [ 'eango_' ]
});

client.connect();


client.on('message', (channel, tags, message, self) => {
	if (self) return true;
	console.log(`${tags['display-name']}: ${message}`);
	const result = parse(message)
	result && arknightsAutomationFn[result.fn](...result.args);
});

