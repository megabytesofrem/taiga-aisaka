import { MessageEmbed } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../framework/command';


function findCommand(instance, name) {
    return instance.manager.rawCommands.filter(c => c.name == name);
}

export class HelpCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);

        this._builder.addStringOption(option => 
            option.setName('command')
                .setDescription('Command to view help for')
                .setRequired(true));
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        const instance = client.instance;
        const cmd = interaction.options.getString('command');

        console.log(findCommand(instance, cmd));

        if (findCommand(instance, cmd).length > 0) {
            let match = findCommand(instance, cmd)[0];
            let options = match._builder.options;

            let usage = `${match.name} `;

            console.log(match)

            const embed = new MessageEmbed()
                .setTitle(cmd + '')
                .setColor(0xff9696)
                .addField('Category', match.category, false)
                .addField('Description', match.desc, false);

            options.map(opt => {
                usage += opt.required ? `<${opt.name}>` : `[${opt.name}}`;
            });

            embed.addField('Usage', usage, false);
            await interaction.reply({ embeds: [embed] });
        }
    }
}

export const instance = new HelpCommand('help', 'default', 'Self explanatory');