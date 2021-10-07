import { Message } from 'discord.js';
import { ArgumentParser } from './argParser';
import { Bot } from '../main';

export interface Argument {
    type: string;
    match: string | undefined;
}

// command related stuff
export class Command {
    name: string = '';
    usage: string = 'No usage specified';
    argTypes: CommandArg[] = [];

    addArgument = (arg: CommandArg) => this.argTypes.push(arg);
    removeArgument = (arg: CommandArg) => this.argTypes = this.argTypes.filter(e => e !== arg);

    // Handler for the command
    handler(bot: Bot, message: Message, parser: ArgumentParser) { }
}

export interface CommandArg {
    name: string;
    type: string;
}