require('dotenv').config();
const { REST, Routes } = require('discord.js');

// Define slash commands in raw JSON to avoid extra dependencies
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!'
  },
  {
    name: 'echo',
    description: 'Echo back your text',
    options: [
      {
        name: 'text',
        description: 'What should I say back?',
        type: 3, // STRING
        required: true
      }
    ]
  },
  {
    name: 'ask',
    description: 'Ask a question (AI will answer)',
    options: [
      {
        name: 'prompt',
        description: 'Your question',
        type: 3, // STRING
        required: true
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Slash commands registered.');
  } catch (error) {
    console.error('Failed to register commands:', error);
    process.exit(1);
  }
})();
