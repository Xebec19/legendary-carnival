const { Configuration, OpenAIApi } = require("openai");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

client.on("messageCreate", async function (message) {
  try {
    if (message.author.bot) return;

    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message.content,
      temperature: 0.9,
      max_tokens: 100,
      stop: ["ChatGPT:", "Rohan Thakur:"],
    });
    message.reply(`${gptResponse.data.choices[0].text}`);
    return;
  } catch (err) {
    console.log(err);
  }
});

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT Bot is Online on Discord");
