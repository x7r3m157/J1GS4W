const { postUser } = require('../components/fauna')
const { getUser } = require('../components/helper')
const { Scenes } = require('telegraf')

module.exports = async ctx => {
  const { id, isBot, name, times } = getUser(ctx.from)

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`)
  }

  const contactDataWizard = new Scenes.WizardScene(
    'CONTACT_DATA_WIZARD_SCENE_ID', // first argument is Scene_ID, same as for BaseScene
    (ctx) => {
      ctx.reply('How long did you torture yourself? Tell daddy how long in minutes...');
      ctx.wizard.state.minutes = {};
      return ctx.wizard.next();
    },
    (ctx) => {
      // validation example
      if (isNaN(ctx.message.text)) {
        ctx.reply('No silly letters you frail human meatbag.. tell daddy how many minutes.');
        return; 
      }
      ctx.wizard.state.minutes.fio = ctx.message.text;
      return ctx.wizard.next();
    },
    async (ctx) => {
      ctx.reply("Thank you for your replies, we'll contact your soon");
      await mySendContactDataMomentBeforeErase(ctx.wizard.state.minutes);
      return ctx.scene.leave();
    },
  );

}