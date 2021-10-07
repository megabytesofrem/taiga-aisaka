import { Message, MessageEmbed } from 'discord.js';
import { Command } from './core/command';

export function createInvalidUsageEmbed(command: Command) {
    let requiredArgs = '';
    for (const arg of command.argTypes) {
        requiredArgs += `${arg.name},`;
    }

    requiredArgs = requiredArgs.slice(0, requiredArgs.length - 1);

    const embed = new MessageEmbed()
        .setTitle(`Invalid usage for command ${command.name}`)
        .setColor(0xff8787)
        .addField('Required arguments', requiredArgs)
        .addField('Usage', command.usage);

    return embed;
}