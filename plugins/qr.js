const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../config');
const request = require('request');
const got = require("got");

const Language = require('../language');
const Lang = Language.getString('qrgenerator');

if (Config.WORKTYPE == 'private') {

Asena.addCommand({pattern: 'qr ?(.*)', fromMe: true}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage("Generando QR...");

    var webimage = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${match[1].replace(/#/g, '\n')} `, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *Skueletor*',quoted: message.data,thumbnail: "https://telegra.ph/file/470496095696fab0eb394.jpg"})
}));
}
if (Config.WORKTYPE == 'public') {

Asena.addCommand({pattern: 'qr ?(.*)', fromMe: false}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage("Generando QR...");

    var webimage = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${match[1].replace(/#/g, '\n')} `, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *Skueletor*',quoted: message.data,thumbnail: "https://telegra.ph/file/470496095696fab0eb394.jpg"})
}));
}
