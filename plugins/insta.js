
const Skueletor = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const cn = require('../config');
const fs = require('fs');
const Language = require('../language');
const Lang = Language.getString('instagram')
const { errorMessage, infoMessage } = require('../helpers')

if (cn.WORKTYPE == 'private') {

    Skueletor.addCommand({ pattern: 'insta ?(.*)', fromMe: true, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (userName === '') return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios.get(`https://docs-jojo.herokuapp.com/api/stalk?username=${userName}`).then(async (response) => {

            const {biography, username, followers, following, is_private, is_verified} = response.data.graphql.user

            const profileBuffer = await axios.get(profile_pic, { responseType: 'arraybuffer' })

            const msg = `*Nombre de usuario*: ${username} \n*Biografía*: ${biography} \n*Seguidores*: ${followers} \n*Peronas seguidas*: ${following} \n*Tipo de cuenta*: ${is_private ? 'Es una cuenta privada' : 'Es una cuenta pública'} \n*¿Es una cuenta verificada?*: ${is_verified ? 'Sí, es una cuenta verificada' : 'No, no es una cuenta verificada'}`

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, { caption: msg })

        }).catch(async (err) => {
            await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName))
        })
    });
}

if (cn.WORKTYPE == 'public') {

    Skueletor.addCommand({ pattern: 'insta ?(.*)', fromMe: false, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (userName === '') return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios.get(`https://docs-jojo.herokuapp.com/api/stalk?username=${userName}`).then(async (response) => {

            const {biography, username, followers, following, is_private, is_verified, profile_pic} = response.data.graphql.user

            const profileBuffer = await axios.get(profile_pic, { responseType: 'arraybuffer' })

            const msg = `*Nombre de usuario*: ${username} \n*Biografía*: ${biography} \n*Seguidores*: ${followers} \n*Peronas seguidas*: ${following} \n*Tipo de cuenta*: ${is_private ? 'Es una cuenta privada' : 'Es una cuenta pública'} \n*¿Es una cuenta verificada?*: ${is_verified ? 'Sí, es una cuenta verificada' : 'No, no es una cuenta verificada'}`

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, { caption: msg })

        }).catch(async (err) => {
            await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName))
        })
    });
}
