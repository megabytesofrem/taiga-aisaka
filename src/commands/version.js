import { MessageEmbed } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../framework/command';

export class VersionCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        const instance = client.instance;
    
        const embed = new MessageEmbed()
            .setTitle('Taiga Aisaka')
            .setColor(0xff9696)
            .setDescription('Version 1.0: Electric Boogaloo')
            .addField('Powered by', 'The Discord Slash Commands API:tm:', true)
            .addField('Loaded commands', `${instance.manager.commands.length}`, true);

        await interaction.reply({ embeds: [embed] });
    }
}

export const instance = new VersionCommand('version', 'default', 'Self explanatory');