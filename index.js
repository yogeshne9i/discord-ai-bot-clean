const { Client, GatewayIntentBits } = require("discord.js");
const Groq = require("groq-sdk");
require("dotenv").config();

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Create Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// When bot is ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Listen for messages
client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // ignore other bots

  // Only allow messages in a specific channel
  const allowedChannelId = "1406519373459619893";
  if (message.channel.id !== allowedChannelId) return;

  try {
    // Send user's message to Groq
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: message.content }],
      model: "llama3-8b-8192", // Free Groq model
    });

    const reply = response.choices[0].message.content;
    message.reply(reply);
  } catch (err) {
    console.error(err);
    message.reply("❌ Something went wrong with Groq.");
  }
});

// Login bot
client.login(process.env.DISCORD_TOKEN);
