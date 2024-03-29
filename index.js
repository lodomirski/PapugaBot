const fs = require('fs-extra');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const token = process.env.TOKEN;
const { QuickDB } = require('quick.db');
const jsonc = require('jsonc');
const db = new QuickDB();
const keep_alive = require('./keep_alive.js')

process.on('unhandledRejection', (reason, promise, a) => {
  console.log(reason, promise, a)
})

process.stdout.write(`
\x1b[38;2;143;110;250m████████╗██╗ ██████╗██╗  ██╗███████╗████████╗    ██████╗  ██████╗ ████████╗
\x1b[38;2;157;101;254m╚══██╔══╝██║██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝    ██╔══██╗██╔═══██╗╚══██╔══╝
\x1b[38;2;172;90;255m   ██║   ██║██║     █████╔╝ █████╗     ██║       ██████╔╝██║   ██║   ██║   
\x1b[38;2;188;76;255m   ██║   ██║██║     ██╔═██╗ ██╔══╝     ██║       ██╔══██╗██║   ██║   ██║   
\x1b[38;2;205;54;255m   ██║   ██║╚██████╗██║  ██╗███████╗   ██║       ██████╔╝╚██████╔╝   ██║   
\x1b[38;2;222;0;255m   ╚═╝   ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝       ╚═════╝  ╚═════╝    ╚═╝\x1b[0m

łącze z discordem...`)

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// All variables stored in the client object
client.db = db;
client.discord = require('discord.js');
client.config = require(`./TicketSystem/config/config`)

client.locales = require(`./TicketSystem/locales/${client.config.lang}.json`);
client.embeds = client.locales.embeds;
client.log = require("./TicketSystem/utils/logs.js").log;
client.msToHm = function dhm(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);

  if (days > 0) return `${days}d ${hours}h ${minutes}m ${sec}s`;
  if (hours > 0) return `${hours}h ${minutes}m ${sec}s`;
  if (minutes > 0) return `${minutes}m ${sec}s`;
  if (sec > 0) return `${sec}s`;
  return "0s";
}

// Command handler
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'TicketSystem/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// Execute commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

// Event handler
const eventsPath = path.join(__dirname, 'TicketSystem/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

let status = [
  {
    name: 'Papuka',
    type: ActivityType.Watching,
    url: 'https://www.youtube.com/watch?v=LmMzqbBsecU&t',
  },
  {
    name: 'Zasubuj',
    type: ActivityType.Watching,
  },
  {
    name: 'Papuke',
    type: ActivityType.Watching,
  },
  {
    name: 'Bot by lodomirski',
    type: ActivityType.Listening,
  },
];

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} jest online.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

// Login the bot
client.login(token);


//setInterval(() => {
//  if(!client || !client.user) process.kill(1);
//}, 3000)

const http = require("http");
http.createServer((_, res) => res.end("Credit lodomirski")).listen(8080)
