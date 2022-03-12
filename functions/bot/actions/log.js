const { postUser } = require('../components/fauna')
const { getUser } = require('../components/helper')

module.exports = async ctx => {
  const { id, isBot, name, times } = getUser(ctx.from)

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`)
  }

  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, 'Can we get access to your phone number?', requestPhoneKeyboard)

}