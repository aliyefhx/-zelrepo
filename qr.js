/* Copyright (C) 2021
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Skueletor
*/

const chalk = require('chalk');
const {WAConnection, MessageOptions, MessageType} = require('@adiwajshing/baileys');
const { StringSession } = require('./whatsasena/');
const fs = require('fs');

async function whatsAsena () {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.version = [2, 2119, 6]
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 50000;
    
    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Skueletor')}${chalk.blue.bold('Bot')}
    ${chalk.white.italic('Skueletor Bot QRcode')}
    ${chalk.blue.italic('ℹ️  Connecting to Whatsapp... Please Wait.')}`);
});
    

    conn.on('open', () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold('SkueletorBot String Code: '), Session.createStringSession(conn.base64EncodedAuthInfo())
        );
        
        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `ASENA_SESSION="${st}"`);
        }
        if (conn.user.jid.startsWith('51')) {
            conn.sendMessage(conn.user.jid,st, MessageType.text)
            conn.sendMessage(conn.user.jid,'*Por favor, No compartas este codigo con nadie!*', MessageType.text)
        }
        else {
            conn.sendMessage(conn.user.jid,st, MessageType.text)
            conn.sendMessage(conn.user.jid,'*Por favor, No compartas este codigo con nadie!*', MessageType.text)
        }
        console.log(
            chalk.blue.bold('If you are installing locale, you can start the bot with the node bot.js.')
        );
        process.exit(0);
    });

    await conn.connect();
}

whatsAsena()
