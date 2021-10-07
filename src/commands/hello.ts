import { Bot } from '../main';
import { Argument, Command } from '../core/command';
import { Message } from 'discord.js';
import { ArgumentParser } from '../core/argParser';

export default class HelloCommand extends Command {
    constructor() {
        super();

        this.name = 'hello';
        this.addArgument({ 'name': 'person', 'type': 'STRING' });
        this.addArgument({ 'name': 'lang', 'type': 'STRING' });
    }

    async handler(bot: Bot, message: Message, parser: ArgumentParser) {
        let person = await parser.getArgument('person');
        let lang = await parser.getArgument('lang');

        if (lang?.match == 'en') {
            await message.channel.send('Hello ' + person?.match);
        }
        if (lang?.match == 'fr') {
            await message.channel.send('Bonjour ' + person?.match);
        }
    }
}