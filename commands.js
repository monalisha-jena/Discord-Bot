import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'chat',
    description: 'Chat with Eddy the bot.',
    options: [
      {
        type: 3,
        name: 'message',
        description: 'Message to send to Eddy',
        required: true,
      },
    ],
  },
  {
    name: 'joke',
    description: 'Get a random joke from Eddy.',
  },
  {
    name: 'flipcoin',
    description: 'Flip a coin and get heads or tails.',
  },
  {
    name: 'hug',
    description: 'Send a virtual hug to a user.',
    options: [
      {
        type: 6,
        name: 'user',
        description: 'The user to hug',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken("MTMzMjg0MTc1OTg4OTI5MzM4Ng.GYJNlJ.VxZ8tPBUXTFHvYMeK0VHWg5a42BGoSyAoG2eIY");

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1332841759889293386"), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}