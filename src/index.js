import { Client, Intents } from 'discord.js';
import { CommandManager } from './manager';

class Bot {
    constructor() {
    }

    // internal run method
    async _run(token) {
        this._bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
        this._bot.login(token);

        // discord js rebinds the context
        this._bot.instance = this;

        // Register a command manager
        this.manager = new CommandManager();
        await this.manager.registerCommands(process.env.DISCORD_CLIENT, token);
    
        console.info(`Registered ${this.manager.commands.length} commands!`);

        this._bot.once('ready', this.onReady);
        this._bot.on('interactionCreate', this.onInteractionCreate);
        this._bot.on('messageCreate', this.onMessageCreate);
    }

    // Events
    async onReady() {
        console.info('Bot started!');

        this.client.user.setActivity('your feelings | /commands', { type: 'WATCHING' });
    }

    async onInteractionCreate(interaction) {
        const instance = this.instance;
        if (!interaction.isCommand()) return;

        const command = await instance.manager.findByName(interaction.commandName);
        console.info(command)
        await command.handler(this, interaction);
    }

    async onMessageCreate() {
    }
}

const bot = new Bot();
bot._run(process.env.DISCORD_TOKEN);
