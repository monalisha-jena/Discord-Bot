import { Client, Events, GatewayIntentBits } from 'discord.js';
// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
//we login as client to do the bot testing and the client has the permission to guidmessages that is create, update msgs

// const openai = new OpenAI(({
//     apiKey: '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'
// }));

const genAI = new GoogleGenerativeAI("AIzaSyDPIPJcoxPcjPsPvWUkXoFUgdxXImLkL8I");

async function chatWithGemini(userMessage) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(userMessage);
    return response.response.text();
}

client.on("messageCreate", (message) => {
    // console.log(message.content); on consoling meassage we get the info about which user did the msg and all other details
    if(message.author.bot) return;
    message.reply({
        content: "Hi from Eddy, your chat buddy!",
    });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    if (commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  
    if (interaction.commandName === "chat") {
        await interaction.deferReply();
        const userMessage = interaction.options.getString("message");
        
        try {
            const botResponse = await chatWithGemini(userMessage);
            await interaction.editReply(botResponse);
        } catch (error) {
            console.error(error);
            await interaction.editReply("Error processing your request.");
        }
    }
  
    if (commandName === 'joke') {
      const jokes = [
        'Why don’t skeletons fight each other? They don’t have the guts.',
        'I’m reading a book on anti-gravity. It’s impossible to put down!',
        'Why did the scarecrow win an award? Because he was outstanding in his field.',
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      await interaction.reply(randomJoke);
    }
  
    if (commandName === 'flipcoin') {
      const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
      await interaction.reply(`The coin landed on: ${outcome}`);
    }
  
    if (commandName === 'hug') {
      const userToHug = interaction.options.getUser('user');
      if (!userToHug) {
        return interaction.reply('Please specify a user to hug!');
      }
      await interaction.reply(`${interaction.user} gives a warm hug to ${userToHug}! 🤗`);
    }
  });

client.login("MY DISCORD TOKEN");

