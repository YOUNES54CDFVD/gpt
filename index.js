const { Telegraf } = require("telegraf");
const runWormGPT = require("./wormgpt");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("أهلًا! أرسل رسالتك لأقوم بالرد باستخدام الذكاء الاصطناعي.");
});

bot.on("text", async (ctx) => {
  const userMessage = ctx.message.text;
  ctx.reply("جارٍ المعالجة...");

  try {
    const response = await runWormGPT(userMessage);
    ctx.reply(response);
  } catch (e) {
    ctx.reply("حدث خطأ في الاتصال بالأداة. حاول لاحقًا.");
    console.error(e);
  }
});

bot.launch();
