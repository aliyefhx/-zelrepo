const Skueletor = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const got = require('got');
const Config = require('../config')

const Language = require('../language');
const Lang = Language.getString('insult');

if (Config.WOKRTYPE == 'private') {

Skueletor.addCommand({pattern: 'insult ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.EVINS_DESC}, async (message, match) => {
	if (match[1] === 'xx') return await message.reply(Lang.NEED_LOCATIONA);
	const url = `https://evilinsult.com/generate_insult.php?lang=eS&type=json`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '\n\n 👿🤬 *Insulto:* ' + '```' + json.insult + '```\n\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDAC, MessageType.text);
	}
});
}

if (Config.WOKRTYPE == 'public') {

Skueletor.addCommand({pattern: 'insult ?(.*)', fromMe: false, onlyGroup: true, desc: Lang.EVINS_DESC}, async (message, match) => {
	if (match[1] === 'xx') return await message.reply(Lang.NEED_LOCATIONA);
	const url = `https://evilinsult.com/generate_insult.php?lang=eS&type=json`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '\n\n 👿🤬 *Insulto:* ' + '```' + json.insult + '```\n\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDAC, MessageType.text);
	}
});
}
