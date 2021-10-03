
const Skueletor = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const { requestLyricsFor, requestAuthorFor, requestTitleFor, requestIconFor } = require("solenolyrics");
const solenolyrics= require("solenolyrics"); 
const Sea = require('search-engine-client');
const TinyURL = require('tinyurl');
const fs = require('fs');
const Language = require('../language');
const Lang = Language.getString('instagram')
const { errorMessage, infoMessage } = require('../helpers')

if (cn.WORKTYPE == 'private') {

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: true, desc: Lang.DESC }, async (message, match) => {

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

if (cn.WORKTYPE == 'private') {

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: false, desc: Lang.DESC }, async (message, match) => {

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


/*
const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');
const fs = require('fs');
const axios = require('axios');
const { errorMessage, infoMessage } = require('../helpers');
const IG_DESC = "Downloads Image/Video From Instagram"
const NEED_WORD = "Must Enter a link"
const FBDESC = "Downloads Video From FaceBook"
const LOADING = "Downloading the Video..."
const NOT_FOUNDFB = "Video Not Found"
const CAPTION = "Caption"

Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: false, desc: IG_DESC}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(NEED_WORD))

    await message.sendMessage(infoMessage("Downloading the Post..."))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/igdown?url=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`

	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: "Made By MsJessica"
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: "Made By Msjessica"
        })}
	
        
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("Invaild Link, Please Enter a Vaild Instagram Link")),
      )
  },
)
