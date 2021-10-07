import { Bot } from '../main';
import { Argument, Command } from '../core/command';
import { Message } from 'discord.js';
import { ArgumentParser } from '../core/argParser';

import dedent from 'ts-dedent';

export default class DebugCommand extends Command {
    constructor() {
        super();

        this.name = 'debug';
        this.usage = dedent`
            debug <arg1> <arg2> <arg3>
            --
            ARG1-ARG3 are all required by the command, the first two expect a STRING 
            while the last expects a NUMBER.
        `;
        this.addArgument({ 'name': 'arg1', 'type': 'STRING' });
        this.addArgument({ 'name': 'arg2', 'type': 'STRING' });
        this.addArgument({ 'name': 'arg3', 'type': 'NUMBER' });

    }

    async handler(bot: Bot, message: Message, parser: ArgumentParser) {
        let arg1 = await parser.getArgument('arg1');
        let arg2 = await parser.getArgument('arg2');
        let arg3 = await parser.getArgument('arg3');

        let dump = '```json';
        dump += `\n//Debug output\n\n`;

        dump += `[\n`;
        for (const arg of [arg1, arg2, arg3]) {
            dump += `\t${JSON.stringify(arg)},\n`
        }
        dump += ']\n';

        dump += '```';
        await message.channel.send(dump);
//        await message.channel.send(`> name=${this.name}, arg1=${arg1}, arg2=${arg2}, arg3=${arg3}`);
    }
}