const {MessageType, GroupSettingChange, ChatModification, WAConnectionTest} = require('@adiwajshing/baileys');

const Asena = require('../events');
const Config = require('../config');
const Language = require('../language');
const Lang = Language.getString('admin');
const mut = Language.getString('mute');
const END = "clear all messages"

async function checkImAdmin(message, user = message.client.user.jid) {

    var grup = await message.client.groupMetadata(message.jid);

    var sonuc = grup['participants'].map((member) => {

        if (member.id.split('@')[0] === user.split('@')[0] && member.isAdmin) return true; else; return false;

    });

    return sonuc.includes(true);

}

Asena.addCommand({pattern: 'clear', fromMe: true, desc: END, dontAddCommandList: true}, (async (message, match) => {

    await message.sendMessage('Limpiando el chat 🦦\n\n´´´PD: Ignore este mensaje por favor, es una limpieza de la base de datos´´´');

    await message.client.modifyChat (message.jid, ChatModification.delete);

    await message.sendMessage('Mensajes del chat eliminados de la base de datos correctamente...✅\nHecho por *Skueletor* 🐺');
}));
