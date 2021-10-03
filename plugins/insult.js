const Skueletor = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');
const Config = require('../config')
const fs = require('fs');
const Language = require('../language');
const Lang = Language.getString('insult');

if (Config.WORKTYPE == 'private') {

Skueletor.addCommand({pattern: 'insult ?(.*)', fromMe: true, desc: Lang.EVINS_DESC}, async (message, match) => {
  if (message.reply_message === false) return await message.client.sendMessage(message.jid, Lang.NEED_LOCATIONA, MessageType.text);
	const url = `https://evilinsult.com/generate_insult.php?lang=es&type=json`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);


     await message.client.sendMessage(message.jid, '👿🤬 *Insulto para ' + '@' + message.reply_message.jid.split('@')[0] + ':' + '* ```' + json.insult + '```\n\nHecho por *Skueletor*', MessageType.text, {
          quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
});
  
  if (Config.WORKTYPE == 'public') {

Skueletor.addCommand({pattern: 'insult ?(.*)', fromMe: false, desc: Lang.EVINS_DESC}, async (message, match) => {
  if (message.reply_message === false) return await message.client.sendMessage(message.jid, Lang.NEED_LOCATIONA, MessageType.text);
	const url = `https://evilinsult.com/generate_insult.php?lang=es&type=json`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);


     await message.client.sendMessage(message.jid, '👿🤬 *Insulto para ' + '@' + message.reply_message.jid.split('@')[0] + ':' + '* ```' + json.insult + '```\n\nHecho por *Skueletor*', MessageType.text, {
          quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
});
