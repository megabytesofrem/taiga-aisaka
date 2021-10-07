import { Client, Intents, Message } from 'discord.js';

import { Argument, Command } from './core/command';
import { CommandManager } from './commandManager';
import { ArgumentParser } from './core/argParser';
import { createInvalidUsageEmbed } from './helpers';

export class Bot {
    prefix: string;

    // Will be set in the private run method
    public _bot!: Client;
    public manager!: CommandManager;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.manager = new CommandManager();
    }

    _run(token: string | undefined) {
        const { FLAGS } = Intents;

        const intents = [ FLAGS.GUILDS, FLAGS.GUILD_MESSAGES, FLAGS.GUILD_MESSAGE_REACTIONS, FLAGS.GUILD_BANS, FLAGS.GUILD_VOICE_STATES ];
        this._bot = new Client({ intents: intents });
        this._bot.login(token);

        this._bot.once('ready', this.onReady.bind(this));
        this._bot.on('messageCreate', this.onMessageCreate.bind(this));
    }

    async onMessageCreate(message: Message) {
        if (message.author.bot)
            return;

        if (message.content.startsWith(this.prefix)) {
            const name = message.content.split(' ')[0].replace(this.prefix, ''); // command
            let rest = message.content.split(' ');
            rest.shift(); // arg1 arg2 etc

            let parser = new ArgumentParser();
            let args = parser.parseArgs(rest);
            const command: Command = await this.manager.findCommand(name);

            if (command === undefined) {
                // Command not found, bail out
                await message.channel.send(`> ${name} is not a valid command!`);
                return;
            }

            // Convert the args we get into named format to pass to the command
            let namedArgs: Record<string, Argument> = {};
            console.log(command);

            try {
                for (const argTypeIndex in command.argTypes) {
                    const argType = command.argTypes[argTypeIndex];
                    const parsedArg = args[argTypeIndex];

                    if (argType.type == parsedArg.type) {
                        namedArgs[argType.name] = { type: argType.type, match: parsedArg.match };
                    }
                    else {
                        // assume something went wrong
                        message.channel.send({ embeds: [createInvalidUsageEmbed(command)] });
                        return;
                    }
                }
            } catch (err) { 
                console.log(err);
            }

            parser.setNamedArguments(namedArgs);
            await command.handler(this, message, parser);

        }
    }

    async onReady() {
        console.info('Bot started!');
        this._bot?.user?.setActivity(`with your feelings | ${this.prefix}help`, { type: 'PLAYING' });
    
        await this.manager.registerCommands();
    }
}

const bot = new Bot('.');
bot._run(process.env.DISCORD_TOKEN);