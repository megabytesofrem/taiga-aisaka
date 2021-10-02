import { MessageEmbed } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../framework/command';


export class AllCommandsCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        const instance = client.instance;
        let desc = '';
        for (const command of instance.manager.commands) {
            console.log(command);
            desc += `/${command.data.name}\n`;
        }

        const embed = new MessageEmbed()
            .setTitle('All registered commands')
            .setColor(0xff9696)
            .setDescription(desc);

        await interaction.reply({ embeds: [embed] });
    }
}

export const instance = new AllCommandsCommand('commands', 'default', 'Self explanatory');