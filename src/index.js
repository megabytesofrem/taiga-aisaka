import { Client, Intents } from 'discord.js';
import { CommandManager } from './manager';

class Bot {
    constructor() {
    }

    // internal run method
    async _run(token) {
        this._bot = new Client({ intents: [
            Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES
        ] });
        this._bot.login(token);

        // discord js rebinds the context
        this._bot.instance = this;
        this.queue = []; // queue for music bot

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

        this.user.setActivity('your feelings | /commands', { type: 'PLAYING' });
    }

    async onInteractionCreate(interaction) {
        const instance = this.instance;
        if (!interaction.isCommand()) return;

        try {
            const command = await instance.manager.findByName(interaction.commandName);
            console.info(command)
            await command.handler(this, interaction);
        } catch (error) {
            // fucky wucky
        }
    }

    async onMessageCreate() {
    }
}

const bot = new Bot();
bot._run(process.env.DISCORD_TOKEN);
