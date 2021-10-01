/* Copyright (C) 2021
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Skueletor
*/
const fs = require("fs");
const os = require("os");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const axios = require('axios');
const Heroku = require('heroku-client');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./whatsasena/');
    @@ -18,8 +17,6 @@ const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
  
const { DataTypes } = require('sequelize');
const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
const got = require('got');
const crypto = require('crypto');	
const nw = '```Blacklist Defected!```'
const simpleGit = require('simple-git');
const git = simpleGit();

const heroku = new Heroku({
    token: config.HEROKU.API_KEY
    @@ -77,23 +74,13 @@ Array.prototype.remove = function() {
  
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;
const Language = require('./language');
const Lang = Language.getString('updater');
// Sql
const WhatsAsenaDB = config.DATABASE.define('WhatsAsenaDuplicated', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});
const plugindb = require('./plugins/sql/plugin');
var OWN = { ff: '59171018245,0' }
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};
// ==================== Date Scanner ====================
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}
// ==================== End Date Scanner ====================
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
async function whatsAsena () {
    var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '' }
    var ggg = Buffer.from(clh.cd, 'base64')
    var ddd = ggg.toString('utf-8')
    clh.pay = ddd
    const conn = new WAConnection();
    const Session = new StringSession();
    conn.version = [2, 2119, 6]
    setInterval(async () => {
        var getGMTh = new Date().getHours()
        var getGMTm = new Date().getMinutes()
        await axios.get('https://gist.github.com/SkueletorTlg/5042861594e06bc0dd4d665ff12ff4a8/raw/').then(async (ann) => {
            const { infoes, infoen } = ann.data.announcements
            if (infoes !== '' && config.LANG == 'ES') {
                while (getGMTh == 11 && getGMTm == 42) {
                    return conn.sendMessage(conn.user.jid, '[ ```Anuncios``` ]\n\n' + infoes.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text)
                }	
            }	
            else if (infoen !== '' && config.LANG == 'EN') {
                while (getGMTh == 11 && getGMTm == 42) {
                    return conn.sendMessage(conn.user.jid, '[ ```Announcements``` ]\n\n' + infoen.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text)
                }
            }
        })
    }, 50000);
    var biography_var = ''
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        biography_var = vars.AUTO_BİO
    });
    setInterval(async () => {
        if (biography_var == 'true') {
                var ov_time = new Date().toLocaleString('ES', { timeZone: 'Europe/Madrid' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)	
    const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n Fecha y hora de España 🇪🇸 by Skueletor 🐺\n Proyecto en desarrollo. 🚧'
    await conn.setStatus(biography)
            }
    }, 7890);
    var insult = await axios.get('https://gist.githubusercontent.com/SkueletorTlg/c3f79c15bbf70aaf6c4af8e045d0931b/raw/')
    const { shs1, shl2, lss3, dsl4 } = insult.data.inside
    await config.DATABASE.sync();
    var StrSes_Db = await WhatsAsenaDB.findAll({
        where: {
          info: 'StringSession'
        }
    });

    const conn = new WAConnection();
    const Session = new StringSession();
    
    @@ -165,18 +152,7 @@ ${chalk.blue.italic('ℹ️ Conectando con WhatsApp, por favor espere...')}`);
  
    conn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;
    if (StrSes_Db.length < 1) {
        nodb = true;
        conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }
    conn.on ('credentials-updated', async () => {
        console.log(
            chalk.blueBright.italic('✅ ¡Información de inicio de sesión actualizada!')
        );
        const authInfo = conn.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await WhatsAsenaDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    
    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}
${chalk.blue.italic('ℹ️ Conectando con WhatsApp, por favor espere...')}`);
    });
    
    conn.on('open', async () => {
        console.log(
            chalk.green.bold('✅ ¡Inicio de sesión exitoso!')
        );
        console.log(
            chalk.blueBright.italic('⬇️ Instalando complementos externos...')
        );
        // ==================== External Plugins ====================
        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
            if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                    require('./plugins/' + plugin.dataValues.name + '.js');
                }     
            }
        });
        // ==================== End External Plugins ====================
        console.log(
            chalk.blueBright.italic('⬇️  Instalando complementos...')
        );
        // ==================== Internal Plugins ====================
        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });
        // ==================== End Internal Plugins ====================
        console.log(
            chalk.green.bold('✅ ¡Complementos instalados!')
        );
        await new Promise(r => setTimeout(r, 1100));

        if (config.WORKTYPE == 'public') {
            if (config.LANG == 'TR' || config.LANG == 'AZ') {
    @@ -218,7 +194,7 @@ ${chalk.blue.italic('ℹ️ Conectando con WhatsApp, por favor espere...')}`);
  
                if (conn.user.jid === '994775035797@s.whatsapp.net' || conn.user.jid === '37254693326@s.whatsapp.net' || conn.user.jid === '905423036554@s.whatsapp.net' || conn.user.jid === '905396978235@s.whatsapp.net' || conn.user.jid === '905452641686@s.whatsapp.net' || conn.user.jid === '905550858656@s.whatsapp.net') {
                    await conn.sendMessage(conn.user.jid, '```🛡️ ¡Lista negra detectada!```', MessageType.text)
                    await new Promise(r => setTimeout(r, 1700));
                    console.log('🛡️ Lista negra detectada 🛡️')
                    await heroku.get(baseURI + '/formation').then(async (formation) => {
                        forID = formation[0].id;
                        await heroku.patch(baseURI + '/formation/' + forID, {
                            body: {
                                quantity: 0
                            }
                        });
                    })
                }
                
                else {
                    await conn.sendMessage(conn.user.jid, '*¡El bot Skueletor Está trabajando de forma pública! 🐺*\n\n_Por favor, no pruebes los comandos aquí, ya que este es tu número de registros._\n_Ahora puedes probar los comandos en otro chat :)_\n\n*El bot está trabajando de forma pública. Para cambiarlo, haga que el interruptor "WORK_TYPE" sea "private" en las variables de configuración.*\n\n*Gracias por usar WhatsAsena 💌*', MessageType.text);
                    await git.fetch();
                    var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                    if (commits.total === 0) {
                        await conn.sendMessage(
                            conn.user.jid,
                            Lang.UPDATE, MessageType.text
                        );    
                    } else {
                        var degisiklikler = Lang.NEW_UPDATE;
                        commits['all'].map(
                            (commit) => {
                                degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                            }
                        );

                        await conn.sendMessage(
                            conn.user.jid,
                            '```Contacte a``` *Skueletor* ```para que actualice su bot```\n\n' + degisiklikler + '```', MessageType.text
                        ); 
                    }
                }
    @@ -262,7 +238,7 @@ ${chalk.blue.italic('ℹ️ Conectando con WhatsApp, por favor espere...')}`);
  
            }
            else {
                if (conn.user.jid === '994775035797@s.whatsapp.net' || conn.user.jid === '37254693326@s.whatsapp.net' || conn.user.jid === '905423036554@s.whatsapp.net' || conn.user.jid === '905396978235@s.whatsapp.net' || conn.user.jid === '905452641686@s.whatsapp.net' || conn.user.jid === '905550858656@s.whatsapp.net') {
                    await conn.sendMessage(conn.user.jid, '```🛡️ ¡Lista Negra Detectada!```', MessageType.text)
                    await new Promise(r => setTimeout(r, 1800));
                    console.log('🛡️ Blacklist Detected 🛡️')
                    await heroku.get(baseURI + '/formation').then(async (formation) => {
                        forID = formation[0].id;
                        await heroku.patch(baseURI + '/formation/' + forID, {
                            body: {
                                quantity: 0
                            }
                        });
                    })
                }
                
                else {
                    await conn.sendMessage(conn.user.jid, '*¡El bot Skueletor Está trabajando de forma pública! 🐺*\n\n_Por favor, no pruebes los comandos aquí, ya que este es tu número de registros._\n_Ahora puedes probar los comandos en otro chat :)_\n\n*El bot está trabajando de forma pública. Para cambiarlo, haga que el interruptor "WORK_TYPE" sea "private" en las variables de configuración.*\n\n*Gracias por usar WhatsAsena 💌*', MessageType.text);
                    await git.fetch();
                    var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                    if (commits.total === 0) {
                        await conn.sendMessage(
                            conn.user.jid,
                            Lang.UPDATE, MessageType.text
                        );    
                    } else {
                        var degisiklikler = Lang.NEW_UPDATE;
                        commits['all'].map(
                            (commit) => {
                                degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                            }
                        );

                        await conn.sendMessage(
                            conn.user.jid,
                            '```Contacte a``` *Skueletor* ```para que actualice su bot```\n\n' + degisiklikler + '```', MessageType.text
                        ); 
                    }
                }
    @@ -309,7 +285,7 @@ ${chalk.blue.italic('ℹ️ Conectando con WhatsApp, por favor espere...')}`);
  
            }
        }
        else if (config.WORKTYPE == 'private') {
            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                if (conn.user.jid === '994775035797@s.whatsapp.net' || conn.user.jid === '37254693326@s.whatsapp.net' || conn.user.jid === '905550858656@s.whatsapp.net' || conn.user.jid === '905423036554@s.whatsapp.net' || conn.user.jid === '905396978235@s.whatsapp.net' || conn.user.jid === '905452641686@s.whatsapp.net') {
                    await conn.sendMessage(conn.user.jid, '```🛡️ Blacklist Detected!```', MessageType.text)
                    await new Promise(r => setTimeout(r, 1800));
                    console.log('🛡️ Blacklist Detected 🛡️')
                    await heroku.get(baseURI + '/formation').then(async (formation) => {
                        forID = formation[0].id;
                        await heroku.patch(baseURI + '/formation/' + forID, {
                            body: {
                                quantity: 0
                            }
                        });
                    })
                }
                
                else {
                    await conn.sendMessage(conn.user.jid, '*¡Skueletor Está trabajando correctamente! 🐺*\n\n_Por favor, no juegues con los comandos aquí, ya que este es tu número de registro del bot._\n_Ahora puedes usar el bot en cualquier chat :)_\n\n*Gracias por comprar el bot Skueletor 💌*', MessageType.text);
                    await git.fetch();
                    var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                    if (commits.total === 0) {
                        await conn.sendMessage(
                            conn.user.jid,
                            Lang.UPDATE, MessageType.text
                        );    
                    } else {
                        var degisiklikler = Lang.NEW_UPDATE;
                        commits['all'].map(
                            (commit) => {
                                degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                            }
                        );

                        await conn.sendMessage(
                            conn.user.jid,
                            '```Contacte a``` *Skueletor* ```para que actualice su bot```\n\n' + degisiklikler + '```', MessageType.text
                        ); 
                    }
                }
    @@ -354,7 +330,7 @@ ${chalk.blue.italic('ℹ️ Conectando con WhatsApp, por favor espere...')}`);
  
            }
            else {
                if (conn.user.jid === '994775035797@s.whatsapp.net' || conn.user.jid === '37254693326@s.whatsapp.net' || conn.user.jid === '905550858656@s.whatsapp.net' || conn.user.jid === '905423036554@s.whatsapp.net' || conn.user.jid === '905396978235@s.whatsapp.net' || conn.user.jid === '905452641686@s.whatsapp.net') {
                    await conn.sendMessage(conn.user.jid, '```🛡️ ¡Lista Negra Detectada!```', MessageType.text)
   
                    await new Promise(r => setTimeout(r, 1800));
                    console.log('🛡️ Lista negra detectada 🛡️')
                    await heroku.get(baseURI + '/formation').then(async (formation) => {
                        forID = formation[0].id;
                        await heroku.patch(baseURI + '/formation/' + forID, {
                            body: {
                                quantity: 0
                            }
                        });
                    })
                }
                
                else {
                    await conn.sendMessage(conn.user.jid, '*¡Skueletor Está trabajando correctamente! 🐺*\n\n_Por favor, no juegues con los comandos aquí, ya que este es tu número de registro del bot._\n_Ahora puedes usar el bot en cualquier chat :)_\n\n*Gracias por comprar el bot Skueletor 💌*', MessageType.text);
                    await git.fetch();
                    var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
                    if (commits.total === 0) {
                        await conn.sendMessage(
                            conn.user.jid,
                            Lang.UPDATE, MessageType.text
                        );    
                    } else {
                        var degisiklikler = Lang.NEW_UPDATE;
                        commits['all'].map(
                            (commit) => {
                                degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                            }
                        );

                        await conn.sendMessage(
                            conn.user.jid,
                            '```Contacte a``` *Skueletor* ```para que actualice su bot```\n\n' + degisiklikler + '```', MessageType.text
                        ); 
                    }
                }
            }
        }
        else if (config.WORKTYPE == ' private' || config.WORKTYPE == 'Private' || config.WORKTYPE == ' Private' || config.WORKTYPE == 'privaye' || config.WORKTYPE == ' privaye' || config.WORKTYPE == ' prigate' || config.WORKTYPE == 'prigate' || config.WORKTYPE == 'priavte' || config.WORKTYPE == ' priavte' || config.WORKTYPE == 'PRİVATE' || config.WORKTYPE == ' PRİVATE' || config.WORKTYPE == 'PRIVATE' || config.WORKTYPE == ' PRIVATE') {
            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                await conn.sendMessage(
                    conn.user.jid,
                    '_¡Parece que quieres cambiar al modo privado! Lo sentimos, su_ *WORK_TYPE* _Key es incorrecta!_ \n_¡No se preocupe! Estoy tratando de encontrar el adecuado para usted..._', MessageType.text
                );
                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['WORK_TYPE']: 'private'
                    }
                })
            }
            else {
                await conn.sendMessage(
                    conn.user.jid,
                    '_¡Parece que quieres cambiar al modo privado! Lo sentimos, su_ *WORK_TYPE* _Key es incorrecta..._ \n_¡No se preocupe! Estoy tratando de encontrar el adecuado para usted..._', MessageType.text
                );
                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['WORK_TYPE']: 'private'
                    }
                })
            }
        }
        else if (config.WORKTYPE == ' public' || config.WORKTYPE == 'Public' || config.WORKTYPE == ' Public' || config.WORKTYPE == 'publoc' || config.WORKTYPE == ' Publoc' || config.WORKTYPE == 'pubcli' || config.WORKTYPE == ' pubcli' || config.WORKTYPE == 'PUBLİC' || config.WORKTYPE == ' PUBLİC' || config.WORKTYPE == 'PUBLIC' || config.WORKTYPE == ' PUBLIC' || config.WORKTYPE == 'puvlic' || config.WORKTYPE == ' puvlic' || config.WORKTYPE == 'Puvlic' || config.WORKTYPE == ' Puvlic') {
            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                await conn.sendMessage(
                    conn.user.jid,
                    '_¡Parece que quieres cambiar al modo público! Lo sentimos, su_ *WORK_TYPE* _¡Key es incorrecta..._ \ N_¡No se preocupe! Estoy tratando de encontrar el adecuado para usted..._', MessageType.text
                );
                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['WORK_TYPE']: 'public'
                    }
                })
            }
            else {
                await conn.sendMessage(
                    conn.user.jid,
                    '_¡Parece que quieres cambiar al modo público! Lo sentimos, su_ *WORK_TYPE* _¡Key es incorrecta..._ \ N_¡No se preocupe! Estoy tratando de encontrar el adecuado para usted..._', MessageType.text
                );
                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['WORK_TYPE']: 'public'
                    }
                })
            }
        }
        else {
            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                return await conn.sendMessage(
                    conn.user.jid,
                    '_¡No se encontró la clave de_ *WORK_TYPE* _que ingresó!_ \n_Por favor, escriba:_ ```/setvar WORK_TYPE: private``` _O_ ```/setvar WORK_TYPE: public```', MessageType.text
                );
            }
            else {
                return await conn.sendMessage(
                    conn.user.jid,
                    '_¡No se encontró la clave de_ *WORK_TYPE* _que ingresó!_ \n_Por favor, escriba:_ ```/setvar WORK_TYPE: private``` _O_ ```/setvar WORK_TYPE: public```', MessageType.text
                );
            }
        }
    });
    
    conn.on('message-new', async msg => {
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;
        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }
        // ==================== Greetings ====================
        if (msg.messageStubType === 32 || msg.messageStubType === 28) {
            // Görüşürüz Mesajı
            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                await conn.sendMessage(msg.key.remoteJid, gb.message, MessageType.text);
            }
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
            // Hoşgeldin Mesajı
            var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                await conn.sendMessage(msg.key.remoteJid, gb.message, MessageType.text);
            }
            return;
        }
        // ==================== End Greetings ====================
        // ==================== Blocked Chats ====================
        if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        
        if (config.SUPPORT == '905524317852-1612300121') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        // ==================== End Blocked Chats ====================
        // ==================== Events ====================
        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }
                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {
                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((config.OWN == "905511384572,0" && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.OWN.includes(',') ? config.OWN.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.OWN || config.OWN.includes(',') ? config.OWN.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.OWN)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    // ==================== End Events ====================
                    // ==================== Message Catcher ====================
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
                        
                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }
                        if (command.deleteCommand && msg.key.fromMe) {
                            await whats.delete(); 
                        }
                        // ==================== End Message Catcher ====================
                        // ==================== Error Message ====================
                        try {
                            await command.function(whats, match);
                        }
                        catch (error) {
                            
                            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                                await conn.sendMessage(conn.user.jid, '*-- REPORTE DE ERROR [SKUELETOR] --*' + 
                                    '\n*¡El bot Skueletor ha tenido un problema!*'+
                                    '\n_Este es tu número de registro del bot, aquí se reportarán todos los errores que tenga._' +
                                    '\n_Puedes escribir a nuestro grupo de *soporte VIP* para obtener ayuda._' +
                                    '\n_También puedes unirte a nuestro grupo de apoyo:_ https://chat.whatsapp.com/BdP7YyC2WBe1gs5wpQ0cAw' +
                                    '\n_Este mensaje debería haber ido a su número (mensajes guardados)._\n\n' +
                                    '*Error:* ```' + error + '```\n\n'
                                    , MessageType.text, {detectLinks: false});
                                if (error.message.includes('URL')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Solo se admiten absolutamente los enlaces_' +
                                        '\n*Razón:* _El uso de herramientas multimedia (tblend, sticker...) en tu número de registros._' +
                                        '\n*Solución:* _Puede usar comandos en cualquier chat, excepto el número de registros._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _División de indefinido_' +
                                        '\n*Razón:* _Los comandos que pueden usar los administradores de grupo ocasionalmente no ven la función de división._ ' +
                                        '\n*Solución:* _Con reiniciar el bot será suficiente._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal::* _Conexión del servidor Ookla_' +
                                        '\n*Razón:* _Los datos de la prueba de velocidad no se pueden transmitir al servidor._' +
                                        '\n*Solución:* _Si lo usa una vez más, el problema se resolverá._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Parámetros de audio solicitados_' +
                                        '\n*Razón:* _Usando el comando TTS fuera del alfabeto latino._' +
                                        '\n*Solución:* _El problema se resolverá si usa el comando en el marco de letras latinas._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _El fichero o directorio no existe_' +
                                        '\n*Razón:* _Codificación incorrecta del plugin._' +
                                        '\n*Solución:* _Verifique los códigos de su complemento._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Error 404 HTTPS_' +
                                        '\n*Razón:* _No comunicarse con el servidor como resultado del uso de los comandos del complemento Heroku._' +
                                        '\n*Solución:* _Espere un momento y vuelva a intentarlo. Si sigue apareciendo el error, realice la transacción en el sitio web..._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Función de eliminación de respuesta_' +
                                        '\n*Razón:* _Usando comandos IMG o Wiki._' +
                                        '\n*Solución:* _No hay solución para este error... Pero tampoco es un error fatal._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Función de eliminación de respuesta_' +
                                        '\n*Razón:* _Usando comandos IMG o Wiki._' +
                                        '\n*Solución:* _No hay solución para este error... Pero tampoco es un error fatal._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Error de acción de Baileys_ ' +
                                        '\n*Razón:* _Se desconoce la razón exacta. Más de una opción puede haber provocado este error._' +
                                        '\n*Solución:* _Si lo usa de nuevo, puede mejorar. Si el error continúa, puede intentar reiniciar el bot._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _No se puede decodificar los texto o medios_' +
                                        '\n*Razón:* _Uso incorrecto del plugin._' +
                                        '\n*Solución:* _Utilice los comandos tal como están escritos en la descripción del plugin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Uso de caracteres de palabras_' +
                                        '\n*Razón:* _Utilizando comandos como TTP, ATTP fuera del alfabeto latino._' +
                                        '\n*Solución:* _El problema se resolverá si usa el comando en alfabeto latino..._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('conversation')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Eliminando complemento_' +
                                        '\n*Razón:* _Ingresó incorrectamente el nombre del complemento quería ser eliminado._' +
                                        '\n*Solución:* _Intente sin agregar_ *__* _al complemento que desea eliminar. Si aún recibe un error, intente agregar like_ ```?(.*) / $``` _Al final del nombre._ '
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await conn.sendMessage(conn.user.jid, '*🙇🏻 Lo siento, no pude leer este error. 🙇🏻*' +
                                        '\n_Puede escribir a nuestro grupo de apoyo para obtener más ayuda._'
                                        , MessageType.text
                                    );
                                }
                            }
                            else {
                                await conn.sendMessage(conn.user.jid, '*-- REPORTE DE ERROR [SKUELETOR] --*' + 
                                    '\n*¡El bot Skueletor ha tenido un problema!*'+
                                    '\n_Este es tu número de registro del bot, aquí se reportarán todos los errores que tenga._' +
                                    '\n_Puedes escribir a nuestro grupo de *soporte VIP* para obtener ayuda._' +
                                    '\n_También puedes unirte a nuestro grupo de apoyo:_ https://chat.whatsapp.com/BdP7YyC2WBe1gs5wpQ0cAw' +
                                    '\n_Este mensaje debería haber ido a su número (mensajes guardados)._\n\n' +
                                    '*Error:* ```' + error + '```\n\n'
                                    , MessageType.text, {detectLinks: false}
                                );
                                if (error.message.includes('URL')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Solo se admiten absolutamente los enlaces_' +
                                        '\n*Razón:* _El uso de herramientas multimedia (tblend, sticker...) en tu número de registros._' +
                                        '\n*Solución:* _Puede usar comandos en cualquier chat, excepto el número de registros._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('conversation')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Eliminando complemento_' +
                                        '\n*Razón:* _Ingresó incorrectamente el nombre del complemento quería ser eliminado._' +
                                        '\n*Solución:* _Intente sin agregar_ *__* _al complemento que desea eliminar. Si aún recibe un error, intente agregar like_ ```?(.*) / $``` _Al final del nombre._ '
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _División de indefinido_' +
                                        '\n*Razón:* _Los comandos que pueden usar los administradores de grupo ocasionalmente no ven la función de división._ ' +
                                        '\n*Solución:* _Con reiniciar el bot será suficiente._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal::* _Conexión del servidor Ookla_' +
                                        '\n*Razón:* _Los datos de la prueba de velocidad no se pueden transmitir al servidor._' +
                                        '\n*Solución:* _Si lo usa una vez más, el problema se resolverá._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Parámetros de audio solicitados_' +
                                        '\n*Razón:* _Usando el comando TTS fuera del alfabeto latino._' +
                                        '\n*Solución:* _El problema se resolverá si usa el comando en el marco de letras latinas._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _El fichero o directorio no existe_' +
                                        '\n*Razón:* _Codificación incorrecta del plugin._' +
                                        '\n*Solución:* _Verifique los códigos de su complemento._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Error 404 HTTPS_' +
                                        '\n*Razón:* _No comunicarse con el servidor como resultado del uso de los comandos del complemento Heroku._' +
                                        '\n*Solución:* _Espere un momento y vuelva a intentarlo. Si sigue apareciendo el error, realice la transacción en el sitio web..._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Función de eliminación de respuesta_' +
                                        '\n*Razón:* _Usando comandos IMG o Wiki._' +
                                        '\n*Solución:* _No hay solución para este error... Pero tampoco es un error fatal._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Función de eliminación de respuesta_' +
                                        '\n*Razón:* _Usando comandos IMG o Wiki._' +
                                        '\n*Solución:* _No hay solución para este error... Pero tampoco es un error fatal._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Error de acción de Baileys_ ' +
                                        '\n*Razón:* _Se desconoce la razón exacta. Más de una opción puede haber provocado este error._' +
                                        '\n*Solución:* _Si lo usa de nuevo, puede mejorar. Si el error continúa, puede intentar reiniciar el bot._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _No se puede decodificar los texto o medios_' +
                                        '\n*Razón:* _Uso incorrecto del plugin._' +
                                        '\n*Solución:* _Utilice los comandos tal como están escritos en la descripción del plugin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ ANÁLISIS DE ERRORES [SKUELETOR] ⚕️*' + 
                                        '\n========== ```¡Error resuelto!``` ==========' +
                                        '\n\n*Error principal:* _Uso de caracteres de palabras_' +
                                        '\n*Razón:* _Utilizando comandos como TTP, ATTP fuera del alfabeto latino._' +
                                        '\n*Solución:* _El problema se resolverá si usa el comando en alfabeto latino..._'
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await conn.sendMessage(conn.user.jid, '*🙇🏻 Lo siento, no pude leer este error. 🙇🏻*' +
                                        '\n_Puede escribir a nuestro grupo de apoyo para obtener más ayuda._'
                                        , MessageType.text
                                    );
                                }    
                            }                      
                        }
                    }
                }
            }
        )
    });
    // ==================== End Error Message ====================
    try {
        await conn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Se está renovando la cadena de su versión anterior...'))
            conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await conn.connect();
            } catch {
                return;
            }
        }
    }
}
whatsAsena();
